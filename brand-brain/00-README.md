# CamSur Uptown Golf Brand Brain: setup guide

Lives in `brand-brain/`. Built on 2026-10-21 from the website code and content in this repo (`src/app`, `src/components`, `src/lib`, `src/i18n`, `public/branding`). On 2026-11-03 the club's brand book, *Brand Guidelines & Campaign 2026*, was merged in as `05-brand-guidelines-2026.md`; it wins on look, voice, naming and messaging, while the truth rules in 02 §6 still apply. There is no business plan or research report, so the website stays the source for facts and prices, and anything inferred beyond it is marked **PROPOSED**. The Expo app in `mobile/` was restyled from `01-brand-kit.md` §9 on the same day.

## The 5 knowledge files

| File | What it gives Claude |
|---|---|
| `04-the-camsur-uptown-golf-system.md` | **Read first.** What the club is: course (IMG design credit), clubhouse (VM·STUDIO concept, not as-built), Villa Del Rey stays, CWC experiences, packages, events, membership, booking; prices (all Estimates); what may and may not be said |
| `01-brand-kit.md` | Logos and their paths, the colours the site actually uses (with roles and contrast), the four typefaces and the type scale, buttons/cards/sections, imagery, mobile tokens (PROPOSED) |
| `02-voice-rules.md` | Six voice traits, locked lines, headline and CTA patterns, formatting (₱, times, dashes, middot), truth rules, banned phrases |
| `03-brand-dna.md` | Who the club serves, the problem, the solution, the difference, proof we have and proof we don't |
| `05-brand-guidelines-2026.md` | The club's brand book: tagline, messaging, voice, IMG credit, logo, official palette, type, photography, campaign, member app, merchandise; conflicts with the sources. Full text in `sources/brand-guidelines-2026.md` |

## Set it up (5 minutes)

1. **Project:** Claude → Projects → New project → "CamSur Uptown Golf Brand Brain".
2. **Brand kit:** upload `01-brand-kit.md` and the logos `public/branding/camsur-uptown-golf-header-2027.png`, `public/branding/camsur-uptown-golf-master-2027.png`, `public/camsur-uptown-mark-transparent.png`.
3. **Voice:** upload `02-voice-rules.md` and `05-brand-guidelines-2026.md`.
4. **Brand DNA:** upload `04-the-camsur-uptown-golf-system.md` and `03-brand-dna.md`.
5. **Plan and prices:** no business plan exists. If you upload `src/lib/golf-booking.ts` or `src/lib/membership-plans.ts`, mark them **internal — example prices, not approved**.
6. **Project instructions:** paste the block below.

```
You are CamSur Uptown Golf's in-house creative team. CamSur Uptown Golf helps golfers in and visiting Camarines Sur get a championship round beneath Mt. Isarog, a course-side stay and a planned trip, all booked in one place.
The product: a new 18-hole, par-72 golf club in San Jose, Pili, Camarines Sur, with a clubhouse (concept by VM·STUDIO), course-side stays at Villa Del Rey, packages, events and a paid membership.
Before writing or designing anything, follow the project files: 04-the-camsur-uptown-golf-system (what the club is; read first), 05-brand-guidelines-2026 (the brand book; wins on look, voice and messaging), 01-brand-kit (look), 02-voice-rules (sound), 03-brand-dna (who and why).
Tagline: "Where the fairway meets the mountain." Rules: calm, evocative, courteous; the club as host; British spelling; no serial comma in new copy; sentence-case headlines; no exclamation marks or emoji. Main CTA: "Reserve your round". Never invent prices, dates, distances, reviews, rankings, awards or member numbers. All ₱ figures are Estimates (example prices, not approved). Credit IMG as "Course design by IMG" or "An IMG-designed championship course"; never "official IMG partner", "endorsed by IMG", or that IMG runs the club. The clubhouse is a concept, not built. No opening date. CWC facilities belong to CamSur, not the club. Never write: award-winning, grand opening, now open, world-class, world's best, top-ranked. The course is 6,851 yards from the Black tees (never 6,697). Imagery: real course aerials, clubhouse concept renders (label as concept), Villa Del Rey photos; no people unless needed. If a fact is not in the files, ask me instead of guessing.
```

## Current source documents (2026-10-21)

| Document | Path | Status |
|---|---|---|
| Brand Guidelines & Campaign 2026 | `~/Downloads/CamSur-Uptown-Golf-Brand-Guidelines.pptx.pdf` (180 MB, not in repo); text in `brand-brain/sources/brand-guidelines-2026.md` | current (identity, voice and messaging authority since 2026-11-03) |
| Colour tokens, locale overrides | `src/app/globals.css` | current; not yet on the official palette |
| Fonts, site description | `src/app/layout.tsx` | current |
| Logos | `public/branding/` | current |
| Sections, address, travel, FAQ | `src/lib/site-content.ts` | current (claims authority); travel times, gate hours, ZIP to confirm |
| Clubhouse concept | `src/lib/clubhouse.ts` | current; concept, not as-built |
| Holes | `src/lib/course-holes.ts` | current |
| Stays | `src/lib/villa-del-rey.ts` | current |
| Hours, fees, villa nights | `src/lib/golf-booking.ts` | current (plan authority); example prices |
| Membership | `src/lib/membership-plans.ts` | current; example prices |
| Live copy, UI | `src/components/`, `src/app/` | current |
| Translations | `src/i18n/` | current; non-English partly out of date |
| Expo app | `mobile/src/` | consumer of this brain |

**Superseded (do not use as a source):**
- The ~800 m² clubhouse massing figure from the April 2026 zoning deck (quoted only in a code comment): replaced by 2,695 m² from the June 2026 concept. The file itself is current.

**Not sources:** `README.md`, `AGENTS.md`, `CLAUDE.md`, `mobile/AGENTS.md`.

## Step 5: start creating (starter prompts)

1. "Write three Instagram captions for the Hole 5 peninsula aerial, following 02-voice-rules."
2. "Draft the Stay & Play package email to a couple who asked about a weekend; rates on request."
3. "Review this app screen copy against 02-voice-rules and 04 §6; list every rule it breaks."
4. "Write the App Store / Play Store description for the CamSur Uptown Golf app."
5. "Give me two image-generation briefs for the clubhouse rooftop at dusk, from 01-brand-kit §5."
6. "Write a corporate-events one-pager for a Naga City company outing."
7. "Rewrite the membership plan cards so every ₱ figure is clearly an example price."
8. "Check this new page against 01-brand-kit: colours, type scale, buttons."

## Open items to confirm

1. **Prices (2026-10-21):** `src/lib/golf-booking.ts` and `src/lib/membership-plans.ts` say they are example prices not approved by the club, but they are live on the site and in the app. Files: 04, 02, 03.
2. **Listed vs quoted rates (2026-10-21):** FAQ says "Rates are quoted, not listed"; green fees, villa nights and membership are listed. Files: 04, 02.
3. ~~**IMG relationship (2026-10-21)**~~ Resolved 2026-11-03: "Course design by IMG" per the guidelines; owner confirms written approval for the IMG logo. Files: 04, 02, 05.
4. ~~**"World-class" (2026-10-21)**~~ Resolved 2026-11-03: removed from the golf hero, Beyond Golf hero and footer (the VM·STUDIO brief quote keeps it). Files: 02, 05.
5. **Brand colour tokens (2026-10-21):** `globals.css` tokens are not what the site uses (#f7f5ee vs #faf7ef, five near-duplicate light golds). Re-point the tokens? Files: 01.
6. **Club name (2026-10-21):** `public/camsur-uptown-logo.png` reads "CAMSUR UPTOWN GOLF CLUB"; everything else says "CamSur Uptown Golf". Files: 01, 02.
7. **Eyebrow typeface and gold on paper (2026-10-21):** Montserrat vs Manrope; #98782f (3.8:1) vs #d1af58 (1.9:1, fails contrast). Files: 01.
8. **Dark mode (2026-10-21):** none designed on the web; the app's dark theme is PROPOSED from website colours. Files: 01 §9.
9. **Hole data (2026-10-21):** descriptions of holes 6, 7, 10, 12, 16 don't match their pars; forward-tee metres look shifted; field `blueMetres` is labelled "Black tee". Files: 03.
10. **Member booking window (2026-10-21):** public can book 30 days ahead; member plans allow 3/7/14 days, but members page promises priority. Files: 03, 02.
11. **Villa Del Rey and CWC relationship to the club (2026-10-21):** not stated. Files: 04, 03.
12. **Travel times, gate hours, parking, ZIP 4418, opening date (2026-10-21):** flagged TODO in code. Files: 04, 03.
13. **Target languages (2026-10-21):** JA/KO/VI/ZH inferred from the site's translations; Bikol hidden. Files: 03, 02.
14. **"We" vs "the club", apostrophes, "Pickle Ball", "Golf shop" vs "Pro Shop", weddings (2026-10-21).** Spelling and enquire/inquire resolved 2026-11-03 (British). Files: 02 §9.
15. **Brand Guidelines vs truth rules (2026-11-03):** "NOW OPEN", "Quiet Luxury", Founding/Full Golf/Corporate tiers, Hole 1 at 410 yds, Bicol International Airport, "a full clubhouse" in the boilerplate. Not used in copy until confirmed. Files: 05 §9.
16. **Serial comma (2026-11-03):** the guidelines never use it; most live copy does. Sitewide change? Files: 02 §4, 05 §3.
17. **Official palette and fonts (2026-11-03):** website done; the Expo app still uses the old colours and fonts. Files: 01, 05.
19. **Member app sample data (2026-11-03):** events, schedule, dining, bays, wellness, offers, member number, handicap and guest passes are samples until the club has systems for them; the card shows "Member" until the club picks Founding/Full Golf/Corporate or Birdie/Eagle/Albatross. Files: 05 §8.
20. **Local dev writes to production (2026-11-03):** `.env.local` sets `TURSO_DATABASE_URL`, so `npm run dev` reads and writes the production database. Run dev with `TURSO_DATABASE_URL= TURSO_AUTH_TOKEN=` (local `data/*.sqlite`) for testing.
18. **Campaign images with a cone-shaped mountain (2026-11-03):** several guideline photos show a symmetrical cone (Mayon-like), not Mt. Isarog's broad shoulders; not used in heroes. Files: 05 §8.

## Mind map

`CamSur-Uptown-Golf-Brand-Brain-mindmap.svg` in this folder. PDF: `CamSur-Uptown-Golf-Brand-Brain.pdf`.

## Changelog

- 2026-11-03 Merged the club's *Brand Guidelines & Campaign 2026* (new file 05, text in `sources/`); updated 00–04 where the guidelines decide; applied the tagline, IMG credit, "Reserve your round", messaging lines and British spelling to the website, translations and Expo app.
- 2026-10-21 Built from the website code and content (Build). Same day: corrected course length in 04 to 6,851 yds (sum of `HOLE_PROFILES`) and marked all prices as Estimates; applied 01 §9 tokens and brand fonts to the Expo app.
