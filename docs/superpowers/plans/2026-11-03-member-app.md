# CamSur Uptown Golf member app — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website-clone Expo app in `mobile/` with the five-tab members-only app drawn in the Brand Guidelines 2026 (PDF p.74–80).

**Architecture:** Rebuild in place with Expo Router: a sign-in route, a `(tabs)` group (Home, Book, Schedule, Club, Profile) and two stack screens (booking confirmation, offer). A small UI kit implements the PDF p.80 components. Tee times and sign-in hit the Next.js API (two new token routes are added); everything else reads one sample-data module and sends requests through the existing call-back API.

**Tech Stack:** Expo SDK 58, Expo Router 58, React Native 0.88, expo-image, expo-secure-store, react-native-svg, react-native-qrcode-svg, @expo-google-fonts (Cormorant Garamond, Montserrat); Next.js 16 route handlers for the backend.

**Spec:** `docs/superpowers/specs/2026-11-03-member-app-design.md`

## Global Constraints

- Colours: Emerald `#03321B`, Pili Gold `#E2C77A`, Ivory `#F3EDE1`, Moss `#2E5126`, Onyx `#151513`; cards `#FFFFFF`; muted text `#5D685F`.
- Type: Cormorant Garamond for screen titles, names, numbers; Montserrat for UI; eyebrows caps, letterSpacing ≈ 2.4 (+240), gold.
- One emerald primary button per flow; selected = emerald fill, open = white, full = dashed outline + struck text.
- Membership tiers: Founding · Full Golf · Corporate; no prices.
- Copy: British spelling, no serial comma in new copy, no exclamation marks, never "now open".
- Real data where a backend exists (name, plan, tee times, reservations); sample data lives only in `mobile/src/data/sample.ts`.
- Tee-time interval is the backend's 30 minutes (`COURSE.intervalMinutes`), not the PDF's 10.
- Backend changes are additive (new files, dev-only CORS entries); do not edit existing member/booking routes.
- No git commits unless the owner asks (`mobile/` is untracked). Backups go to the session scratchpad.
- Verification per task: `npx tsc --noEmit` and `npx expo lint` in `mobile/` (no unit-test runner exists in the app); backend routes are checked with `curl`; screens are checked on Expo web at 390×844 against the PDF mockups.

---

### Task 1: Backend — app session routes and dev CORS

**Files:**
- Create: `src/app/api/app/session/route.ts`
- Create: `src/app/api/app/me/route.ts`
- Create: `src/lib/app-auth.ts`
- Modify: `next.config.ts` (`headers()` list)

**Interfaces:**
- Consumes: `authenticate(email, password)`, `createSession(memberId)`, `memberFromSession(token)`, `deleteSession(token)` from `src/lib/members-db.ts`; `isLockedOut`, `recordFailure`, `clearFailures` from `src/lib/member-session.ts`.
- Produces:
  - `POST /api/app/session` body `{ email, password }` → `200 { token: string, member: AppMember }` | `400 { error: "credentials" }` | `401 { error: "credentials" }` | `429 { error: "locked" }`
  - `DELETE /api/app/session` with `Authorization: Bearer <token>` → `200 { ok: true }`
  - `GET /api/app/me` with `Authorization: Bearer <token>` → `200 { member: AppMember }` | `401 { error: "unauthorized" }`
  - `type AppMember = { firstName: string; lastName: string; email: string; mobile: string | null; plan: string | null; since: string }`

- [ ] **Step 1: Prove the routes do not exist yet**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/app/me`
Expected: `404`

- [ ] **Step 2: Write `src/lib/app-auth.ts`**

```ts
import type { Member } from "@/lib/members-db";

export type AppMember = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  plan: string | null;
  since: string;
};

/** Ang ipinapakita ng app — walang id, walang petsa ng huling login. */
export function toAppMember(member: Member): AppMember {
  return {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    mobile: member.mobile,
    plan: member.plan,
    since: member.planSince ?? member.createdAt,
  };
}

/** `Authorization: Bearer <token>` → token, o `undefined`. */
export function bearerToken(request: Request): string | undefined {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1]?.trim() || undefined;
}
```

- [ ] **Step 3: Write `src/app/api/app/session/route.ts`**

```ts
import { NextResponse } from "next/server";
import { bearerToken, toAppMember } from "@/lib/app-auth";
import { authenticate, createSession, deleteSession } from "@/lib/members-db";
import { clearFailures, isLockedOut, recordFailure } from "@/lib/member-session";

export const runtime = "nodejs";

/**
 * Sign-in ng member app. Kapareho ng /api/members/login ang pagsusuri at ang
 * lock-out, pero token ang ibinabalik (hindi cookie): ang native app ang
 * nagtatabi nito sa SecureStore at ipinapadala bilang Bearer.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "credentials" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  if (!email || !password) return NextResponse.json({ error: "credentials" }, { status: 400 });

  const key = `email:${email}`;
  if (isLockedOut(key)) return NextResponse.json({ error: "locked" }, { status: 429 });

  const member = await authenticate(email, password);
  if (!member) {
    recordFailure(key);
    return NextResponse.json({ error: "credentials" }, { status: 401 });
  }
  clearFailures(key);
  const { token } = await createSession(member.id);
  return NextResponse.json({ token, member: toAppMember(member) });
}

export async function DELETE(request: Request) {
  await deleteSession(bearerToken(request));
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Write `src/app/api/app/me/route.ts`**

```ts
import { NextResponse } from "next/server";
import { bearerToken, toAppMember } from "@/lib/app-auth";
import { memberFromSession } from "@/lib/members-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ member: toAppMember(member) });
}
```

- [ ] **Step 5: Extend dev CORS in `next.config.ts`** — replace the single `/api/tee-times` entry with:

```ts
    const allow = (methods: string) => [
      { key: "Access-Control-Allow-Origin", value: "http://localhost:8081" },
      { key: "Access-Control-Allow-Methods", value: methods },
      { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
    ];
    return [
      { source: "/api/tee-times", headers: allow("GET") },
      { source: "/api/tee-times/:path*", headers: allow("GET, POST, OPTIONS") },
      { source: "/api/app/:path*", headers: allow("GET, POST, DELETE, OPTIONS") },
      { source: "/api/callback", headers: allow("POST, OPTIONS") },
    ];
```

Also add an `OPTIONS` export returning `new Response(null, { status: 204 })` to both new route files so preflights succeed.

- [ ] **Step 6: Verify**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/app/me
curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer nope" http://localhost:3000/api/app/me
curl -s -X POST -H "Content-Type: application/json" -d '{"email":"x@y.z","password":"wrong"}' http://localhost:3000/api/app/session
curl -s -o /dev/null -w "%{http_code}\n" -X OPTIONS -H "Origin: http://localhost:8081" http://localhost:3000/api/app/session
npx tsc --noEmit -p . && npx eslint src/app/api/app src/lib/app-auth.ts
```
Expected: `401`, `401`, `{"error":"credentials"}`, `204`, no errors. Then sign in with a real test member (create one via the website /members sign-up if none exists): expect `200` with a `token`, then `GET /api/app/me` with that token → `200` with the member's name.

---

### Task 2: App foundation — backup, dependencies, tokens, assets, UI kit

**Files:**
- Create: `mobile/src/theme/tokens.ts`, `mobile/src/theme/fonts.ts`
- Create: `mobile/src/ui/text.tsx` (`Eyebrow`, `ScreenTitle`, `Body`, `Serif`), `mobile/src/ui/card.tsx` (`Card`, `LeatherCard`), `mobile/src/ui/buttons.tsx` (`PrimaryButton`, `OutlineButton`), `mobile/src/ui/chips.tsx` (`Chip`, `Badge`), `mobile/src/ui/slot.tsx` (`SlotTile`), `mobile/src/ui/toggle.tsx`, `mobile/src/ui/screen.tsx` (`Screen` with safe area, ivory background, scroll, bottom action slot), `mobile/src/ui/icons.tsx` (line icons: home, flag, calendar, shield, person, bell, fork, bay, lotus, star, sun, tag, check, plus, minus, chevron)
- Create: `mobile/assets/brand/leather.jpg`, `shield.png`, `master-logo.png`, `course-hero.jpg`, `sky-bar.jpg`, `members-lounge.jpg`, `practice-bays.jpg`, `pool-offer.jpg` (from the PDF extract), app icon `icon.png`, `adaptive-icon.png`
- Modify: `mobile/app.json` (icon, splash background `#03321B`, image = master logo)

**Interfaces:**
- Produces: `colors` `{ emerald, gold, ivory, moss, onyx, white, muted, line }`, `fonts` `{ serif, serifMedium, sans, sansMedium, sansBold }`, `radius` `{ card: 18, tile: 14, pill: 999 }`, `shadow.card`; components with props:
  - `Eyebrow({ children, tone?: 'gold' | 'ivory' })`
  - `ScreenTitle({ children })`
  - `Card({ children, style?, padded? })`, `LeatherCard({ children, style?, stitched? })`
  - `PrimaryButton({ label, onPress, disabled?, loading?, tone?: 'emerald' | 'gold' })`, `OutlineButton({ label, onPress })`
  - `Chip({ label, selected?, onPress })`, `Badge({ label })`
  - `SlotTile({ label, state: 'open' | 'selected' | 'full', onPress, sublabel? })`
  - `Toggle({ value, onChange })`
  - `Screen({ children, action?: ReactNode, scroll?: boolean })`

- [ ] **Step 1: Back up** `tar cf <scratchpad>/mobile-before-member-app.tar mobile/src mobile/app.json mobile/assets` and list the tar to confirm.
- [ ] **Step 2: Install** in `mobile/`: `npx expo install expo-secure-store` and `npm install react-native-qrcode-svg`.
- [ ] **Step 3: Assets** — copy from the PDF extract: leather `p01_0`, shield `p12_0`, master logo `p11_1`, course hero `p41_0`, sky bar `p44_1`, members' lounge `p48_2`, practice bays `p50_1`, offer pool `p49_0`; app icon = shield centred on leather, 1024×1024.
- [ ] **Step 4: Write tokens, fonts and the UI kit** exactly to the PDF p.80 component sheet (selected chip = emerald fill + white text; filter chip = ivory fill + emerald 1px outline; badge = gold fill + emerald caps; slot full = dashed `#C9BFA9` border, struck muted text; toggle = emerald track, gold knob; primary = emerald, caps, letterSpacing 2.6, height 56, radius 16).
- [ ] **Step 5: Verify** `npx tsc --noEmit` passes (UI kit compiles before any screen uses it).

---

### Task 3: Auth — token store, provider, sign-in, root layout; remove the website clone

**Files:**
- Create: `mobile/src/lib/session.ts`, `mobile/src/auth/auth-provider.tsx`, `mobile/src/app/sign-in.tsx`
- Rewrite: `mobile/src/app/_layout.tsx`
- Delete: old routes `index.tsx book.tsx book/ clubhouse/ golf/ golf.tsx packages/ stays/ events.tsx experiences.tsx explore.tsx faq.tsx getting-here.tsx members.tsx plan-your-visit.tsx shop.tsx stay.tsx terms.tsx`; components `site/ golf/ clubhouse/ packages/ stay/ events/ experiences/ explore/ visit/ home/ action-card.tsx button.tsx collapsible.tsx external-link.tsx hero-video.tsx hero.tsx rail.tsx screen.tsx section.tsx stats.tsx themed-text.tsx themed-view.tsx`; `content/`; `lib/club.ts lib/images.ts lib/site-routes.ts lib/stay-api.ts`; `hooks/` if unused; `constants/theme.ts` replaced by `theme/tokens.ts`.

**Interfaces:**
- Consumes: Task 1 endpoints; Task 2 UI kit.
- Produces:
  - `session.ts`: `getToken(): Promise<string | null>`, `setToken(token: string): Promise<void>`, `clearToken(): Promise<void>` (SecureStore native, `localStorage` web); `signIn(email, password): Promise<{ ok: true; member: AppMember } | { ok: false; error: 'credentials' | 'locked' | 'network' }>`, `fetchMe(): Promise<AppMember | null>`, `signOut(): Promise<void>`, `type AppMember` (same shape as Task 1).
  - `auth-provider.tsx`: `AuthProvider`, `useAuth(): { status: 'loading' | 'signedOut' | 'signedIn'; member: AppMember | null; signIn: typeof signIn; signOut(): Promise<void> }`.

- [ ] **Step 1:** Write `session.ts` and `auth-provider.tsx`.
- [ ] **Step 2:** Write `sign-in.tsx` (p.80): full-bleed leather `ImageBackground`, master logo centred, italic Cormorant tagline "Where the fairway meets the mountain.", gold `PrimaryButton tone="gold"` "MEMBER SIGN IN" that reveals an ivory sheet with Email + Password fields, `PrimaryButton` "SIGN IN", error copy: credentials → "That email and password do not match.", locked → "Too many attempts. Please wait a few minutes and try again.", network → "The club could not be reached. Please try again."; link "Not a member? Visit the website" → `openBrowserAsync(SITE_URL)`.
- [ ] **Step 2b:** Rewrite `_layout.tsx`: load `CormorantGaramond_400Regular/500Medium/600SemiBold`, `CormorantGaramond_400Regular_Italic`, `Montserrat_400Regular/500Medium/600SemiBold/700Bold`; wrap in `AuthProvider`; `Stack` with `headerShown: false`; redirect signed-out users to `/sign-in` and signed-in users away from it (`useSegments` + `router.replace`).
- [ ] **Step 3:** Delete the old files listed above; run `grep -rn "@/components/site\|@/content\|@/lib/club\|@/lib/images" mobile/src` → expect no output.
- [ ] **Step 4: Verify** `npx tsc --noEmit`, `npx expo lint`; on Expo web the app opens on the leather sign-in; a wrong password shows the credentials message; a real member lands on `/(tabs)`.

---

### Task 4: Tab bar and sample data

**Files:**
- Create: `mobile/src/app/(tabs)/_layout.tsx`, `mobile/src/ui/tab-bar.tsx`, `mobile/src/data/sample.ts`

**Interfaces:**
- Produces: `sample.ts` exports `SAMPLE_WEATHER`, `SAMPLE_OFFERS: Offer[]`, `SAMPLE_EVENTS: ClubEvent[]`, `SAMPLE_SCHEDULE: ScheduleItem[]`, `DINING_VENUES`, `DINING_TIMES`, `BAYS: { id: string; free: boolean }[]`, `BAY_DURATIONS`, `BAY_TIMES`, `WELLNESS_TREATMENTS`, `SAMPLE_MEMBER_CARD: { number: string; handicap: string; guestPasses: number; tier: string }`, `MEMBERSHIP_TIERS`. Types `Offer { id; eyebrow; title; text; code; ends; image }`, `ClubEvent { date: 'YYYY-MM-DD'; kind: 'Tournament' | 'Social' | 'Clinic'; time; title; detail; image; tone: 'emerald' | 'gold' }`, `ScheduleItem { day: 'YYYY-MM-DD'; time; kind: 'Tee time' | 'Dining' | 'Lesson' | 'Wellness' | 'Event'; title; detail; icon }`.
- Content copied from the PDF mockups (Inaugural Cup, Sunset on the Sky Bar, Stay & Play weekends, UPTOWN26, Sunday lounge brunch, Bay + lesson bundle, Founding/Full Golf/Corporate benefit lines).

- [ ] **Step 1:** Write `sample.ts` with a header comment: "SAMPLE DATA — not live. Replace with API data when the club's systems exist."
- [ ] **Step 2:** Write `tab-bar.tsx` (ivory bar, top hairline, five icon+label items, active emerald with a gold dot below) and `(tabs)/_layout.tsx` using `Tabs` with `tabBar={(p) => <TabBar {...p} />}`, screens `index` Home, `book` Book, `schedule` Schedule, `club` Club, `profile` Profile.
- [ ] **Step 3: Verify** tsc + lint; the five tabs switch on Expo web.

---

### Task 5: Home and offer detail

**Files:** Create `mobile/src/app/(tabs)/index.tsx`, `mobile/src/app/offer/[id].tsx`

- [ ] **Step 1: Home** (p.75 left): shield top-left, bell top-right; `Eyebrow` "GOOD MORNING"/"GOOD AFTERNOON"/"GOOD EVENING" by local hour; `ScreenTitle` = member first name; "Your next round" image card (course-hero, bottom gradient, eyebrow "YOUR NEXT ROUND", serif "Sat 14 Nov · 6:40 AM", sans "Championship 18 · Hole 1 tee · 4 players") filled from the member's next reservation when known (stored code from Task 6), else "No round booked" + "Book a tee time" link; 4 quick-action tiles (Tee time → Book, Dining/Practice bay/Wellness → Club Reserve with the matching tab); weather strip from `SAMPLE_WEATHER` with gold "ALL 18 OPEN"; leather "MEMBERS' OFFER" card with gold "VIEW" badge → `/offer/stay-and-play`.
- [ ] **Step 2: Offer** (p.78 right): full-bleed `pool-offer` image with gradient, eyebrow "MEMBERS' OFFER · ENDS 30 NOV", serif title, text; dashed gold code chip + emerald "REDEEM" (shows "Code copied — show it at the clubhouse"); "MORE FOR MEMBERS" list cards with tag icon.
- [ ] **Step 3: Verify** tsc + lint; screenshot vs p.75/p.78.

---

### Task 6: Book a tee time and confirmation (real API)

**Files:** Create `mobile/src/app/(tabs)/book.tsx`, `mobile/src/app/booking/[code].tsx`, `mobile/src/lib/next-round.ts`

**Interfaces:**
- Consumes: `fetchTeeTimes(date, holes)` (`lib/api.ts`), `reserveTeeTime(input)`, `fetchReservation(code)`, `continuePayment(code, simulate)` (`lib/booking-api.ts`), `useAuth().member`.
- Produces: `next-round.ts`: `saveNextRound(code: string): Promise<void>`, `loadNextRound(): Promise<string | null>` (same storage helper as session).

- [ ] **Step 1: Book** (p.76 left): eyebrow "CHAMPIONSHIP 18 · PAR 72", title "Book a tee time"; horizontal date strip of the next 14 days (day + Cormorant date, selected emerald); chips "18 holes" · "9 holes" · "Twilight" (Twilight = 18 holes, times from 13:00 — `LATE_START`); section label "MORNING · HOLE 1 TEE" / "AFTERNOON · HOLE 1 TEE" + "Cart included"; 4-column `SlotTile` grid from `tees[1]` (open → open, booked/past → full); Players card "You + N · 1 guest" with −/+ (1–4); bottom `PrimaryButton` "RESERVE 6:40 AM" disabled until a slot is chosen. Reserve with `addons: { cart: 1 }`, `contactName` = member full name, `contactEmail` = member email, `contactPhone` = member mobile ?? "", `playerNames` = [member name, "Guest 1", …]. On success `saveNextRound(code)` and `router.push('/booking/' + code)`; on `ok:false` show "That time has just been taken. Please choose another." for `taken`, else "The booking could not be made. Please try again."
- [ ] **Step 2: Confirmed** (p.76 right): course-hero top fading to ivory; emerald circle with gold check; eyebrow "BOOKING CONFIRMED" (status confirmed) or "ALMOST THERE" (held); title "You're on the tee" / "Complete your downpayment"; player initials avatars; white card rows Date · Tee time · Course · Includes ("Cart · caddie on request") · Reference (gold code); buttons "ADD TO CALENDAR" (Share an .ics text) · "INVITE PLAYERS" (Share message with date/time/reference) · primary "DONE" → Home, or "PAY DOWNPAYMENT" → `continuePayment` → `openBrowserAsync(checkoutUrl)` when held.
- [ ] **Step 3: Verify** tsc + lint; on Expo web pick a date and slot, reserve, land on the confirmation with a real reference that also appears in `/golf/book/<code>` on the website.

---

### Task 7: Schedule — club calendar and my schedule

**Files:** Create `mobile/src/app/(tabs)/schedule.tsx`, `mobile/src/ui/month-grid.tsx`

**Interfaces:** `MonthGrid({ year, month, selected: string, marks: Record<string, 'emerald' | 'gold'>, onSelect(date: string) })`.

- [ ] **Step 1:** Segmented control "Club calendar" | "My schedule".
- [ ] **Step 2: Club calendar** (p.77 left): eyebrow month + year, title "Club calendar"; white card with S M T W T F S header and the month grid (selected = emerald rounded square with gold dot); dots from `SAMPLE_EVENTS`; day label "SATURDAY 14 NOV" + "N events"; event cards (thumb, gold "TOURNAMENT · 7:00 AM", serif title, detail); "No events this day." when empty.
- [ ] **Step 3: My schedule** (p.77 right): eyebrow "THIS WEEKEND", title "My schedule"; chips for the next two days + "Upcoming"; vertical timeline (time column, dot emerald/gold, connecting line, white card with icon, gold eyebrow kind, serif title, detail) from `SAMPLE_SCHEDULE`, with the member's real next round (if any) merged in as a "TEE TIME" item.
- [ ] **Step 4: Verify** tsc + lint; screenshot vs p.77.

---

### Task 8: Club — membership and reserve (dining, practice bays, wellness)

**Files:** Create `mobile/src/app/(tabs)/club.tsx`, `mobile/src/lib/club-request.ts`

**Interfaces:**
- Produces: `sendClubRequest(input: { member: AppMember; interest: string; timeframe: string; guests: number; mobile: string }): Promise<boolean>` → `POST /api/callback` with `firstName`, `lastName`, `email`, `mobile`, `interest`, `timeframe`, `guests`, `callWindows: ["9:00 AM – 12:00 PM"]`.
- Route param `?tab=dining|bays|wellness|membership` selects the view (Home quick actions link here).

- [ ] **Step 1:** Top chips "Membership" · "Dining" · "Practice bays" · "Wellness".
- [ ] **Step 2: Membership** (p.78 left): eyebrow "JOIN THE CLUB", title "Membership"; leather Founding card ("LIMITED · 2026 ONLY", gold badge "FEW LEFT", three "— " benefit lines), white Full Golf ("INDIVIDUAL & FAMILY") and Corporate ("UP TO 4 NOMINEES") cards; primary "ENQUIRE ABOUT MEMBERSHIP" → `sendClubRequest({ interest: "Membership", timeframe: <tier in view or "Founding">, guests: 1 })`.
- [ ] **Step 3: Dining** (p.79 left): eyebrow "DINING · BAYS · WELLNESS", title "Reserve"; two venue image cards (ROOFTOP Sky Bar & Gardens — "Sunset cocktails · small plates"; LAKESIDE Members' Lounge — "All-day dining · private corners"), selectable; "TONIGHT · PARTY OF 2" + "Change" (party 1–8 stepper sheet); time chips 6:30/7:00/7:30/8:00 PM; primary "RESERVE AT 7:30 PM" → request interest "Dining — <venue>", timeframe "Tonight 7:30 PM".
- [ ] **Step 4: Practice bays** (p.79 right): hero card "COVERED · FLOODLIT" Practice bays "Ball tracking · lake views"; "CHOOSE A BAY · TODAY" + "N free"; 6-column bay grid (`SlotTile` with "BAY" sublabel and Cormorant two-digit number); duration chips 30/60/90 min; time chips 3:00/3:30/4:00/4:30 PM; "Add a coach" card with Toggle ("30-min swing review with the club pro"); primary "BOOK BAY 07 · 4:00 PM".
- [ ] **Step 5: Wellness**: same pattern — treatment cards from `WELLNESS_TREATMENTS`, time chips, primary "REQUEST <TREATMENT> · <TIME>".
- [ ] **Step 6:** After any request: ivory confirmation panel with emerald check, "Request sent", "The club will confirm by phone or email." If the member has no mobile on file, a one-field sheet asks for it first.
- [ ] **Step 7: Verify** tsc + lint; a dining request appears in the website admin call-back list (`data/admin.sqlite`/inquiries) with interest "Dining — Sky Bar & Gardens".

---

### Task 9: Profile — member card

**Files:** Create `mobile/src/app/(tabs)/profile.tsx`

- [ ] **Step 1** (p.75 right): eyebrow "DIGITAL MEMBERSHIP", title "Member card"; leather card with dashed gold stitch inset: shield top-left, gold "<TIER> MEMBER" + "Since <year>" top-right, Cormorant member name, gold tracked member number "CUG · 0026 · 0418" (from `SAMPLE_MEMBER_CARD` until real numbers exist), small wordmark bottom-right; white QR card (`react-native-qrcode-svg`, emerald on white, value = member number) with "Show at arrival, pro shop and bars"; two tiles "HANDICAP" / "GUEST PASSES" with Cormorant values; "Sign out" outline button; "Visit the website" text link. Tier label = PDF tier names; when `member.plan` is null show "MEMBER".
- [ ] **Step 2: Verify** tsc + lint; screenshot vs p.75.

---

### Task 10: Polish and end-to-end verification

- [ ] **Step 1:** `app.json`: name "CamSur Uptown Golf", icon/adaptive icon = shield on leather, splash = master logo on `#03321B`, `userInterfaceStyle: "light"`.
- [ ] **Step 2:** Run `npx tsc --noEmit` and `npx expo lint` in `mobile/`; `npx tsc --noEmit -p .` at the repo root.
- [ ] **Step 3:** Restart Expo web with `--clear`; capture every screen at 390×844 and place each beside its PDF mockup; fix spacing, sizes and colours that differ.
- [ ] **Step 4:** End-to-end on Expo web: sign in → Home shows the member's name → Book a real slot → confirmation reference → Home "Your next round" shows it → Club dining request → Profile card → sign out returns to the leather sign-in.
- [ ] **Step 5:** Update `brand-brain/05-brand-guidelines-2026.md` §10 and `00-README.md` (member app rebuilt; sample data list; 30-minute interval note).
