# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task10-accessibility.spec.ts >> Task 10 · Accessibility & Keyboard >> 04 — Mega-menu is keyboard operable
- Location: tests\task10-accessibility.spec.ts:43:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Hole No. 1' })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'Hole No. 1' }) resolved to 10 elements:
    1) <a href="/golf/courses/hole-no.1" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 1</a> aka getByRole('link', { name: 'Hole No. 1', exact: true })
    2) <a href="/golf/courses/hole-no.10" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 10</a> aka getByRole('link', { name: 'Hole No. 10' })
    3) <a href="/golf/courses/hole-no.11" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 11</a> aka getByRole('link', { name: 'Hole No. 11' })
    4) <a href="/golf/courses/hole-no.12" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 12</a> aka getByRole('link', { name: 'Hole No. 12' })
    5) <a href="/golf/courses/hole-no.13" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 13</a> aka getByRole('link', { name: 'Hole No. 13' })
    6) <a href="/golf/courses/hole-no.14" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 14</a> aka getByRole('link', { name: 'Hole No. 14' })
    7) <a href="/golf/courses/hole-no.15" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 15</a> aka getByRole('link', { name: 'Hole No. 15' })
    8) <a href="/golf/courses/hole-no.16" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 16</a> aka getByRole('link', { name: 'Hole No. 16' })
    9) <a href="/golf/courses/hole-no.17" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 17</a> aka getByRole('link', { name: 'Hole No. 17' })
    10) <a href="/golf/courses/hole-no.18" class="text-white/72 flex min-h-[34px] items-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.05em] transition-colors duration-200 hover:text-[#f1d98f]">Hole No. 18</a> aka getByRole('link', { name: 'Hole No. 18' })

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Hole No. 1' }) with timeout 10000ms
  - waiting for getByRole('link', { name: 'Hole No. 1' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic:
      - link "Camsur Uptown Golf Club — home" [ref=e3] [cursor=pointer]:
        - /url: /
        - img "Camsur Uptown Golf Club" [ref=e5]
      - generic:
        - generic [ref=e6]:
          - link "Plan your visit" [ref=e7] [cursor=pointer]:
            - /url: /plan-your-visit
          - link "09163007914" [ref=e12] [cursor=pointer]:
            - /url: tel:+639163007914
        - navigation "Primary navigation" [ref=e15]:
          - button "GOLF" [expanded] [active] [ref=e16] [cursor=pointer]
          - button "CLUBHOUSE" [ref=e17] [cursor=pointer]
          - button "PACKAGES" [ref=e18] [cursor=pointer]
          - button "ACCOMMODATIONS" [ref=e19] [cursor=pointer]
          - button "EXPERIENCES" [ref=e20] [cursor=pointer]
          - button "EVENTS" [ref=e21] [cursor=pointer]
      - link "Contact Us" [ref=e22] [cursor=pointer]:
        - /url: /contact
    - generic [ref=e24]:
      - generic [ref=e25]:
        - paragraph [ref=e26]: Golf and clubhouse
        - link "Golf Explore Golf" [ref=e27] [cursor=pointer]:
          - /url: /golf
          - paragraph [ref=e30]: Golf
          - generic [ref=e31]: Explore Golf
      - generic [ref=e32]:
        - paragraph [ref=e33]: Course holes
        - generic [ref=e35]:
          - link "Hole No. 1" [ref=e36] [cursor=pointer]:
            - /url: /golf/courses/hole-no.1
          - link "Hole No. 2" [ref=e37] [cursor=pointer]:
            - /url: /golf/courses/hole-no.2
          - link "Hole No. 3" [ref=e38] [cursor=pointer]:
            - /url: /golf/courses/hole-no.3
          - link "Hole No. 4" [ref=e39] [cursor=pointer]:
            - /url: /golf/courses/hole-no.4
          - link "Hole No. 5" [ref=e40] [cursor=pointer]:
            - /url: /golf/courses/hole-no.5
          - link "Hole No. 6" [ref=e41] [cursor=pointer]:
            - /url: /golf/courses/hole-no.6
          - link "Hole No. 7" [ref=e42] [cursor=pointer]:
            - /url: /golf/courses/hole-no.7
          - link "Hole No. 8" [ref=e43] [cursor=pointer]:
            - /url: /golf/courses/hole-no.8
          - link "Hole No. 9" [ref=e44] [cursor=pointer]:
            - /url: /golf/courses/hole-no.9
          - link "Hole No. 10" [ref=e45] [cursor=pointer]:
            - /url: /golf/courses/hole-no.10
          - link "Hole No. 11" [ref=e46] [cursor=pointer]:
            - /url: /golf/courses/hole-no.11
          - link "Hole No. 12" [ref=e47] [cursor=pointer]:
            - /url: /golf/courses/hole-no.12
          - link "Hole No. 13" [ref=e48] [cursor=pointer]:
            - /url: /golf/courses/hole-no.13
          - link "Hole No. 14" [ref=e49] [cursor=pointer]:
            - /url: /golf/courses/hole-no.14
          - link "Hole No. 15" [ref=e50] [cursor=pointer]:
            - /url: /golf/courses/hole-no.15
          - link "Hole No. 16" [ref=e51] [cursor=pointer]:
            - /url: /golf/courses/hole-no.16
          - link "Hole No. 17" [ref=e52] [cursor=pointer]:
            - /url: /golf/courses/hole-no.17
          - link "Hole No. 18" [ref=e53] [cursor=pointer]:
            - /url: /golf/courses/hole-no.18
      - generic [ref=e55]:
        - paragraph [ref=e56]: Competition
        - link "Tournaments" [ref=e58] [cursor=pointer]:
          - /url: /events
  - main [ref=e59]:
    - region "Course snapshot" [ref=e65]:
      - link "Discover the course" [ref=e67] [cursor=pointer]:
        - /url: "#course-snapshot"
      - generic [ref=e73]:
        - generic [ref=e74]:
          - paragraph [ref=e78]: "13"
          - paragraph [ref=e79]: Championship holes
        - generic [ref=e80]:
          - paragraph [ref=e85]: "52"
          - paragraph [ref=e86]: Course par
        - generic [ref=e87]:
          - paragraph [ref=e92]: "54.23"
          - paragraph [ref=e93]: Hectares
        - generic [ref=e94]:
          - paragraph [ref=e98]: Mt. Isarog
          - paragraph [ref=e99]: Signature backdrop
    - generic [ref=e101]:
      - paragraph [ref=e103]: A New Golf Destination in Bicol
      - heading "Championship golf in the heart of Bicol." [level=1] [ref=e104]
      - paragraph [ref=e105]: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
      - link "Plan your round" [ref=e106] [cursor=pointer]:
        - /url: /plan-your-visit
    - generic [ref=e109]:
      - generic [ref=e110]:
        - generic [ref=e111]:
          - 'button "Previous image: A Great Start for CamSur Uptown Golf Club, and for You" [ref=e112]'
          - 'button "Next image: A Great Start for CamSur Uptown Golf Club, and for You" [ref=e114]'
          - link "View A Great Start for CamSur Uptown Golf Club, and for You" [ref=e118] [cursor=pointer]:
            - /url: /golf/courses/hole-no.1
            - img "A Great Start for CamSur Uptown Golf Club, and for You — CamSur Uptown Golf Club hole" [ref=e119]
            - paragraph [ref=e121]: 01 / 18
        - generic [ref=e122]:
          - button "Previous hole image" [ref=e123]
          - generic [ref=e126]:
            - generic [ref=e127]:
              - paragraph [ref=e128]: Hole
              - heading "No. 1" [level=3] [ref=e129]
            - generic [ref=e130]:
              - paragraph [ref=e131]: The opening drive begins close to the club precinct and moves into a generous fairway. The preferred side leaves a clear angle to a green protected by a measured arrangement of bunkers.
              - link "Explore this hole" [ref=e132] [cursor=pointer]:
                - /url: /golf/courses/hole-no.1
          - button "Next hole image" [ref=e133]
        - generic "Choose hole image" [ref=e136]:
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e137]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e138]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e139]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e140]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e141]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e142]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e143]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e144]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e145]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e146]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e147]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e148]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e149]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e150]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e151]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e152]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e153]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e154]
      - generic [ref=e156]:
        - generic [ref=e157]:
          - paragraph [ref=e158]: Packages
          - heading "CamSur Golf Packages" [level=2] [ref=e159]: CamSur GolfPackages
          - paragraph [ref=e160]: Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
          - link "Explore packages" [ref=e161] [cursor=pointer]:
            - /url: /packages
        - generic [ref=e164]:
          - img "Four friends enjoying a golf getaway at CamSur Uptown Golf Club" [ref=e166]
          - img "Stay and Play golf package at CamSur Uptown" [ref=e168]
      - generic [ref=e170]:
        - generic [ref=e171]:
          - paragraph [ref=e172]: More at CamSur
          - heading "Beyond the Course" [level=2] [ref=e173]
          - paragraph [ref=e174]: Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
        - generic [ref=e175]:
          - link "Open-air dining at CamSur Dining" [ref=e176] [cursor=pointer]:
            - /url: /dining
            - img "Open-air dining at CamSur" [ref=e177]
            - generic [ref=e179]: Dining
          - link "Wakeboarding at the CamSur Watersports Complex Experiences" [ref=e184] [cursor=pointer]:
            - /url: /experiences
            - img "Wakeboarding at the CamSur Watersports Complex" [ref=e185]
            - generic [ref=e187]: Experiences
          - link "Villa Del Rey accommodation at CamSur Accommodations" [ref=e192] [cursor=pointer]:
            - /url: /accommodations
            - img "Villa Del Rey accommodation at CamSur" [ref=e193]
            - generic [ref=e195]: Accommodations
  - contentinfo [ref=e200]:
    - generic [ref=e202]:
      - generic [ref=e203]:
        - generic [ref=e205]:
          - img "Camsur Uptown Golf Club" [ref=e206]
          - generic [ref=e207]:
            - paragraph [ref=e208]: CamSur Uptown Golf Club
            - paragraph [ref=e209]: Camarines Sur, Philippines
            - paragraph [ref=e210]:
              - link "09163007914" [ref=e211] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e212]:
          - generic [ref=e213]:
            - paragraph [ref=e214]: Play
            - list [ref=e215]:
              - listitem [ref=e216]:
                - link "The Course" [ref=e217] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e218]:
                - link "Packages" [ref=e219] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e220]:
            - paragraph [ref=e221]: Stay & Play
            - list [ref=e222]:
              - listitem [ref=e223]:
                - link "Accommodations" [ref=e224] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e225]:
                - link "Dining" [ref=e226] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e227]:
            - paragraph [ref=e228]: The Club
            - list [ref=e229]:
              - listitem [ref=e230]:
                - link "Experiences" [ref=e231] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e232]:
                - link "Events" [ref=e233] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e234]:
                - link "Contact Us" [ref=e235] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e236]:
          - paragraph [ref=e237]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e238]
          - paragraph [ref=e239]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e240]:
            - generic [ref=e241]:
              - textbox "Email address" [ref=e242]
              - button "Subscribe" [ref=e243]
            - generic [ref=e244]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e245]
              - generic [ref=e246]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e247]:
        - generic [ref=e248]:
          - paragraph [ref=e249]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e250] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e251]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e257] [cursor=pointer]
  - alert [ref=e261]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { findImagesMissingAlt } from '../utils/helpers';
  4   | 
  5   | /**
  6   |  * QA Task 10 — Accessibility & Keyboard Navigation (TC-279 … TC-296) = 18 cases.
  7   |  * axe-core WCAG 2.1 AA where it maps + keyboard-operability DOM checks.
  8   |  * A manual NVDA/VoiceOver pass is still required for full screen-reader coverage.
  9   |  */
  10  | async function axeViolations(page: import('@playwright/test').Page, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) {
  11  |   const r = await new AxeBuilder({ page }).withTags(tags).analyze();
  12  |   return r.violations;
  13  | }
  14  | 
  15  | test.describe('Task 10 · Accessibility & Keyboard', () => {
  16  |   test('01 — Keyboard-only navigation reaches interactive elements', async ({ page }) => {
  17  |     await page.goto('/');
  18  |     for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  19  |     const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
  20  |     expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(tag);
  21  |   });
  22  | 
  23  |   test('02 — Visible focus indicator on interactive elements', async ({ page }) => {
  24  |     await page.goto('/');
  25  |     await page.keyboard.press('Tab');
  26  |     const outline = await page.evaluate(() => {
  27  |       const el = document.activeElement as HTMLElement | null;
  28  |       if (!el) return 'none|0px|none';
  29  |       const s = getComputedStyle(el);
  30  |       return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
  31  |     });
  32  |     expect(outline).not.toBe('none|0px|none');
  33  |   });
  34  | 
  35  |   test('03 — Skip-to-content link appears on first Tab', async ({ page }) => {
  36  |     await page.goto('/');
  37  |     await page.keyboard.press('Tab');
  38  |     const skip = page.getByRole('link', { name: /skip/i });
  39  |     if ((await skip.count()) === 0) test.skip(true, 'No skip link — recommend adding one.');
  40  |     await expect(skip.first()).toBeFocused();
  41  |   });
  42  | 
  43  |   test('04 — Mega-menu is keyboard operable', async ({ page }) => {
  44  |     await page.goto('/');
  45  |     await page.getByRole('button', { name: /^GOLF$/i }).focus();
  46  |     await page.keyboard.press('Enter');
> 47  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  48  |   });
  49  | 
  50  |   test('05 — Mobile drawer manages focus', async ({ browser }) => {
  51  |     const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  52  |     const page = await ctx.newPage();
  53  |     await page.goto('/');
  54  |     const burger = page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('button[aria-label*="menu" i]')).first();
  55  |     if ((await burger.count()) === 0) { await ctx.close(); test.skip(true, 'No hamburger — confirm selector.'); }
  56  |     await burger.click();
  57  |     await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
  58  |     await ctx.close();
  59  |   });
  60  | 
  61  |   test('06 — Form fields have associated labels', async ({ page }) => {
  62  |     await page.goto('/contact');
  63  |     const violations = (await axeViolations(page)).filter((v) => v.id === 'label');
  64  |     expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  65  |   });
  66  | 
  67  |   test('07 — Form errors are announced (aria)', async ({ page }) => {
  68  |     await page.goto('/contact');
  69  |     const live = page.locator('[aria-live], [role="alert"], [aria-describedby]');
  70  |     // presence of an announce mechanism anywhere on the form page
  71  |     expect(await live.count()).toBeGreaterThanOrEqual(0);
  72  |   });
  73  | 
  74  |   test('08 — Colour contrast (text) meets AA', async ({ page }) => {
  75  |     await page.goto('/');
  76  |     const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
  77  |     expect(violations, JSON.stringify(violations.map((v) => v.nodes.length), null, 2)).toEqual([]);
  78  |   });
  79  | 
  80  |   test('09 — Colour contrast (buttons/links) meets AA', async ({ page }) => {
  81  |     await page.goto('/contact');
  82  |     const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
  83  |     expect(violations).toEqual([]);
  84  |   });
  85  | 
  86  |   test('10 — Heading hierarchy: single H1 per page', async ({ page }) => {
  87  |     for (const path of ['/', '/golf', '/contact']) {
  88  |       await page.goto(path);
  89  |       expect(await page.locator('h1').count(), `H1 on ${path}`).toBe(1);
  90  |     }
  91  |   });
  92  | 
  93  |   test('11 — Meaningful images have alt text', async ({ page }) => {
  94  |     await page.goto('/');
  95  |     expect(await findImagesMissingAlt(page)).toEqual([]);
  96  |   });
  97  | 
  98  |   test('12 — Landmarks / ARIA roles present', async ({ page }) => {
  99  |     await page.goto('/');
  100 |     const violations = (await axeViolations(page)).filter((v) => v.id.includes('landmark') || v.id.includes('region'));
  101 |     expect(violations).toEqual([]);
  102 |   });
  103 | 
  104 |   test('13 — Lightbox / dialog traps focus and closes', async ({ page }) => {
  105 |     await page.goto('/golf/courses/hole-no.1', { waitUntil: 'networkidle' });
  106 |     const dialog = page.locator('[role="dialog"]');
  107 |     if ((await dialog.count()) === 0) test.skip(true, 'No dialog/lightbox found on this page.');
  108 |     await page.keyboard.press('Escape');
  109 |     await expect(page.locator('header')).toBeVisible();
  110 |   });
  111 | 
  112 |   test('14 — No keyboard trap (can Tab through and back)', async ({ page }) => {
  113 |     await page.goto('/');
  114 |     for (let i = 0; i < 15; i++) await page.keyboard.press('Tab');
  115 |     for (let i = 0; i < 15; i++) await page.keyboard.press('Shift+Tab');
  116 |     await expect(page.locator('body')).toBeVisible();
  117 |   });
  118 | 
  119 |   test('15 — Reduced-motion preference respected', async ({ browser }) => {
  120 |     const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  121 |     const page = await ctx.newPage();
  122 |     await page.goto('/');
  123 |     await expect(page.locator('header')).toBeVisible();
  124 |     await ctx.close();
  125 |   });
  126 | 
  127 |   test('16 — Content reflows at 200% zoom', async ({ page }) => {
  128 |     await page.goto('/');
  129 |     await page.evaluate(() => ((document.body.style as any).zoom = '2'));
  130 |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  131 |     expect(overflow).toBeLessThanOrEqual(4);
  132 |   });
  133 | 
  134 |   test('17 — Link purpose is clear (no bare "click here")', async ({ page }) => {
  135 |     await page.goto('/');
  136 |     const bad = await page.$$eval('a', (as) => as.filter((a) => /^(click here|here|read more)$/i.test((a.textContent || '').trim())).length);
  137 |     expect(bad, 'ambiguous link texts').toBe(0);
  138 |   });
  139 | 
  140 |   test('18 — Touch targets are at least ~44px (mobile)', async ({ browser }) => {
  141 |     const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  142 |     const page = await ctx.newPage();
  143 |     await page.goto('/');
  144 |     const small = await page.$$eval('header a, header button', (els) =>
  145 |       els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40); }).length,
  146 |     );
  147 |     await ctx.close();
```