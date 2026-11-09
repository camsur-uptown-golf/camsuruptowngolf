# CamSur Uptown Golf Brand Brain — 02 Voice rules

How the brand sounds. Read `04-the-camsur-uptown-golf-system.md` first; it wins on what the product is and what may be said. Since 2026-11-03 the club's *Brand Guidelines 2026* (`05-brand-guidelines-2026.md`, [BG]) win on voice, naming and messaging; the truth rules in §6 still apply.

Status key: **followed** = live copy already does it · **wish** = stated, not yet followed · **owner call** = undecided · **PROPOSED** = drafted by Claude, owner to approve.

**Source keys**
| Key | File |
|---|---|
| [SYS] | `brand-brain/04-the-camsur-uptown-golf-system.md` |
| [SC] | `src/lib/site-content.ts` (incl. `FAQ_GROUPS`, `SITE_SECTIONS`) |
| [CH] | `src/lib/clubhouse.ts` |
| [VDR] | `src/lib/villa-del-rey.ts` |
| [MP] | `src/lib/membership-plans.ts` |
| [GB] | `src/lib/golf-booking.ts` |
| [DICT] | `src/i18n/dictionaries.ts` · [CFG] `src/i18n/config.ts` |
| [I18N] | `src/i18n/strings/*.json`. The keys are the full English copy inventory: 1,673 strings |
| [COMP:X] | `src/components/X.tsx` · [PAGE:x] `src/app/x/page.tsx` | (not in the repo)
| [MOB] | `mobile/src/content/*.ts` (the app reuses web copy) |
| [BG] | `05-brand-guidelines-2026.md` · full text `sources/brand-guidelines-2026.md` |

`brand-brain/brain.json` does not exist yet, so there are no owner corrections to apply. Code comments in Tagalog are treated as evidence of owner intent, not as public copy.

## 1. How we sound

| Trait | Meaning | Sounds like (verbatim) | Not like | Status |
|---|---|---|---|---|
| Plain and practical | Says what happens next, in order, in everyday words | "Choose your date and tee time online and secure it with a downpayment — or tell the club what you have in mind and the team will arrange it for you." [COMP:GolfDetails] | "Embark on an unforgettable golf journey" | followed |
| Golfer-literate | Talks about lines, angles, carries and pace the way players do | "Length alone will not score here. On most holes the best line into the green is the one that asks for the most from the tee shot." [COMP:GolfDetails] | "A challenging course for all skill levels" | followed |
| Unhurried | Time, calm and no rushing are the main offer, not excitement | "Birthdays, anniversaries, reunions, and milestones, held in a setting built for unhurried time rather than a fixed running order." [COMP:EventsDetails] | "Non-stop fun for the whole family!" | followed |
| The club as host | The club and its team do the work; the guest only decides | "Once the plan is agreed, the club runs the day, so you can be a guest at your own event." [COMP:EventsDetails] | "Book now before slots run out" | followed |
| Landscape-led | Mt. Isarog, water and fairways set the scene before facilities | "Hole 15 opens toward the upper course with the broad ridgeline of Mt. Isarog defining the horizon." [SC `CONCEPTS`] | Lists of amenities with no sense of place | followed |
| Honest about what is unfinished | Says plainly when something is a concept or not yet decided | "Opening hours, dress code, and visitor access are still being finalized. Plan your visit and we’ll help you prepare." [COMP:ClubhouseDetails] | Writing about the clubhouse as if it is open | followed |

**We are not (PROPOSED, based on what the copy never does):** loud (no exclamation marks in 1,673 strings), salesy (no "limited time", "book now", "don't miss"), or superlative-led (no "luxury", "exclusive", "premier", "iconic", "stunning", "paradise" anywhere in `src/`).

## 2. Words & phrases we use

### Locked lines (verbatim, never paraphrase)
| Line | Where it runs | Status |
|---|---|---|
| Where the fairway meets the mountain. | Primary tagline [BG p.9]: homepage IMG line, footer (site and app) | followed (2026-11-03) |
| CamSur Uptown Golf | Name. Short form "CamSur Uptown" is also used ("Explore CamSur Uptown", "The CamSur Uptown Pro Shop") | followed |
| Est. 2027 | Homepage eyebrow [PAGE:page.tsx]; never translated [DICT] | followed. It is a brand mark, not an opening date |
| An IMG-designed championship course | Golf hero [PAGE:[section] l.240], [MOB golf.ts] | followed (2026-11-03, [BG p.43]); replaced "A world-class course, shaped by IMG" |
| Course design by IMG — Where the fairway meets the mountain. | Homepage intro [PAGE:page.tsx] + [DICT `home.designedBy`, `home.imgTagline`] | followed (2026-11-03, [BG p.43]); replaced "Designed by IMG — The Global Leader in Golf Course Design" |
| Not a building beside the course, but a continuation of the landscape — a clubhouse that golfers move through rather than simply enter. | [CH `CLUBHOUSE_BRIEF`]. Quoted word for word from the VM·STUDIO brief | followed. Comment: "salita sa salita" (word for word) |
| At the heart of the course | Clubhouse hero title [SC]. VM·STUDIO wording; comment says "huwag palitan" (do not change) | followed |
| A relaxed base for your CamSur visit. | Villa Del Rey tagline [SC `ACCOMMODATIONS`], [MOB stay] | followed |
| After the round, come home to Villa Del Rey. | Current EN homepage stay title [DICT `home.stay.title`] | followed (EN only; see §9) |
| Your club, a step ahead. | Members hero [PAGE:members l.209], [MOB members.ts] | followed |
| Your day at the club. / Practice at dawn, lounge at noon, rooftop at dusk. | Homepage clubhouse block [DICT], [BG p.9] | followed (2026-11-03) |
| A new championship golf destination beneath Mt. Isarog in Camarines Sur, Philippines — with course-side stays, clubhouse dining, and event spaces. | Site meta description [PAGE:layout.tsx] | followed |
| ~~Championship golf and world-class experiences.~~ | Retired 2026-11-03; the footer now carries the tagline | retired |
| Birdie: "For the occasional round and a reason to come back." · Eagle: "For regular players who make the club part of the week." · Albatross: "The full club, with the best of everything." | Plan taglines [MP] | Example copy: the [MP] header says plans are "hindi pa inaprubahan ng club" (not yet approved by the club) |

### Calls to action (sentence case on buttons)
| Job | CTA used | Where | Status |
|---|---|---|---|
| Book golf | Reserve your round | GolfDetails, plan-your-visit, QuickQuestion, `/golf/book`, app [BG p.8] | followed (2026-11-03; was "Reserve a tee time") |
| Start a booking search | Find tee times | QuickBook | followed |
| Pay | Pay ₱X downpayment / Reserve tee time | TeeTimeBooking | followed |
| Homepage to golf | Plan your round | [DICT `action.planRound`] | followed |
| Packages | Request a quote · View itinerary · Compare packages | PackagesDetails, PackageItineraryPage | followed |
| Stays | Ask about availability · Ask about {stay} · Find your stay · See the stays | AvailabilityRequest, HomeVillaDelRey, plan-your-visit | followed |
| Events and groups | Enquire about events · Send an enquiry · Send request | EventsDetails, plan-your-visit, GroupInquiry | followed |
| General contact | Plan your visit · Request a call back · Call the club · Contact the club | many | followed |
| Experiences | Plan your days | ExperiencesDetails | followed |
| Members | Sign up to join · Log in · Create account · Switch to {plan} · Cancel plan | MembershipPlans, MemberAuth | followed |
| Rates | Request current rates | VisitDetails / [MOB visit.ts] | followed (app) |

The same job has several labels: "Explore packages", "See packages", "View packages", "View package". **PROPOSED:** keep one label per job: "Reserve your round", "Request a quote", "Ask about availability", "Inquire about events", "Plan your visit".

### Vocabulary we reach for
- People: **the club**, **the team**, **the events team**, guests, visitors, members, your group, your party.
- Golf: round, tee time, first tee, home green, fairway, front nine, back nine, caddie (never "caddy"), carries, pace, range balls, Black tees.
- Money: **downpayment** (one word), "Rate on request", "Rates on request", "On request", "quote", "per player", "/ month".
- Feel: course-side, unhurried, relaxed, quiet, settle in, at your own pace, arranged around your dates / group / tee times.
- Place: beneath Mt. Isarog, Camarines Sur, CamSur, Pili, Naga Airport.
- Concept wording: concept, architectural concept, provisional, subject to final measurement, to be confirmed.

## 3. Words we never say

| Word / phrase | Why | Sourced or inferred |
|---|---|---|
| "official IMG partner", "endorsed by IMG", "in partnership with IMG", any IMG award | No signed agreement in sources; only "Designed by IMG" / "shaped by IMG" are allowed | Sourced [SYS §6] |
| "Now open", "opening on [date]", "grand opening" | Hole pages say "Opening year: To be confirmed" | Sourced [SYS §6], [PAGE:golf/courses/[hole]] |
| The clubhouse "is built", "is open", "is finished", "as-built" | `CLUBHOUSE_CONCEPT_NOTE`: "design concepts, not an as-built record" | Sourced [CH] |
| "award-winning", "#1", "best in the Philippines/Asia", "top-ranked", "world's best" | No awards or rankings in sources | Sourced [SYS §6] |
| Reviews, testimonials, star ratings, member counts, "loved by…" | None in sources | Sourced [SYS §6] |
| Never: "our wakepark", "the club's ATV trails", anything implying the club owns or runs CWC facilities | They are CamSur / CWC facilities with their own sites | Sourced [SYS §6] |
| Package prices ("from ₱…") | Packages are "Rate on request"; comment: "walang inimbentong halaga" (no invented amounts) | Sourced [COMP:PackagesDetails], [SYS §6] |
| "CamSur Uptown Golf Club" as the name | Logo was re-rendered "walang 'Club'" (without "Club"); every title uses "CamSur Uptown Golf" | Inferred from [SC `TEASER_VIDEO` comment]. **PROPOSED** |
| "luxury", "exclusive", "premier", "iconic", "stunning", "breathtaking", "paradise", "hidden gem", "unparalleled" | Zero uses in live copy; they clash with the plain voice | **PROPOSED** |
| Exclamation marks, emoji, hashtags | Zero uses in 1,673 strings | Inferred, followed. **PROPOSED** as a rule |
| "Fairway Villas", "Clubhouse Lodge", "Gota Village" as bookable products | Appear only in components that no page imports (`FairwayVillasVision`, `ClubhouseVision`, `GotaVillageStays`) | Inferred. **PROPOSED**: owner to confirm before use |

## 4. Sentence & formatting rules

| Rule | Evidence | Status |
|---|---|---|
| **Section headings (H2):** short declarative sentence, sentence case, ends with a full stop | "The full eighteen." [PAGE:golf/courses/[hole]] · "Book your first round." [COMP:GolfDetails] · "Two ways to put a trip together." [COMP:PackagesDetails] · "Four steps, no guesswork." [COMP:EventsDetails] · "Come and see it." · "Send us your dates." · "Closer than you think." [PAGE:getting-here] | followed |
| **Count-word headline:** "<Number word> ways to…" | "Three ways to gather well." (computed by `occasionCountWord`) · "Three ways to belong." [PAGE:members] · "Ten ways to experience the clubhouse." (`roomCountWord`) | followed |
| **Paired/balanced lines** for package and section titles | "A night by the course, a morning on it." · "Two rounds, two nights, one group." [PAGE:packages/*] · "Dress the part, play the part." [COMP:VisitDetails] · "Eighteen broad holes. One revised footprint." [COMP:GolfDetails] | followed |
| **"rather than"** contrast to show the club's way | "around your tee times rather than against them" [COMP:ExperiencesDetails] · "rather than simply enter" [CH] | followed |
| **Hero titles (H1 over image):** sentence case, no full stop, up to about 8 words | "A world-class course, shaped by IMG" · "Plan a golf trip that fits your schedule" · "A course-side setting for every occasion" · "Stay at Villa Del Rey" [SC `SITE_SECTIONS`] | followed |
| **Eyebrows/kickers:** 1–4 words, sentence case in source (CSS sets the uppercase) | "The landscape plan", "How it works", "Get in touch", "Still deciding", "Good to know", "Play together", "Make it personal" | followed |
| **Nav, footer links, page titles:** Title Case | "Plan Your Visit", "Beyond Golf", "Frequently Asked Questions", "How to Get Here", "Terms of Use" | followed |
| **Meta title format:** "<Page> \| CamSur Uptown Golf" | "Reserve a tee time \| CamSur Uptown Golf" [PAGE:golf/book] | followed |
| **Intros:** 1–2 sentences, about 20–35 words, ending in what the guest should do | "Tell the club your dates, how many are playing, and which package is closest to what you want. You will get back a quote built around those three things." [COMP:PackagesDetails] | followed |
| **Person:** third person "the club" / "the team" dominates; "we/our team" appears in itineraries and some CTAs | "The club team will confirm your time" vs "Our team takes care of your clubs" [PAGE:packages/stay-and-play] | **owner call** |
| **Contractions:** web prose mostly avoids them ("you would like", "do not"); a few exist ("we’ll", "You’re on the tee sheet."); the app uses more ("You’ll", "isn’t") | [I18N], [MOB] | **owner call** |
| **"the club"** lower case in marketing copy; "the Club" capitalised only in Terms of Use | [PAGE:terms-of-use] | followed |
| **Em dash** with spaces " — " for asides (49 strings) | "Rounds and nights together — Stay & Play, or a getaway for your golf group." | followed |
| **En dash** with spaces for ranges | "6:00 AM – 6:00 PM" [SYS]; `CALL_WINDOWS` "9:00 AM – 12:00 PM" (comment: exact string incl. en dash, do not retype) [SC] | followed |
| **Middot** " · " as separator in labels and specs (76 strings) | "18 holes · Par 72" · "Hole No. 1 · Opening Fairway" · "Architecture · Interiors · Landscape" | followed |
| **Curly apostrophes/quotes** ’ “ ” | 27 strings curly vs 13 straight ("Member's Login", "there's", "resort's", "website's", "What's next") | **wish**: curly everywhere |
| **Ellipsis** character "…" for loading states | "Please wait…", "Checking availability…", "Sending…" | followed |
| **Ampersand** only in names and short labels; "and" in sentences | "Stay & Play", "Booking & rates", "Practice & play" | followed |
| **Serial comma** in lists | Live copy mostly uses it ("Tournaments, corporate days, and private celebrations" [SC]). [BG] never does ("villas, cabins, cabanas and Dwell suites") | **owner call**: [BG] wins on new copy; sitewide change not yet made |
| **Numbers in prose:** words for small counts and durations; numbers lead headlines in words | "Three hundred lockers", "forty minutes", "twenty-five minutes", "Eighteen holes on the championship course." | followed |
| **Numbers in specs and prices:** digits | "18", "72", "54.23", "411 m · 450 yd", "24 hours’ notice", "2 rounds of 18 holes every month" | followed |
| **Currency:** ₱, thousands comma, no decimals, no space: "₱7,500"; "per player", "/ month", "per night"; "Philippine pesos" in full text. "PHP" appears only in the payment API, never in copy | `formatPeso` comment [MP]; [COMP:MembershipPlans] | followed. All figures are **Estimate / example** (see §6) |
| **Time:** 12-hour, space + upper-case AM/PM ("6:00 AM"); a shared suffix is dropped in ranges ("12:00 – 2:00 PM"); durations "about 4½ hours" | `formatTime` [GB]; [COMP:TeeTimeBooking] | followed |
| **Dates in booking:** short US form "Tue, Oct 21" | `toLocaleDateString("en-US")` [COMP:TeeTimeBooking] | followed |
| **Abbreviations:** "Mt. Isarog", "Hole No. 1", "Est. 2027", "CamSur" (capital S) | [DICT], [SC] | followed |
| **Spelling:** British, per [BG] (colour, centre, metres, travelled, enquire/enquiry, finalised, personalised, authorised, neighbouring) | Applied to the site, app and translations on 2026-11-03 | followed |

## 5. Channel notes

| Channel | What the evidence shows | Status |
|---|---|---|
| Website | Each section ends with a CTA block: kicker, short sentence title, 1–2 sentence intro, 1–2 buttons (e.g. "Book your first round." + "Reserve a tee time" / "Plan your visit") [COMP:GolfDetails] | followed |
| Mobile app | English only; reads web content via `@site/*` and copies component text into [MOB]. Same locked lines; more contractions | followed [SYS §7] |
| Forms and confirmations | "Thank you" → "Your question is on its way." → "The club will get back to you within 48 hours." Errors: "Something went wrong. Please try again." or "…Please call the club on +63 916 300 7914." | followed |
| Booking states | "You’re on the tee sheet." · "Almost there — complete your downpayment." · "This hold has expired." [PAGE:golf/book/[code]] | followed |
| Legal | Formal, "the Club", "enquiry", governed by Philippine law [PAGE:terms-of-use] | followed |
| Email / enquiry replies | No templates in sources | **owner call**. PROPOSED: same tone as the form confirmations |
| Social | No social copy exists; Footer shows "Facebook — coming soon" etc. (TODO: real URLs) | **owner call** |

**Multilingual**
- Base language EN. Switcher: FIL, KO, VI, ZH, JA. BCL (Bikol) exists in [CFG] but is hidden while the translation is reviewed. Do not publish BCL.
- Never translated [DICT]: "CamSur Uptown Golf", "IMG", "Villa Del Rey", "Est. 2027", "Mt. Isarog". The JSON files also keep "Lago Del Rey" and "VM·STUDIO" in English. Prices and tee times are wrapped in `translate="no"`.
- All translations are AI-drafted and need club review before publishing [DICT comment]. Status: **wish**.

## 6. Truth rules (non-negotiable)

1. **IMG:** say "Course design by IMG" or "An IMG-designed championship course" [BG p.43] ("Designed by IMG" / "shaped by IMG" remain acceptable). Credit the course design only; never partner, endorsement, award, or that IMG owns or runs the club. The homepage IMG logo mark (`public/branding/mc-gold.png`) is used with IMG's written approval (owner confirmed 2026-11-03); keep it at equal weight with 2x clear space, never merged with the shield.
2. **Clubhouse is a concept** by VM·STUDIO. Label it "Clubhouse concept", "Architectural concept" or "· Concept design", and keep `CLUBHOUSE_CONCEPT_NOTE` word for word wherever the design figures appear [CH].
3. **No opening date.** "Opening year: To be confirmed" [PAGE:golf/courses/[hole]]. "Est. 2027" is not an opening date.
4. **No awards, rankings, reviews, testimonials or member counts** [SYS §6].
5. **CWC facilities** (wakeboarding, pickleball, ATV, etc.) are "at CamSur" and link to visitcamsur.com / pickleball.camsur.com. Copy may say "runs its own booking and schedule" [COMP:ExperiencesDetails]; it may not say the club owns or runs them.
6. **Packages:** "Rate on request" only [COMP:PackagesDetails].
7. **Listed prices are example figures (Estimate).** Green fees ₱4,500 / ₱2,500, add-ons, villa nights and membership ₱3,500 / ₱7,500 / ₱18,000 all carry the code note "HALIMBAWANG PRESYO … hindi pa inaprubahan ng club" (example prices, not approved by the club) [GB], [MP]. Do not put them in ads, social or email until the owner confirms them.
8. **Course figures:** only Black-tee yardages are confirmed. Use "Provisional concept distance" and "Existing concept distance; subject to final measurement." for the rest [I18N], [COMP:Scorecard].
9. **Concept imagery** must say "concept" in alt text or caption ("Members’ lounge concept…", "Clubhouse arrival concept…"). The Terms say "Illustrations and enhanced images are provided to communicate the intended experience." [PAGE:terms-of-use]
10. **Items marked "TODO (para sa club): kumpirmahin"** (travel times, gate hours, parking, transfers, FAQ answers, dress code, green fees, package inclusions, facility hours) may stay on the site as drafted, but must not be restated as fact in new copy until confirmed [SC], [COMP:VisitDetails, PackagesDetails, ExperiencesDetails, GolfDetails].

### Proof we don't have yet / do not claim
| Claim | Where it appears now | Status |
|---|---|---|
| Opening date or year | nowhere ("To be confirmed") | do not claim |
| Any award, ranking, review, rating, member number | nowhere | do not claim |
| A signed IMG agreement; "Global Leader in Golf Course Design" | [DICT `home.imgTagline`] | owner call |
| Approved prices (green fees, add-ons, villa nights, membership) | [GB], [MP] | Estimate / example |
| Package rates | none ("Rate on request") | do not invent |
| Villa Del Rey official room details; who owns it | "will be added when confirmed" [SC] | unconfirmed |
| Distance from the stays to the first tee | "a short walk from the first tee" [PAGE:plan-your-visit]; "wake up minutes from the first tee" [PAGE:packages/stay-and-play] | unverified |
| "within 48 hours" reply time | 14 strings in [I18N] (incl. the cancellation line) | owner to confirm |
| "Free cancellation up to 48 hours before your tee time" and the rain policy | [COMP:TeeTimeBooking] | owner to confirm |
| Member benefits ("Member rates", "Priority tee times", "switch or cancel at any time") | [PAGE:members], [MP] | example, not approved |
| Travel times, transfers, free parking | [SC `TRAVEL_ROUTES`, `ARRIVAL_NOTES`] | TODO confirm |
| Itinerary details (e.g. "welcome dinner … featuring Bicol cuisine") | [PAGE:packages/buddy-trip] | TODO confirm |
| Final clubhouse rooms, areas, finishes | [CH] | concept only |

## 7. Gold-standard lines

1. "Length alone will not score here. On most holes the best line into the green is the one that asks for the most from the tee shot." — `src/components/GolfDetails.tsx`
2. "Bunkers and water are visible from the tee on almost every hole, so each choice is an informed one rather than a guess." — `src/components/GolfDetails.tsx`
3. "Once the plan is agreed, the club runs the day, so you can be a guest at your own event." — `src/components/EventsDetails.tsx`
4. "Come and see the spaces in person. Deciding where the day starts and where it ends is much easier standing in the room." — `src/components/EventsDetails.tsx`
5. "Tell the team which of these your group wants and on which days. They will put the schedule together around your tee times rather than against them." — `src/components/ExperiencesDetails.tsx`
6. "A night by the course, a morning on it." — `src/app/packages/stay-and-play/page.tsx`
7. "Wake slowly, spend the day on the course, and come back to a quiet room, a pool, and an evening that is yours." — `src/i18n/dictionaries.ts` (`home.stay.intro`)
8. "Arrive about forty minutes before your tee time to check in, warm up, and meet your caddie without rushing." — `src/components/VisitDetails.tsx` (live in the app via `mobile/src/content/visit.ts`)
9. "Opening hours, dress code, and visitor access are still being finalized. Plan your visit and we’ll help you prepare." — `src/components/ClubhouseDetails.tsx`

### Lines to retire or review
| Line | File | Problem | Status |
|---|---|---|---|
| "The Global Leader in Golf Course Design" | `src/i18n/dictionaries.ts` | Unsourced superlative about IMG | retired 2026-11-03 |
| "World-class experiences beyond the course" / "Championship golf and world-class experiences." | `src/lib/site-content.ts`, `src/components/Footer.tsx` | "world-class" is an unverified superlative [BG p.8] | retired 2026-11-03 ("More to enjoy beyond the course"; footer tagline) |
| "…the resort's quieter corners — there's something here for everyone." | `src/lib/site-content.ts`, `ExperiencesDetails.tsx` | Cliché, straight apostrophes | retired 2026-11-03 |
| "A Great Start for CamSur Uptown Golf, and for You" | `src/lib/site-content.ts` (`COURSE_HEADLINE`) | The same Title Case headline on all 18 hole pages | owner call |
| "Plan Your Golf Getaway" · "Your Home for Rest and Adventure" · "The Heart of the Course" | `PackagesCarousel.tsx`, `VillaDelReyStays.tsx`, `ClubhouseHeroOverlay.tsx` | Title Case headings break the sentence-case rule | wish |
| "Rates are quoted, not listed." | `src/lib/site-content.ts` FAQ | Contradicts the listed ₱ prices in booking | owner call |
| "Villas, cabins, and cabanas a short walk from the first tee at Villa Del Rey." | `src/app/plan-your-visit/page.tsx` | Unverified distance | owner call |
| "Member's Login" / "Member's area" | `dictionaries.ts`, `src/app/members/page.tsx` | Straight apostrophe; singular possessive vs "Members’ lounge" | owner call |
| "A refined retail destination for performance golf…" / "Trusted clubs, balls, gloves…" | `src/components/ShopExperience.tsx` (app shop) | Generic; describes a concept shop as if it exists | PROPOSED review |

## 8. Never print

| Item | Reason | Source |
|---|---|---|
| VM·STUDIO's email and phone number from the zoning deck | Deliberately left out: "kontak iyon ng ibang negosyo" (another business's contact). Their website may be shown | [CH] comment |
| Bikol (BCL) translations | Hidden from the switcher until reviewed | [CFG] |
| "Test mode: PayMongo is not connected yet…" | Shown on localhost only | [I18N] |
| ZIP "4418" in new copy | Flagged "PAKITINGNAN" (to check); confirm the barangay/ZIP before reuse | [SC `CLUB_ADDRESS`] |
| Tagalog code comments, "TODO para sa club" notes | Internal decisions, not public copy | all files |
| "Fairway Villas", "Clubhouse Lodge", "Gota Village" | Unconfirmed products in unused components | `FairwayVillasVision.tsx`, `ClubhouseVision.tsx`, `GotaVillageStays.tsx` |

No benchmark competitor, NDA client or machine brand is named in the sources. PayMongo is the payment processor; public copy names payment methods ("GCash, Maya, GrabPay, or card"), not the processor. Status: followed.

## 9. Source conflicts

| # | Topic | Source A says | Source B says | Status |
|---|---|---|---|---|
| 1 | Price status | [SYS §4]: prices are "followed", "site price — owner to confirm" | [GB], [MP] headers: "HALIMBAWANG PRESYO … hindi pa inaprubahan ng club" (example, not approved). The plan authority wins on money, so treat them as **Estimate** | owner call |
| 2 | Are rates listed? | FAQ: "Rates are quoted, not listed."; VisitDetails/app: "On request", "Request current rates" | Booking flow shows ₱4,500 / ₱2,500 per player, add-ons, villa nights | owner call |
| 3 | Villa Del Rey details | [SC]: "Official room details, amenities, and booking information will be added when confirmed." | [VDR] amenities "ibinigay ng club" (given by the club); [GB] nightly rates live | owner call |
| 4 | Member booking | [PAGE:members]: "Online tee-time booking for members is on its way." | Public online booking is live at `/golf/book` | owner call |
| 5 | Spelling | centre, metres, travelling, enquire, cancelled | center, meters, colors, finalized, personalized, inquire | resolved 2026-11-03: British [BG] |
| 6 | enquire vs inquire | FAQ "before you enquire"; Terms "enquiry" | Events "Inquire about events", "Send an inquiry" | resolved 2026-11-03: enquire/enquiry |
| 7 | Apostrophes | 27 strings curly ’ | 13 strings straight ' | wish (curly) |
| 8 | Possessive | "Member's Login", "Member's area" | "Members’ lounge", "Members’ newsletter" | owner call |
| 9 | Voice person | "the club" / "the team" (most copy) | "we" / "our team" (itineraries, "we’ll help you prepare") | owner call |
| 10 | Contractions | Web: mostly none | App [MOB]: "You’ll", "isn’t", "couldn’t" | owner call |
| 11 | Translation drift | EN [DICT]: `home.stay.title` "After the round, come home to Villa Del Rey."; `home.day.eyebrow` "The Clubhouse"; `home.stay.cta` "Find your stay" | KO/VI/ZH/JA/BCL still translate the old lines ("A relaxed base for your CamSur visit.", "From morning to evening", "Explore Villa Del Rey") | wish: re-sync |
| 12 | Language set | [SYS §7]: EN, FIL, JA, KO, VI, ZH | [CFG]: also BCL, hidden in the switcher | followed (hidden) |
| 13 | Proper nouns | [DICT]: brand names never translated | JA translates "Stay & Play" as "ステイ＆プレー"; KO dictionary writes CamSur as "캠수르" | owner call |
| 14 | Pickleball spelling | "Pickle Ball" / "pickle ball" (nav, experiences copy) | "CamSur Pickleball Club", pickleball.camsur.com | owner call |
| 15 | Shop name | "Golf shop" (clubhouse concept [CH]) | "The CamSur Uptown Pro Shop" / "pro shop" (ShopExperience, VisitDetails) | owner call |
| 16 | Experiences ownership | [SYS §6]: CWC facilities, not owned by the club | "World-class experiences beyond the course"; "the best light on the property"; "the resort's quieter corners" | owner call |
| 17 | IMG wording | [SYS §6]: "Designed by IMG", "shaped by IMG" | Homepage added "The Global Leader in Golf Course Design" and the IMG logo mark | resolved 2026-11-03: "Course design by IMG" [BG]; logo approved |
| 22 | Brand Guidelines 2026 vs truth rules | [BG]: "NOW OPEN", "Quiet Luxury", Founding tiers, Hole 1 410 yds | §6 rules | owner call: see 05 §9 |
| 18 | Stay proximity | FAQ: "within easy reach of the course" | "a short walk from the first tee"; "wake up minutes from the first tee" | owner call |
| 19 | Events offered | Events page: tournaments, corporate events, private celebrations | GroupInquiry / plan-your-visit add "weddings" | owner call |
| 20 | Heading case | Sentence case is the house standard (§4) | Title Case exceptions listed in §7 | wish |
| 21 | Package count | [SC] comment: "anim ang package" (six) | PackagesDetails shows two ("Two ways to put a trip together.") | followed (two); comment is stale |
