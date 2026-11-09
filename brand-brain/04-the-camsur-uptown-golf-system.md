# 04 — The CamSur Uptown Golf system (READ FIRST)

What the club actually is, who supplies each part, and what may be said about it. Every other file in this brain sits on this one. Where another file disagrees, this file wins on what the product is. The club's *Brand Guidelines 2026* (`05-brand-guidelines-2026.md`) win on look, voice, naming and messaging (owner decision, 2026-11-03).

Status key: **followed** = live copy already does it · **wish** = stated, not yet followed · **owner call** = undecided · **PROPOSED** = drafted by Claude, owner to approve.

## 1. The product in one line

A new 18-hole championship golf club beneath Mt. Isarog in San Jose, Pili, Camarines Sur, Philippines — with a clubhouse, course-side stays at Villa Del Rey, golf packages, events, and a paid membership. Source: `src/app/layout.tsx` (site description), `src/lib/site-content.ts`.

## 2. The parts

| Part | What it is | Who designs / supplies / runs it | Status | Source |
|---|---|---|---|---|
| The course | 18 holes, par 72, 6,851 yards / 6,262 m from the back (Black) tees — sum of `HOLE_PROFILES`, 54.23 hectares, 7 water features | Course design credited to IMG ("Course design by IMG", "An IMG-designed championship course" [BG p.43]) | Concept / under development. Opening year "To be confirmed" on hole pages | `src/app/page.tsx`, `src/app/[section]/page.tsx`, `mobile/src/content/golf.ts`, `src/lib/course-holes.ts` |
| The clubhouse | One sculpted volume: 3 levels + rooftop, 2,695 m², 10 spaces, 300 member lockers, 4 lakes on the estate | Architectural concept by VM·STUDIO (London) — "Architecture · Interiors · Landscape" | **Concept, not as-built.** Rooms, areas and finishes may change | `src/lib/clubhouse.ts` (`CLUBHOUSE_CONCEPT_NOTE`) |
| Stays | Villa Del Rey: Villas, Cabins, Cabana, Dwell | Described as "CamSur resort stay"; relationship of ownership to the club not stated | Live on site with nightly rates | `src/lib/villa-del-rey.ts`, `src/lib/golf-booking.ts` (`VILLA_NIGHTS`) |
| Experiences | Wakeboarding, pickleball, basketball, massage, ATV, Lago Del Rey, pump track, skate park, kiddie park, billiards | Facilities of CamSur / CWC (CamSur Watersports Complex); each links to visitcamsur.com or pickleball.camsur.com | Live links | `src/lib/site-content.ts` (`SITE_SECTIONS` experiences), `src/components/VisitCamsurLogo.tsx` |
| Packages | Stay & Play; Group Golf Getaway (2 packages) | Club | "Rate on request" | `src/components/PackagesDetails.tsx` |
| Events | Golf tournaments, corporate events, private celebrations | Club | Live | `src/components/EventsDetails.tsx` |
| Membership | Birdie ₱3,500 / Eagle ₱7,500 / Albatross ₱18,000 per month (Estimates) | Club | Example prices, not approved (see §4) | `src/lib/membership-plans.ts` |
| Tee-time booking | Online booking, 30% downpayment via PayMongo, rest paid at the club | Club; payments by PayMongo | Live (test mode in dev) | `src/lib/golf-booking.ts`, `src/lib/paymongo.ts` |

## 3. Place

| Fact | Value | Source |
|---|---|---|
| Address | San Jose, Pili, Camarines Sur 4418, Philippines | `src/lib/site-content.ts` `CLUB_ADDRESS`; ZIP 4418 confirmed by the Brand Guidelines 2026 (p.99) |
| Coordinates | 13.584308, 123.253267 | same |
| Landmark | Mt. Isarog on the horizon | `src/lib/site-content.ts`, `src/lib/course-holes.ts` |
| Nearest airport | Naga Airport (Pili), ~25 min | `TRAVEL_ROUTES` — marked TODO, travel times to confirm |
| Phone / email | +63 916 300 7914 · camsuruptowngolf@gmail.com | `CLUB_PHONE`, `CLUB_EMAIL` |
| Course hours | 6:00 AM – 6:00 PM, tee every 30 min, book up to 30 days ahead | `src/lib/golf-booking.ts` `COURSE` |

## 4. Prices that exist in code

All figures are PHP and all are **Estimates**: both price files say in a code comment "HALIMBAWANG PRESYO … hindi pa inaprubahan ng club" (example prices, not yet approved by the club). They appear on the live site, but must not be used in ads or quoted as final until the owner approves them. **owner call.**

| Item | Price | Source |
|---|---|---|
| Green fee, 18 holes | ₱4,500 per player | `GREEN_FEES` |
| Green fee, 9 holes | ₱2,500 per player | `GREEN_FEES` |
| Caddie / cart / clubs / range bucket | ₱800 / ₱1,800 / ₱1,500 / ₱300 | `ADDONS` |
| Villas / Dwell / Cabins / Cabana per night | ₱9,500 / ₱7,500 / ₱6,500 / ₱4,500 | `VILLA_NIGHTS` |
| Membership per month | Birdie ₱3,500 · Eagle ₱7,500 · Albatross ₱18,000 | `MEMBERSHIP_PLANS` |
| Downpayment | 30% online | `COURSE.depositRate` |

## 5. Message hierarchy

Primary tagline: **"Where the fairway meets the mountain."** [05 §1]. Pillar lines and boilerplate: 05 §2.

1. **The course** — an IMG-designed championship 18 beneath Mt. Isarog. Lead with the landscape: water, broad fairways, the mountain. (followed — home hero, Golf page)
2. **The clubhouse** — "Not a building beside the course, but a continuation of the landscape." (followed — `CLUBHOUSE_BRIEF`)
3. **The stay** — Villa Del Rey: "A relaxed base for your CamSur visit." (followed)
4. **The trip** — packages, events, and CamSur's experiences beyond golf. (followed)
5. **Belonging** — membership: "Your club, a step ahead." (followed — members page)

## 6. What may and may not be said

| May say | Must not say | Why |
|---|---|---|
| "Course design by IMG", "An IMG-designed championship course" (also "Designed by IMG", "shaped by IMG") | "official IMG partner", "endorsed by IMG", any IMG award, that IMG owns or runs the club | Guidelines p.43: credit the course design only. IMG logo use approved in writing (owner, 2026-11-03) |
| Clubhouse "concept by VM·STUDIO", "drawn from the architectural concept" | That the clubhouse is built, open, or final | `CLUBHOUSE_CONCEPT_NOTE`: concept, not as-built |
| "Est. 2027" (brand mark) | A specific opening date | Hole pages say "Opening year: To be confirmed" |
| "Championship" course, par 72, 6,851 yds, 54.23 ha | "World's best", rankings, awards, reviews, member counts | No source |
| Facilities "at CamSur" with links to visitcamsur.com | That the club owns or runs CWC facilities | They are CWC facilities |
| Prices in §4 only where already shown on the site, never as final | Package prices; any price as "fixed" or "guaranteed" | Packages are "Rate on request"; §4 prices are unapproved examples |

**Conflict (open item):** FAQ says "Rates are quoted, not listed" (`FAQ_GROUPS`), but green fees, villa nights and membership are listed with prices. **owner call.**

## 7. The digital product

| Surface | Stack | Note |
|---|---|---|
| Website | Next.js 16, Tailwind 4, `src/app` | Identity authority for look (tokens in `src/app/globals.css`, fonts in `src/app/layout.tsx`) |
| Mobile app | Expo SDK 58, Expo Router, `mobile/` | Reads website content directly via `@site/*` (`mobile/metro.config.js`); English only |
| Languages (web) | EN, FIL, JA, KO, VI, ZH | `src/i18n/strings/*.json`; "CamSur Uptown Golf" and "IMG" are never translated |
