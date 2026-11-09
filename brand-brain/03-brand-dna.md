# CamSur Uptown Golf Brand Brain — 03 Brand DNA

Who the club is for, what it solves, and why it wins. Read `04-the-camsur-uptown-golf-system.md` first; it wins on what the product is.

**Source keys:**
[SYS] `brand-brain/04-the-camsur-uptown-golf-system.md` · [SC] `src/lib/site-content.ts` · [CH] `src/lib/clubhouse.ts` · [HO] `src/lib/course-holes.ts` · [VDR] `src/lib/villa-del-rey.ts` · [MP] `src/lib/membership-plans.ts` · [GB] `src/lib/golf-booking.ts` · [HOME] `src/app/page.tsx` · [SEC] `src/app/[section]/page.tsx` · [GOLF] `src/components/GolfDetails.tsx` · [PKG] `src/components/PackagesDetails.tsx`, `src/app/packages/stay-and-play/page.tsx`, `src/app/packages/buddy-trip/page.tsx`, `src/components/PackageItineraryPage.tsx` · [EV] `src/components/EventsDetails.tsx` · [EXP] `src/components/ExperiencesDetails.tsx` · [VIS] `src/components/VisitDetails.tsx` · [MEM] `src/app/members/page.tsx`, `src/components/MembershipPlans.tsx` · [PYV] `src/app/plan-your-visit/page.tsx` · [GI] `src/components/GroupInquiry.tsx` · [I18N] `src/i18n/config.ts`, `src/i18n/dictionaries.ts`, `src/i18n/strings/*.json` · [TOU] `src/app/terms-of-use/page.tsx` · [FOOT] `src/components/Footer.tsx`

**Authorities:** claims = [SC] [CH] [HO] [VDR] [MP] · plan (prices) = [GB] [MP] · identity = website (see [SYS] §7).
**Owner corrections:** `brand-brain/brain.json` does not exist yet, so there are no recorded corrections. Nothing in this file is overridden by one.
**Brand book:** *Brand Guidelines 2026* arrived on 2026-11-03 (`05-brand-guidelines-2026.md`): story, purpose, vision, promise, four pillars (Sense of Place · Championship Standard · Gracious Hospitality · Quiet Luxury) and personality are in 05 §1 and win over the inferred positioning below. There is still no business plan or research report, so segments, problem and difference come from what the site says and who it addresses. Anything beyond that is marked **PROPOSED**.

Status key: **followed** = live copy already does it · **wish** = stated, not followed · **owner call** = undecided · **PROPOSED** = drafted by Claude, owner to approve.

## The Brand DNA in six lines

All six lines are **PROPOSED**. The site shows each part, but no owner document states them.

1. **WHO WE HELP**: We help golfers playing in or travelling to Camarines Sur (solo, as couples, or in foursomes and groups, members or visitors) who want a round, a stay and a plan for the people with them, all from one club.
2. **THE PROBLEM**: They struggle to put a golf trip together when the tee time, caddie, cart, rooms, airport transfer and things for non-golfers each have to be arranged separately.
3. **HOW WE SOLVE IT**: We pair an 18-hole, par-72 course with online tee booking (30% downpayment), course-side stays at Villa Del Rey, packages, events and CamSur activities, so they book once and the club arranges the rest.
4. **WHY WE ARE DIFFERENT**: The sources name no competitor. What sets the club apart: a course designed by IMG beneath Mt. Isarog, a landscape-led clubhouse concept by VM·STUDIO, and stays and CamSur experiences around the course.
5. **PROOF**: 18 holes, par 72, 54.23 hectares, 7 water features; clubhouse concept of 2,695 m² over 3 levels + rooftop with 300 member lockers (concept, not as-built). There are no reviews, awards or opening date yet.
6. **ONE LINE**: CamSur Uptown Golf helps golfers in and visiting Camarines Sur get a championship round beneath Mt. Isarog, a course-side stay and a planned trip, all booked in one place.

Sources by line: 1 [SC] FAQ, [PKG] "Ideal for", [MEM] · 2 inferred from what the site bundles: [PKG] inclusions, [SC] `ARRIVAL_NOTES`, FAQ, [EXP] · 3 [GB] `COURSE`, [VDR], [PKG], [EV], [SC] `SITE_SECTIONS` · 4 [HOME], [CH] `CLUBHOUSE_DESIGNER`, [SC] · 5 [HOME], [GOLF], [HO], [CH] `CLUBHOUSE_FACTS` · 6 [SYS] §1, [SC] / `src/app/layout.tsx` description.

## 1. Who we help: segments

Each segment is **followed**: the site addresses it directly. The priority order between segments is **owner call**.

| Segment | Situation | Problem | What they need to hear | Evidence |
|---|---|---|---|---|
| Visiting golfers (non-members) | Want to play without joining | Unsure if a club will let them in | "Yes. Visitors are welcome throughout the week." No handicap certificate is needed. Book online. | [SC] FAQ "Can I play if I am not a member?"; [VIS] FAQ; [GOLF] "Book your first round." |
| Couples and solo golfers | A short overnight golf break | Need the room, round and breakfast arranged together | Stay & Play: one night, one round with a caddie, breakfast, range balls | [PKG] stay-and-play `["Ideal for", "Couples and solo golfers"]` |
| Golf groups, foursomes, friends | A multi-day trip for a fixed group | Tee times, pairings, transfers and dinner for many people | Group Golf Getaway: two nights, two rounds, one group dinner, arranged around the party | [PKG] buddy-trip "designed for friends who play together"; `["Ideal for", "Foursomes and golf groups"]`; [GB] `maxPlayers: 4` |
| Members | Play often and want a home club | Want priority, a lounge, and a reason to come back | Three monthly plans; members' lounge; priority tee times; member rates | [MP]; [MEM] "Three ways to belong.", "Your club, a step ahead." |
| Corporate and event organisers | Company golf days, team days | Need one team to run golf, dining and timings | "the club runs the day, so you can be a guest at your own event" | [EV] Corporate Events, Golf Tournaments; [GI] placeholder "A company golf day for 24 players…"; [PYV] "the events team replies within 48 hours" |
| Private celebrations | Birthdays, anniversaries, reunions, milestones (and weddings on [PYV]) | Want a setting, not a fixed running order | Personalised menus and flow, sunset gatherings | [EV] Private Celebrations; [PYV] "weddings" |
| Families and non-golfers with golfers | Partners and children on the trip | Nothing for them to do while others play | Wakeboarding, kiddie park, massage, Lago Del Rey and more; a separate itinerary built "around your tee times" | [SC] FAQ "Is there anything for people who do not play golf?"; [EXP]; [VDR]/[SC] Villa Del Rey "for golf groups, families" |
| Flying-in visitors (Manila and abroad) | Arrive via Naga Airport | Need transfers and travel times | Naga Airport about 25 min (to confirm); transfers with 24 hours' notice | [SC] `TRAVEL_ROUTES` "Daily flights from Manila"; `ARRIVAL_NOTES`; `CLUB_PHONE` comment: E.164 format "so that it dials correctly from abroad" |
| International visitors (JA, KO, VI, ZH speakers) | Overseas golfers | Language | Site available in their language | **Inference** from [I18N] `LOCALES`. No source says these are target markets: **owner call** |
| Regional players (Naga, Legazpi, Bicol) | Drive in for a round | Route and time | Routes from Naga City (20 min) and Legazpi (2 hrs), both to confirm | [SC] `TRAVEL_ROUTES`; Bikol (`BCL`) locale built but hidden from the switcher [I18N]. **Inference** |
| First-timers and higher handicaps | New or improving players | Fear of a hard course | Wide landing areas; no handicap certificate; keep pace | [SC]/[VIS] FAQ handicap answer; [GOLF] `PRINCIPLES` "playable for higher handicaps" (defined in code, but the `DesignPrinciples` section renders empty, so this is a **wish**) |

## 2. The problem we solve

Source: inferred from what the site bundles and answers. **PROPOSED**, because there is no research or customer data.

- A golf trip to Camarines Sur has many parts: tee time, caddie (required, "one caddie per bag on every round" [SC] FAQ), cart, club rental, rooms, airport transfer, meals, things for non-golfers.
- Visitors don't know whether non-members can play, how far ahead to book, or what to wear. The FAQ and [VIS] answer each of these.
- Groups and event organisers need one team to set timings, dining and golf. [EV] says: "Nothing here is a fixed package."
- Partners and families need something to do during the round ([SC] FAQ, [EXP]).

## 3. How we solve it

| Need | What the club does | Status | Source |
|---|---|---|---|
| Book a round | Online tee booking 6:00 AM–6:00 PM, a tee every 30 min, up to 30 days ahead, 30% downpayment online, balance at the club | followed (live; test mode in dev) | [GB] `COURSE`; [PYV] "Secure it with a small downpayment." |
| Extras | Caddie, cart, club rental, range bucket added to the booking | followed | [GB] `ADDONS` |
| Stay the night | Villa Del Rey nights added to the booking; suggested for start times from 1:00 PM | followed | [GB] `VILLA_NIGHTS`, `LATE_START` |
| Whole trip | Stay & Play; Group Golf Getaway. "Rates on request" | followed | [PKG] |
| Groups and events | Inquiry form; tailored day; club runs it | followed | [EV], [GI], [PYV] |
| Non-golfers | Ten CamSur facilities, linked to visitcamsur.com / pickleball.camsur.com | followed | [SC] `SITE_SECTIONS` experiences, [EXP] |
| Getting there | Transfers with 24 hours' notice; free parking | followed in copy; marked TODO to confirm | [SC] `ARRIVAL_NOTES` |
| Belonging | Birdie / Eagle / Albatross monthly plans | followed in copy; prices not approved (see §9) | [MP] |

## 4. Products, services and surfaces (as they exist now)

There are no specs here beyond the sources. Prices are **Estimate**: both plan files say "HALIMBAWANG PRESYO … hindi pa inaprubahan ng club" (example prices, not yet approved by the club).

| Offer | What it is | Price (Estimate, PHP) | Source |
|---|---|---|---|
| Green fee | 18 holes / 9 holes per player | ₱4,500 / ₱2,500 | [GB] `GREEN_FEES` |
| Add-ons | Caddie per player / cart per 2 players / club set / range bucket | ₱800 / ₱1,800 / ₱1,500 / ₱300 | [GB] `ADDONS` |
| Villa Del Rey nights | Villas (4 units, sleeps 4) / Dwell (4, sleeps 2) / Cabins (6, sleeps 2) / Cabana (6, sleeps 2) | ₱9,500 / ₱7,500 / ₱6,500 / ₱4,500 per night | [GB] `VILLA_NIGHTS` |
| Stay & Play | 1 night, 1 round with caddie, breakfast, range balls | Rate on request | [PKG] |
| Group Golf Getaway | 3 days, 2 nights, 2 rounds with caddies, daily breakfast, 1 group dinner, transfers | Rate on request | [PKG] |
| Events | Golf tournaments, corporate events, private celebrations | Not priced | [EV] |
| Membership | Birdie / Eagle / Albatross per month | ₱3,500 / ₱7,500 / ₱18,000 | [MP] |
| Clubhouse | Concept only: 3 levels + rooftop, 2,695 m², 10 named spaces | n/a | [CH] |
| Surfaces | Website (EN, FIL, JA, KO, VI, ZH); Expo app in `mobile/` (English only) | n/a | [SYS] §7, [I18N] |

## 5. Why we are different: competitor landscape

**No competitor or benchmark is named in any source.** [PKG] has a code comment saying the package structure follows "karaniwang ginagawa ng mga resort-golf club" (what resort-golf clubs usually do), but it names no club. The table below lists sourced differentiators only.

| Competitor | What they are | How CamSur Uptown Golf differs |
|---|---|---|
| None named in sources | n/a | Do not invent comparisons. **owner call** to supply a benchmark list |

| Difference | Wording we may use | Status | Source |
|---|---|---|---|
| Course designed by IMG | "Designed by IMG", "shaped by IMG" | followed. Never "official partner" or "endorsed by" ([SYS] §6) | [HOME] `home.designedBy` + IMG link; [SEC] hero |
| Beneath Mt. Isarog | "beneath Mt. Isarog", "open views of the mountain" | followed | `src/app/layout.tsx`; [GOLF]; [HO] hole 15 |
| Landscape-led clubhouse | "Not a building beside the course, but a continuation of the landscape" | followed; concept by VM·STUDIO, not built | [CH] `CLUBHOUSE_BRIEF`, `CLUBHOUSE_CONCEPT_NOTE` |
| Course-side stays | Villa Del Rey: "A relaxed base for your CamSur visit." | followed; ownership link to the club not stated | [SC] `ACCOMMODATIONS` |
| CamSur activities for the whole party | "Facilities at CamSur", linked out | followed; the club does not own or run CWC facilities ([SYS] §6) | [SC], [EXP] |
| Online booking with downpayment | "Choose your date and tee time online and secure it with a downpayment" | followed | [GOLF], [GB] |
| Playable for all levels | "Generous landing areas keep the course playable for higher handicaps." | wish (in code, not rendered) | [GOLF] `PRINCIPLES` |

## 6. Origin / provenance story

What the sources support:
- "Est. 2027" brand mark ([HOME]). There is no opening date: hole pages show "Opening year" with the value "To be confirmed" (`src/app/golf/courses/[hole]/page.tsx`).
- Course design is credited to IMG ([HOME], [SEC]). The terms of the relationship are not in the sources.
- Hole figures are "transcribed from the supplied CamSur Golf Course scorecard" ([HO]).
- Clubhouse: two VM·STUDIO documents, the zoning study (April 2026) and the architectural concept (June 2026), which supersedes it. The client brief asked for "a world-class golf clubhouse … inspired by Filipino and tropical Asian architecture" ([CH] `CLUBHOUSE_CLIENT_BRIEF`).
- Address: San Jose, Pili, Camarines Sur ([SC] `CLUB_ADDRESS`).
- There is no founder story, ownership, developer name or history in the sources. **owner call**. Do not write one.

## 7. Proof

### Proof we have (verifiable in sources)
| Fact | Value | Source |
|---|---|---|
| Holes / par | 18 / 72 (front 35, back 37; 5 par 3s, 8 par 4s, 5 par 5s) | [HO] `HOLE_PROFILES`; [HOME] |
| Site area | 54.23 hectares | [HOME], [GOLF] |
| Water features | 7 | [GOLF] |
| Course length, back tee | Sum of [HO]: 6,851 yd / 6,262 m. **Conflicts with [SYS] "6,697 yards". Do not publish either total until the owner confirms (§9)** | [HO] |
| Clubhouse concept | 2,695 m² (875 + 1,155 + 665), 3 levels + rooftop, 300 member lockers, 4 lakes on the estate, 10 spaces | [CH] `CLUBHOUSE_FACTS`, `CLUBHOUSE_AREAS`, `CLUBHOUSE_SPACES` |
| Clubhouse designer | VM·STUDIO, London: "Architecture · Interiors · Landscape" | [CH] `CLUBHOUSE_DESIGNER` |
| Course hours and booking | 6:00 AM–6:00 PM, 30-min interval, up to 4 players, 30 days ahead, 30% downpayment | [GB] `COURSE` |
| Villa Del Rey stock | 20 units across 4 house types (Estimate; plan file) | [GB] `VILLA_NIGHTS` |
| Experiences | 10 CamSur facilities, each with an official page | [SC] |
| Contact | +63 916 300 7914 · camsuruptowngolf@gmail.com (confirmed by club per code comment) | [SC] |

### Proof we don't have yet: do not claim
- Opening date or year ("To be confirmed").
- Reviews, testimonials, ratings, guest or member quotes.
- Never claim: awards, rankings, "best in the Philippines", "world's best".
- Member numbers, rounds played, visitor numbers, occupancy.
- IMG partnership terms, endorsement or awards. Only "designed by / shaped by IMG".
- The "Global Leader in Golf Course Design" line about IMG ([I18N] `home.imgTagline`) has no source. **owner call**.
- That the clubhouse is built, open or final. Areas, rooms and finishes "may change" ([CH]).
- Confirmed travel times, gate hours, parking policy, ZIP code (all TODO / "PAKITINGNAN" = please check, in [SC]).
- Final prices for any item. Package prices (none exist: "Rate on request").
- Course total yardage (see §9). Yardages for tees other than Black ("Other tee distances to be confirmed", `src/components/Scorecard.tsx`).
- Ownership or operation of CWC facilities or of Villa Del Rey.
- Championship-event hosting or tournament sanctioning. The site says "championship course" and "championship occasions" ([CH] VIP wing) but cites no event.
- Certifications, environmental credentials, sponsors.

### Gold-standard lines (verbatim)
- "Not a building beside the course, but a continuation of the landscape — a clubhouse that golfers move through rather than simply enter." — `src/lib/clubhouse.ts`
- "Yes. Visitors are welcome throughout the week." — `src/lib/site-content.ts` (FAQ)
- "The Group Golf Getaway is designed for friends who play together." — `src/app/packages/buddy-trip/page.tsx`
- "Once the plan is agreed, the club runs the day, so you can be a guest at your own event." — `src/components/EventsDetails.tsx`
- "They will put the schedule together around your tee times rather than against them." — `src/components/ExperiencesDetails.tsx`
- "Choose your date and tee time online and secure it with a downpayment — or tell the club what you have in mind and the team will arrange it for you." — `src/components/GolfDetails.tsx`
- "Your club, a step ahead." — `src/app/members/page.tsx`

### Never print
- **No competitor, supplier or NDA client names appear in the sources.**
- VM·STUDIO's direct email and phone (deliberately left out of [CH]: "kontak iyon ng ibang negosyo" = it is another business's contact). Only the studio's name and website appear.
- The superseded clubhouse figure "~800 m²" from the zoning study ([CH]).
- "6,697 yards" until confirmed (no source file contains it).

## 8. Open decisions

| # | Decision | Status |
|---|---|---|
| 1 | Approve the six DNA lines and the segment priority order | PROPOSED → owner call |
| 2 | Are JA / KO / VI / ZH speakers target markets, or just a courtesy? Translations are AI-drafted and need review ([I18N] `dictionaries.ts`) | owner call |
| 3 | Re-show Bikol (`BCL`, hidden from the switcher while under review) | owner call |
| 4 | Benchmark / competitor list for positioning | owner call (none in sources) |
| 5 | Approve all prices in [GB] and [MP] (both marked example, not approved) | owner call |
| 6 | Confirm the IMG relationship and permitted wording, including the "Global Leader" tagline | owner call |
| 7 | Whether "world-class" may be used (see §9) | owner call |
| 8 | Relationship between the club and Villa Del Rey and the CWC facilities | owner call |
| 9 | Confirm travel times, transfers, gate hours, parking, ZIP | owner call (TODO in [SC]) |
| 10 | Opening date | owner call |
| 11 | Confirm the "events team replies within 48 hours" promise ([PYV]) | owner call |

## 9. Source conflicts

| Topic | Source A says | Source B says | Status / owner to confirm |
|---|---|---|---|
| Course length | [SYS] §2, §6: "6,697 yards from the Black tees" | [HO] hole figures sum to 6,851 yd / 6,262 m. "6,697" appears in no source file | Claims authority is [HO]; [SYS] figure unsupported. **owner call**. Publish no total until confirmed |
| Hole descriptions vs par | [HO] pars: 6 = par 3, 7 = par 5, 10 = par 4, 12 = par 4, 16 = par 5 | Same file's descriptions: hole 6 "third-shot position", 7 "A short hole", 10 "three-shot hole", 12 "A refined par three", 16 "one-shot setting" | **owner call**. Descriptions look shifted against the scorecard. Forward metres also look shifted (e.g. hole 6 forward 455 m vs back 113 m) |
| Tee label | [HO] field `blueMetres` | UI labels it "Black tee" (`Scorecard.tsx`, mobile) | owner call |
| Price status | [SYS] §2/§4: prices "Live on site … followed" | [GB] and [MP] headers: "HALIMBAWANG PRESYO … hindi pa inaprubahan ng club" (example, not approved) | Plan authority wins: **Estimate, not approved**. owner call |
| Rates listed vs quoted | [SC] FAQ: "Rates are quoted, not listed"; [VIS] green fee, caddie, club rental "On request" | [GB] lists ₱4,500 / ₱2,500 and add-on prices in the booking flow | owner call (also in [SYS] §6) |
| Member priority | [MEM] "Request preferred times before they open to the public"; [SC] FAQ members have priority on weekend mornings | [GB] public `bookAheadDays: 30`; [MP] Birdie 3, Eagle 7, Albatross 14 days ahead, so members get a shorter window than the public | owner call |
| Member online booking | [MEM] "Online tee-time booking for members is on its way." | [GB] / [PYV] online booking is live for visitors | owner call (confirm state) |
| Superlatives | [SYS] §6 must not say "World's best", rankings | Live copy: "A world-class course, shaped by IMG" ([SEC]); "World-class experiences beyond the course" ([SC]); "Championship golf and world-class experiences." ([FOOT], mobile) | owner call. "World-class" has no proof in sources |
| IMG tagline | [SYS] §6: may say "Designed by IMG" only | [I18N] `home.imgTagline` "The Global Leader in Golf Course Design" | owner call |
| Clubhouse spaces count | [CH] `CLUBHOUSE_FACTS` "9 Main areas" | [CH] `CLUBHOUSE_SPACES` has 10 entries; [SYS] says "10 spaces" | owner call (could be different groupings) |
| Clubhouse size | [CH] zoning study: ~800 m² | [CH] architectural concept: 2,695 m² | Resolved in source: June 2026 concept supersedes. Use 2,695 m² |
| Number of packages | [SC] code comment: "anim ang package" (six packages) | [PKG] `PACKAGES` has 2 | followed = 2; comment is stale |
| Stay & Play audience | Brief for this file: "couples/families" | [PKG] "Couples and solo golfers" | Source wins: couples and solo golfers |
| Villa Del Rey distance | [PYV] "a short walk from the first tee" | [SC] FAQ "within easy reach of the course"; [SC] "within easy reach of CamSur attractions" | owner call |
| Events list | [EV] Private Celebrations: birthdays, anniversaries, reunions, milestones | [PYV] adds "weddings" | owner call |
| Design principles | [GOLF] `PRINCIPLES` (playable for higher handicaps) | `DesignPrinciples` section renders empty | wish. Not live copy |
