# CamSur Uptown Golf member app — design

Date: 2026-11-03 · Status: approved in chat (Approach A) · Source of truth for the UI: *Brand Guidelines & Campaign 2026*, chapter 10 "The Member App" (PDF p.74–80; text in `brand-brain/sources/brand-guidelines-2026.md`).

## Goal

Replace the current Expo app in `mobile/` — a copy of the public website (golf, clubhouse, packages, stays, events, experiences, FAQ…) — with the members-only app drawn in the brand guidelines: five tabs, ivory screens, emerald actions, gold for status, calm and never busy.

## Decisions (owner, 2026-11-03)

1. **Rebuild in place** in `mobile/` (same Expo SDK 58 project, fonts, API helpers and EAS config). Website-style screens, components and content are deleted after a backup (`mobile/` is not tracked by git).
2. **Members-only.** The first screen is the leather splash with "Member sign in". A small "Not a member? Visit the website" link opens the website. No guest mode.
3. **Real where a backend exists, sample data elsewhere.** Tee times (availability, reserve, downpayment) and member sign-in are real. Club calendar, My schedule, dining, practice bays, wellness, member card details (number, handicap, guest passes) and offers use one clearly named sample-data module. Dining, bay and wellness "Reserve" send a request to the club through the existing call-back API and confirm "Request sent", not an instant booking.
4. **Membership tiers follow the PDF:** Founding · Full Golf · Corporate, no prices, "Enquire about membership". The website and backend keep Birdie · Eagle · Albatross until the club decides (open item in brand-brain 05 §9).

## Screens and navigation (Expo Router)

```
src/app/
  _layout.tsx              fonts, theme, auth gate (signed out → /sign-in)
  sign-in.tsx              p.80 splash: emerald leather, master logo, tagline, gold "Member sign in" → email/password sheet
  (tabs)/_layout.tsx       Tabs: Home · Book · Schedule · Club · Profile (icons + gold dot on active)
  (tabs)/index.tsx         p.75 Home
  (tabs)/book.tsx          p.76 Book a tee time
  (tabs)/schedule.tsx      p.77 Club calendar ⇄ My schedule (segmented)
  (tabs)/club.tsx          p.78 Membership ⇄ p.79 Reserve (Dining · Practice bays · Wellness)
  (tabs)/profile.tsx       p.75 Member card
  booking/[code].tsx       p.76 "You're on the tee" confirmation (+ downpayment state)
  offer/[id].tsx           p.78 Members' offer detail
```

| Screen | Content (from the PDF) | Data |
|---|---|---|
| Sign in | Leather background, master logo, "Where the fairway meets the mountain.", gold "MEMBER SIGN IN"; sheet with email + password, error states | `POST /api/app/session` |
| Home | Shield + bell; "GOOD MORNING" eyebrow + first name; "Your next round" image card (date · time, course · tee · players); quick actions Tee time · Dining · Practice bay · Wellness; weather strip (°C · wind, course status, "ALL 18 OPEN"); "Members' offer" leather card with "VIEW" | next round: member's upcoming reservation if the API has one, else an empty-state card "No round booked" → Book; weather: sample (the website's forecast is server-side only); offer: sample |
| Book | Eyebrow "CHAMPIONSHIP 18 · PAR 72"; "Book a tee time"; swipeable date strip; chips 18 holes · 9 holes · Twilight; "MORNING · HOLE 1 TEE" + "Cart included"; 4-column slot grid (selected emerald, open white, full dashed + struck); Players stepper; "RESERVE 6:40 AM" | `GET /api/tee-times`, `POST /api/tee-times/reserve` (existing) |
| Confirmed | Course image top, emerald check, "BOOKING CONFIRMED", "You're on the tee", player avatars, rows Date · Tee time · Course · Includes · Reference (gold); "ADD TO CALENDAR" · "INVITE PLAYERS" · "DONE". If a downpayment is still due, the eyebrow reads "ALMOST THERE" and the main button is "PAY DOWNPAYMENT" (opens the existing PayMongo link) | existing reservation API |
| Club calendar | "NOVEMBER 2026" eyebrow, month grid with emerald/gold dots, selected day; day list of event cards (thumb, "TOURNAMENT · 7:00 AM", title, detail) | sample |
| My schedule | "THIS WEEKEND", day chips + "Upcoming"; vertical timeline (time, dot, card with type eyebrow, title, detail) | sample + the member's real tee times when available |
| Membership | "JOIN THE CLUB"; Founding leather card ("LIMITED · 2026 ONLY", "FEW LEFT" badge, three benefits); Full Golf; Corporate; "ENQUIRE ABOUT MEMBERSHIP" | static copy from PDF; enquiry → call-back API |
| Offer | Full-bleed image, "MEMBERS' OFFER · ENDS 30 NOV", title, text; dashed code chip + "REDEEM"; "MORE FOR MEMBERS" list | sample |
| Reserve | "DINING · BAYS · WELLNESS"; chips; Dining: venue image cards (Sky Bar & Gardens, Members' Lounge), "TONIGHT · PARTY OF 2" + Change, time chips, "RESERVE AT 7:30 PM". Bays: hero card, 12-bay grid (free/selected/taken), 30/60/90 min, times, "Add a coach" toggle, "BOOK BAY 07 · 4:00 PM". Wellness: same pattern | sample availability; submit → call-back API "Request sent" |
| Profile | "DIGITAL MEMBERSHIP", leather member card (shield, tier, "Since 2026", name, member number, small wordmark), QR card "Show at arrival, pro shop and bars", Handicap and Guest passes tiles; sign out; "Visit the website" | name/email/plan from `GET /api/app/me`; number, handicap, passes: sample; QR encodes the member number |

## Design system (PDF p.80)

- Colours: Emerald `#03321B` (actions, selected), Pili Gold `#E2C77A` (status, badges, active-tab dot), Ivory `#F3EDE1` (screens), Moss `#2E5126`, Onyx `#151513`; white cards; muted text `#5d685f`.
- Type: Cormorant Garamond for screen titles, names and numbers; Montserrat for interface, labels and buttons; eyebrows in caps with +240 tracking, gold.
- Components: `Eyebrow`, `ScreenTitle`, `Card` (white, soft rounded corners, gentle emerald shadow), `LeatherCard` (leather texture + dashed stitch), `Chip` (selected / filter), `Badge`, `SlotTile` (selected / open / full-dashed), `PrimaryButton` (emerald, caps), `OutlineButton`, `Toggle` (emerald track, gold knob), `TabBar` (icons, label, gold dot under active).
- One action per flow: each flow ends on a single emerald button (PDF p.79).
- Assets from the PDF: leather texture, shield, master logo; app icon = shield on emerald leather (never the full lockup).

## Backend additions (additive only)

- `POST /api/app/session` — `{ email, password }` → `{ token, member }` using the existing `authenticate` + `createSession`; same lock-out rules as `/api/members/login`.
- `GET /api/app/me` — `Authorization: Bearer <token>` → `{ name, email, plan, since }` via `memberFromSession`; 401 when invalid.
- `DELETE /api/app/session` — signs out (`deleteSession`).
- Dev CORS in `next.config.ts` for `/api/app/*` and `/api/callback` from `http://localhost:8081` (methods GET, POST, DELETE; `Authorization`, `Content-Type` headers).
- Token storage in the app: `expo-secure-store` on iOS/Android, `localStorage` on web.

## Removed from the app

Routes `book/`, `clubhouse/`, `golf/`, `packages/`, `stays/`, `events`, `experiences`, `explore`, `faq`, `getting-here`, `members`, `plan-your-visit`, `shop`, `stay`, `terms`, the old `index`; their components (`site/`, `golf/`, `clubhouse/`, `packages/`, `stay/`, `events/`, `experiences/`, `explore/`, `visit/`, `home/`, hero/rail/section helpers) and `content/*`. Kept: `lib/api.ts`, `lib/booking-api.ts`, `lib/dates.ts`, fonts, `constants/theme.ts` (rewritten to the new tokens). Backup tarball before deletion.

## Truth rules carried over

No prices for membership; no "now open"; sample data is never shown as the member's real data where real data exists (next round, name, plan). Sample events and offers are labelled in code as sample and are easy to replace.

## Verification

`npx tsc --noEmit` and `npx expo lint` in `mobile/`; Expo web at 390×844 screenshots of every screen compared side by side with the PDF mockups; a real sign-in with a test member and a real tee-time hold through the app.

## Out of scope

Push notifications, calendar sync and player invites (buttons present; calendar uses an `.ics` share, invites use the system share sheet), payments other than the existing PayMongo downpayment link, a real events/dining/bays/wellness backend, Android/iOS store builds.
