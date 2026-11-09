# CamSur Uptown Golf Brand Brain — 01 Brand kit

Knowledge file for the CamSur Uptown Golf Brand Brain Claude Project. Visual identity only.
Compiled 2026-10-21 from the sources below. Identity authority: the website code (no brand book, deck or style guide exists in the project). Read `04-the-camsur-uptown-golf-system.md` first; it wins on what the product is. No `brain.json` / owner corrections exist yet.

Status key: **followed** = live site does it · **wish** = stated in code/comments but not followed · **owner call** = undecided · **PROPOSED** = drafted by Claude, owner to approve.

Source keys: [CSS] `src/app/globals.css` · [LAYOUT] `src/app/layout.tsx` · [HEADER] `src/components/Header.tsx` · [FOOTER] `src/components/Footer.tsx` · [HOME] `src/app/page.tsx` · [EDK] `src/components/EditorialKit.tsx` · [SK] `src/components/SectionKit.tsx` · [FD] `src/components/FairwayDivider.tsx` · [GB] `src/components/GeneratedBadge.tsx` · [CH] `src/lib/clubhouse.ts` · [SITE] `src/lib/site-content.ts` · [I18N] `src/i18n/dictionaries.ts` · [BRAND] `public/branding/` · [APP] `mobile/src/constants/theme.ts`, `mobile/src/app/_layout.tsx`, `mobile/app.json` · [HEX] `grep -rhoE "#[0-9a-fA-F]{6}\b" src/components src/app | sort | uniq -c` (run 2026-10-21)

## 1. Logo

**The mark:** a pointed shield (leaf/drop outline) in gold with a deep-green field. Inside, in gold line: a mountain (Mt. Isarog, the landmark in [SITE]), a pin flag, and flowing fairway/water lines. Wordmark is serif capitals in gold. Source: visual inspection of the files below.

| Asset | Path | What it shows | Where used | Status |
|---|---|---|---|---|
| Header lockup (2027) | `public/branding/camsur-uptown-golf-header-2027.png` (+ `.svg`) | Shield + "CAMSUR / UPTOWN / GOLF" + "— Est. 2027 —", transparent | Desktop header, unscrolled, 156px wide, `drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]` | followed |
| Full lockup v3 | `public/branding/camsur-uptown-golf-v3.png` (+ `.svg`) | Same lockup, "GOLF" set larger | Not referenced in `src/` | unused |
| Master logo (2027) | `public/branding/camsur-uptown-golf-master-2027.png` (618×1162, transparent); `…-master-light-2027.png` (412×775) | Shield + "CAMSUR / UPTOWN / GOLF" + "— Est. 2027 —" | Footer, page curtain, member app sign-in/profile | followed |
| Legacy club logo | `public/camsur-uptown-logo.png` (1536×2048, black background) | Shield + "CAMSUR / UPTOWN" + "— GOLF CLUB —" + "— Est. 2026 —" | Original source retained; superseded by the master logo | unused |
| Gold mark (shield only) | `public/camsur-uptown-mark-transparent.png` (911×1251) | Shield outline + mountain/flag/lines, gold only, no green field | Desktop header when scrolled (56px), mobile nav pill (`h-8`, 32px) | followed |
| App icon / splash | `mobile/assets/images/icon.png`, `splash-icon.png`, `brand-mark.png` | App icons on `#0a2418` background (`mobile/app.json`) | Expo app | followed |
| Web icons | `src/app/icon.png`, `src/app/apple-icon.png` | Favicon / touch icon | Website | followed |

- **Colourways in use:** full colour (gold + deep green) on dark imagery/hero; gold-only shield on dark; grey watermark (`grayscale`, opacity 0.04 in [EDK] `Watermark`, 0.1 in [HOME] Introduction). No one-colour dark-on-light version exists.
- **Minimum size (sourced reasoning, [HEADER] comment):** the full portrait lockup needs about 96px height before the wordmark reads; below that use the shield-only mark. Shield is used down to 32px.
- **Placement:** top-left on desktop; shield centred in the mobile pill; footer left column.
- **Clear space:** not specified in any source.
- **The `.svg` files are not vector.** Both contain one embedded PNG (`<image href="data:image/png…">`, 0 paths). There is no vector master in the project.
- **Misuse (PROPOSED, from how the site already treats the logo):** do not recolour the shield; do not place the full-colour lockup on cream/white (it is only ever shown on dark); do not stretch (all uses keep `object-contain` / `h-auto`); do not add effects beyond the existing soft drop shadow on imagery; do not shrink the lockup below ~96px tall.
- **Other brands' marks on the site** (not ours, never recolour or combine with ours): Villa del Rey crown wordmark, blue (`public/villa-del-rey/logo.png`, `logo-white.png`); Gota Village Resort (`public/gota-village-resort/gota-logo-white.png`); Visit CamSur / CWC (`src/components/VisitCamsurLogo.tsx`, inline SVG, `currentColor`); IMG wordmark in gold (`public/branding/mc-gold.png`, masked in `#f3dda0` as the "Course design" fact in the home hero and mobile home).
Source: [BRAND], [HEADER] L755–790 and L920–940, [FOOTER] L95–110, [EDK], [HOME], `mobile/src/content/home.ts`.

## 2. Colour palette

**Official palette (Brand Guidelines 2026, see `05-brand-guidelines-2026.md` §6):** Uptown Emerald #03321B (60 %) · Pili Ivory #F3EDE1 (25 %) · Pili Gold #E2C77A (10 %) · Fairway Moss #2E5126 · Antique Gold #C5A35C · Caramoan Sand #D6C6A8 · Onyx #151513 · Bicol Ember #A4502F (≤ 3 %). It wins over the tables below, which record what the site and app use today. Migrating the site and app to it is the next pass (owner decision, 2026-11-03).

### Stated brand tokens ([CSS] `:root`) — **wish**: defined but almost never used
| Token | Hex | Tailwind name | Class uses in `src/` |
|---|---|---|---|
| `--brand-green` | #265136 | `brand` | 0 (the hex itself is used 177×) |
| `--brand-green-deep` | #0a2418 | `brand-deep` | 0 (hex used 0× in components; app icon and splash bg use it) |
| `--brand-gold` | #c9a54e | `gold` | 0 (hex used 21×) |
| `--brand-gold-light` | #f0dca0 | `gold-light` | 0 (hex used 1×, `NewsletterSignup.tsx`) |
| `--brand-cream` | #faf7ef | `cream` | 0 (hex used 0×) |

### Colours the site actually uses ([HEX], arbitrary Tailwind values) — **followed**
| Name (role) | Hex | Count | Used as | Use on |
|---|---|---|---|---|
| Forest | #1f3f2e | 199 | Hairlines (`border-[#1f3f2e]/10`, `/12`, `/15`), dark section bg, button hover | Borders on cream/white; dark bands |
| Club green | #265136 | 177 | Text links, primary dark button bg, nav pill bg (`/95`), focus outline | Buttons, nav, links |
| Ink | #14271d | 166 | Headings and dark text; text on gold buttons | Cream/white/gold surfaces |
| Pale gold (button) | #e7d18d | 113 | Primary CTA fill, gold labels on dark | Pills on any surface |
| Antique gold (text) | #98782f | 113 | Eyebrow/kicker text on light, focus outline | Cream/white only |
| Paper | #f7f5ee | 80 | Main light section bg, FairwayDivider fill | Section backgrounds |
| Light gold (on dark) | #f3dda0 | 62 | Nav text, button text on green, icons, search clear | Green/dark surfaces |
| Body grey-green | #5d685f | 55 | Intro and body copy | Cream/white |
| Gold hover | #f3dfa0 | 41 | Hover fill of #e7d18d pills | Buttons |
| Gold variants | #f1d98f · #f0d98f · #f8e9b7 · #d8b65b · #d1af58 | 29 · 12 · 22 · 20 · 6 | Hover text, eyebrows on dark, accents | Mostly dark surfaces |
| Muted greys | #667269 · #8a938c · #3f4c45 · #9aa39d | 27 · 17 · 13 · 9 | Secondary text, captions | Light surfaces |
| Night | #071d13 | 14 | Hero bg, image overlay (`/65`, hover `/48`) | Heroes |
| Hero base | #061a11 · #020e09 · #020b07 | — | Home hero wrapper, hero dim, mobile menu scrim (`/55`) | Behind imagery |
| Error | #a8492f | 16 | `role="alert"` text, error border, `/[0.06]` tint | Forms |
| White | #ffffff | 16 + `bg-white` | Alternate section bg (`EDITORIAL_SECTION`), text on dark (`text-white/70`–`/90`) | — | (not in the repo)

### Shadows and overlays (followed)
- Image overlays: black/forest gradients, e.g. `rgba(2,16,10,0.68)` → transparent (home hero, [HOME]); `bg-[#071d13]/65` on image cards.
- Gold CTA glow: `shadow-[0_14px_34px_rgba(152,120,47,0.14)]`; card shadows `rgba(20,39,29,0.12–0.16)`.

### Contrast (computed 2026-10-21, WCAG ratio)
| Pair | Ratio | Note |
|---|---|---|
| #14271d on #f7f5ee | 14.4 | pass |
| #5d685f on #f7f5ee | 5.3 | pass |
| #98782f on #f7f5ee | 3.8 | fails AA for 10–11px labels |
| #d1af58 on #f7f5ee ([SK] eyebrow) | 1.9 | fails |
| #14271d on #e7d18d (gold pill) | 10.4 | pass |
| #f3dda0 on #265136 | 6.8 | pass |

### Usage ratios
Not specified. Observed (interpretation): light pages are paper/white with ink headings, grey-green body and gold eyebrows; green and night appear in heroes, nav and occasional dark bands; gold is for labels and CTAs, never large fills except pills.

### Material palette (clubhouse concept, not UI colours)
Bronze, Travertine, Walnut, Glass (`CLUBHOUSE_MATERIALS`) plus Lime plaster, Green wool, Sandstone (`CLUBHOUSE_PALETTE`). From VM·STUDIO concept; may change. Gold-standard copy, verbatim from [CH]: "Vertical fins and screens that catch the low tropical sun." No hex values are given for these.
Source: [CSS], [HEX], [SK], [EDK], [HOME], [CH].

## 3. Typography

**Brand Guidelines 2026 (05 §7):** Cormorant Garamond for display and headlines (sentence case), Montserrat for body, UI and tracked-caps eyebrows. Cormorant SC and Manrope, used below, are not in the guidelines: **owner call**.

| Role | Typeface | CSS variable / class | Weights loaded | Notes |
|---|---|---|---|---|
| Display titles (h1, h2, display h3) | Cormorant SC | `--font-cormorant-sc` → `--font-display`, `font-display` (49 uses) | 400, 500, 600, 700 | [CSS] forces `main h1, main h2` to it with `letter-spacing: -0.04em` |
| Mixed-case serif titles | Cormorant Garamond | `--font-cormorant-garamond`, inline `style` (12 uses) | 400, 500, 600 | [LAYOUT]: "Mixed-case serif used where titles should not appear in small caps." Home intro and clubhouse/villa home blocks |
| Body / prose | Manrope | `--font-manrope` → `--font-sans` | variable | [CSS]: all `main p` use Manrope, `letter-spacing: -0.01em` |
| Navigation, labels, buttons | Montserrat | `--font-montserrat` → `--font-navigation`, `font-navigation` (193 uses) | variable | Whole header is `font-navigation` |
| Mono | Geist Mono | `--font-geist-mono` → `--font-mono` | — | 1 use |

All faces load from Google Fonts via `next/font` with `latin` + `vietnamese` subsets. Licence status is not recorded in the sources. (not in the repo)
**CJK locales ([CSS]):** KO/JA/ZH override the font variables with system stacks (sans: Apple SD Gothic Neo / Hiragino Sans / PingFang SC; serif: Nanum Myeongjo / Hiragino Mincho ProN / Songti SC). Korean also gets `word-break: keep-all`. FIL/BCL/VI tighten nav tracking to 0.04em (0.02em below 1440px).

### Type scale (followed; real class strings)
| Element | Classes | Font |
|---|---|---|
| Eyebrow / kicker | `text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#98782f]` (dark bg: `#d8b65b`, `#f0d98f`, `#e7d18d`; tracking 0.16–0.24em) | Montserrat when `font-navigation`; Manrope in [EDK] `Kicker` and [SK] |
| Home hero title | `text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]` | Cormorant Garamond |
| Section hero title | `text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]`, white, word-by-word reveal | Cormorant SC |
| Section heading (default) | `text-2xl sm:text-3xl xl:text-4xl font-medium tracking-[-0.035em] text-[#14271d]` | Cormorant SC |
| Section heading (lg) | `text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02]` | Cormorant SC |
| Intro / body | `text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]` | Manrope |
| Primary button | `font-navigation text-[11px] font-bold uppercase tracking-[0.14em]` | Montserrat |
| Desktop nav | `text-[10px] xl:text-[12px] min-[1400px]:text-[13px] font-semibold uppercase tracking-[0.07em] xl:tracking-[0.09em] text-[#f3dda0]` | Montserrat |
| Stat figures | `text-2xl sm:text-xl font-semibold tabular-nums tracking-[-0.02em] text-[#f3dda0]` | Montserrat |
| Watermark word | `font-display text-[clamp(5rem,9vw,8.5rem)] text-[#1f3f2e]/[0.07]` | Cormorant SC |

Rule: titles are medium (500) weight with negative tracking; labels are bold, uppercase, wide-tracked and small. Source: [LAYOUT], [CSS], [EDK], [SK], [HOME], [HEADER], `src/app/[section]/page.tsx`.

## 4. UI components, layout and motion
- **Buttons (followed):** pills (`rounded-full`, 149 uses), height 44–48px (`h-11`/`h-12`), `px-6`–`px-8`, uppercase Montserrat bold.
  - Gold primary: `bg-[#e7d18d] text-[#14271d] hover:bg-[#f3dfa0] hover:-translate-y-0.5`.
  - Green: `bg-[#265136] text-[#f3dda0] hover:bg-[#1f3f2e]`.
  - Outline: `border border-[#265136]/30 text-[#265136]`; on dark `border-white/35 text-white`, hover fills `#f1d98f`.
  - "Plan Your Visit" header pill: `#e7d18d` fill, `#b8963f` border, `#265136` text.
  - [CSS] removes text-shadow from all `rounded-full` links/buttons.
- **Focus:** `focus-visible:outline-2 outline-offset-4` in `#98782f`, `#265136`, `#f3dda0` or `#e7d18d`.
- **Sections:** `EDITORIAL_SECTION` = white, `EDITORIAL_SECTION_ALT` = `#f7f5ee`, `py-14 sm:py-16`, no hairline; [SK] `SECTION` = paper + `border-t border-[#1f3f2e]/10`.
- **Container:** `max-w-4xl xl:max-w-5xl px-6 sm:px-10 lg:px-12`; wide layouts `max-w-7xl`, `max-w-[1280px]`.
- **Dark sections:** heroes `bg-[#071d13]` with photo + gradient; bands `bg-[#1f3f2e] text-white`.
- **Cards:** image cards `rounded-2xl`/`rounded-[1.5rem]`/`rounded-[2rem]`; dark cards `rounded-[28px] bg-[#1f3f2e]`; mega-menu cards `border-white/12 bg-white/[0.05]`.
- **Badges:** small gold pills `bg-[#e7d18d] text-[8px] uppercase` on images.
- **Header:** transparent over the hero. Desktop nav is a centred pill (`bg-[#265136]` when the panel opens), the full lockup collapses to the shield on scroll, and the mega menu has a dark panel with an image preview and staggered items. Mobile: floating pill `bg-[#265136]/95 backdrop-blur-xl`, menu sheet `rounded-[1.75rem] bg-[#265136]/98`.
- **Fairway divider ([FD]):** three rolling ridges (white at 18% and 44%, then a solid fill matching the next section, usually `#f7f5ee`) plus a white pin flag on the right crest. Used where a hero meets the content on section, hole, stay and package pages.
- **Watermark ([EDK]):** grayscale club logo at 4% opacity with parallax behind a section.
- **Breakpoints:** Tailwind defaults; `sm` 564, `lg` 343, `xl` 261 uses, `md` rarely used. Nav-specific band 1024–1439px.
- **Motion:** house easing is `cubic-bezier(0.22, 1, 0.36, 1)`. Examples: hero image scale 1.035→1 over 1800ms; title word-by-word rise + blur 900ms (200ms base, +120ms per word); scroll reveals 700–900ms; mega items stagger +45ms; home hero dims to 50% on scroll; parallax. All have `prefers-reduced-motion` fallbacks (followed).
Source: [CSS], [EDK], [SK], [FD], [HEADER], [HOME].

## 5. Photography and imagery
| Set | Path | What it is | Label status |
|---|---|---|---|
| Home hero film + poster | `public/hero-golf-2027.mp4`, poster in [SITE] `TEASER_POSTER` | Course film | — |
| Hole aerials | `public/golf/aerial-holes/hole-NN-aerial.png`, `official-hole-maps/` | Sunlit oblique aerials: lakes, palms, bunkers, cart paths | Course is under development ([04] §2), so treat as visualisations. Unlabelled — owner call | (not in the repo)
| Course concepts | `public/course-concepts/concept-NN-*.png` | Concept views | Named "concept" in files |
| Clubhouse concept | `public/clubhouse/concept/*.jpg`, `public/clubhouse/*.jpg`, `*.mp4` | Renders: curved bronze-and-glass volume, rooftop trees, lake reflections, golden-hour light | Concept note printed on `/clubhouse/architecture` only |
| Fairway Villas | `public/fairway-villas/*.png` | Interiors and terrace facing Mt. Isarog | Unlabelled — owner call |
| Villa Del Rey / Gota Village | `public/villa-del-rey/stays/`, `public/gota-village-resort/` | Stay photos | — |
| Experiences | `public/experiences/*.webp` | CWC activities (wakepark, ATV, pickleball) | CWC facilities, not the club's |

- **Look (observed):** warm low sun, green fairways, blue water, palms, the mountain on the horizon, no people or few people, wide and aerial framing, warm materials (bronze, timber, travertine).
- **Labelling concept/AI imagery:** a `GeneratedBadge` component exists ("Generated" gold pill, [GB]) but has **0 uses** → **wish**. The only labels in force are `CLUBHOUSE_CONCEPT_NOTE` ([CH]) and the general renderings clause in `src/app/terms-of-use/page.tsx`. Rule (PROPOSED): every render or AI image used outside the website carries "Concept" or "Artist's impression"; never present it as the built club.
- **Placeholder:** `ImgPlaceholder` ("Photo coming soon") in green or cream gradients.

### Image-generation briefs (PROPOSED; label all output as concept)
1. **Course at first light**, 16:9, `public/hero-images/course-dawn-concept.webp`. Low aerial over a broad tropical fairway that bends around a still lake toward a green, with Mt. Isarog's long volcanic profile soft in the haze behind. The first warm sun rakes across the grass, there is dew in the shadows, palms line the edges, and the water reflects a pale gold sky. Calm, wide, no golfers. No text, no logos, no watermarks. (not in the repo)
2. **Clubhouse terrace at dusk**, 4:5, `public/clubhouse/concept/terrace-dusk-concept.jpg`. Eye-level view from a travertine terrace under bronze vertical fins, with walnut furniture and frameless glass behind. The course falls away to a lake glowing with the last light, and the mountain is dark on the horizon. Restrained, warm, empty of people. No text, no logos, no watermarks. (not in the repo)
3. **Detail still life**, 1:1, `public/hero-images/pin-detail-concept.webp`. Close view of a pin flag on a dewy green, the flag a deep forest green with a soft gold edge, a shallow depth of field, and the lake and palms blurred behind in morning light. No text, no logos, no watermarks. (not in the repo)
Source: [SITE], [CH], [GB], `public/` folder listing.

## 7. Do / Don't
**Do**
- Use paper `#f7f5ee` or white for reading sections, ink `#14271d` for headings, `#5d685f` for body.
- Put gold labels in `#98782f` on light and `#f3dda0`/`#e7d18d` on dark.
- Set titles in Cormorant SC (or Cormorant Garamond for mixed case), medium weight, with tight negative tracking.
- Set labels and buttons in Montserrat, bold, uppercase, tracked 0.14–0.2em.
- Use pill buttons; use the shield alone at small sizes.
- Lead with landscape imagery: water, fairway, Mt. Isarog.

**Don't**
- Don't show the full lockup on light backgrounds or below ~96px tall.
- Don't use `#d1af58`/`#d8b65b`/`#c9a54e` as small text on paper (ratio under 2.2).
- Don't present renders as the finished club or course.
- Don't mix our crest with the Villa del Rey, Gota, CWC or IMG marks in a single lockup.
- Don't introduce new hexes; reuse the table above.

## 8. Quick tokens (copy-paste)
```css
/* Followed values (what the site uses) */
--paper: #f7f5ee;  --white: #ffffff;  --ink: #14271d;  --body: #5d685f;  --muted: #667269;
--club-green: #265136;  --forest: #1f3f2e;  --night: #071d13;
--gold-fill: #e7d18d;  --gold-fill-hover: #f3dfa0;  --gold-text: #98782f;  --gold-on-dark: #f3dda0;
--hairline: rgb(31 63 46 / 0.12);  --overlay: rgb(7 29 19 / 0.65);  --error: #a8492f;
/* Stated tokens (globals.css, unused in classes) */
--brand-green: #265136; --brand-green-deep: #0a2418; --brand-gold: #c9a54e;
--brand-gold-light: #f0dca0; --brand-cream: #faf7ef;
/* Fonts */
--font-display: "Cormorant SC"; --font-serif-mixed: "Cormorant Garamond";
--font-sans: "Manrope"; --font-navigation: "Montserrat"; --font-mono: "Geist Mono";
--ease: cubic-bezier(0.22, 1, 0.36, 1);
```

## 9. Mobile app tokens (PROPOSED — owner to approve)
Gap today: [APP] `Colors` uses the 5 stated tokens plus seven hexes found nowhere on the website (#efe7d2, #5b6b60, #e6dcc3, #12321f, #1b4029, #b4c2b8, #1f4a30). `_layout.tsx` loads the brand fonts (Cormorant SC, Cormorant Garamond, Manrope, Montserrat via `@expo-google-fonts`), but `Fonts` in `theme.ts` still maps to system faces (`system-ui`, `ui-serif`). The set below uses only website colours.

| Token | Light | Dark |
|---|---|---|
| background | #f7f5ee | #071d13 |
| surface | #ffffff | #1f3f2e |
| text | #14271d | #ffffff |
| mutedText | #5d685f | rgba(255,255,255,0.70) |
| tint (links, active tab) | #265136 | #f3dda0 |
| accent (CTA fill; text on it #14271d) | #e7d18d | #e7d18d |
| accentText (gold labels) | #98782f | #f3dda0 |
| border | rgba(31,63,46,0.12) | rgba(255,255,255,0.12) |
| overlay (on images) | rgba(7,29,19,0.65) | rgba(2,11,7,0.55) |
| error | #a8492f | #a8492f |

| RN role | Font family (loaded name) | Size / tracking (from web) |
|---|---|---|
| Display / hero | `CormorantSC_500Medium` | 36–44, letterSpacing ≈ -0.04em |
| Title (mixed case) | `CormorantGaramond_500Medium` | 24–32 |
| Eyebrow | `Montserrat_700Bold`, uppercase | 10–11, letterSpacing 2 |
| Body | `Manrope_400Regular` (emphasis `Manrope_600SemiBold`) | 14–16, lineHeight 1.75 |
| Button | `Montserrat_700Bold`, uppercase | 11, letterSpacing 1.5, pill radius 999 |
| Stat figures | `Montserrat_600SemiBold`, tabular | 20–24 |

## Never print
- Internal supplier/hosting names in the build: Wistia (hero poster host, [SITE]); file version names (`v3`, `header-v4`).
- Internal flags and notes: "PAKITINGNAN", "TODO", Tagalog code comments.
- IMG's logo (`mc-gold.png`) or the line "The Global Leader in Golf Course Design" ([I18N] `home.imgTagline`) in new material until the owner confirms the IMG relationship. Never print "official IMG partner" or "endorsed by IMG".

## Proof we don't have yet / do not claim
- A vector logo master, logo designer credit, clear-space rule, Pantone/CMYK values.
- A brand book or style guide; font licence records.
- Photography of the built course, clubhouse or villas; photographer credits.
- Villa del Rey brand colour values; social handles or channel templates (none in sources, so there is no §6).
- Final clubhouse finishes: the material palette is a VM·STUDIO concept.

## 10. Source conflicts register
| Topic | Source A says | Source B says | Resolution / owner to confirm |
|---|---|---|---|
| Brand colours | [CSS] tokens #265136, #0a2418, #c9a54e, #f0dca0, #faf7ef | [HEX]: site uses #1f3f2e, #14271d, #071d13, #e7d18d, #98782f, #f3dda0, #f7f5ee; token classes used 0× | Tokens = stated (wish), hexes = followed. **owner call**: re-point tokens to followed values |
| Cream | `--brand-cream` #faf7ef | Site paper #f7f5ee (80×); #faf7ef 0× | Followed #f7f5ee. owner call |
| Light gold | `--brand-gold-light` #f0dca0 | #f3dda0 (62×), #f3dfa0 (41×), #f0d98f, #f1d98f, #f8e9b7 | Near-duplicates. PROPOSED: keep #f3dda0 (text) and #f3dfa0 (hover) |
| Club name in logo | `camsur-uptown-logo.png`: "CAMSUR UPTOWN GOLF CLUB" | Header v4/v3 lockups and [LAYOUT] title: "CamSur Uptown Golf" | **owner call** |
| Name casing | "CamSur Uptown" 1,177× | "Camsur Uptown" 24× (e.g. [HEADER] alt/aria-label) | Followed: "CamSur". Fix the 24 |
| Eyebrow face | Montserrat (`font-navigation` eyebrows) | Manrope ([EDK] `Kicker`, [SK] eyebrow, no font class) | owner call. PROPOSED: Montserrat |
| Eyebrow colour on paper | #98782f ([EDK]) | #d1af58 ([SK], 1.9:1 contrast) | PROPOSED: #98782f everywhere; still 3.8:1, owner call on darker gold |
| Concept labelling | [GB] "Generated" badge built | 0 uses; renders shown unlabelled except clubhouse architecture page | wish. owner call |
| Logo files | `.svg` names imply vector | Each SVG wraps one PNG | Treat as raster; vector master needed |
| Mobile palette | [APP] 7 hexes not on website | Website palette | Website wins on look; see §9 (PROPOSED) |
| Mobile fonts | `_layout.tsx` loads brand fonts | `theme.ts` `Fonts` = system faces | Wire the §9 mapping (PROPOSED) |
| Dark mode | [CSS] `prefers-color-scheme` sets #0a0a0a / #ededed | Sections hard-code light/dark colours; no dark theme designed | Leftover scaffold values; owner call |
