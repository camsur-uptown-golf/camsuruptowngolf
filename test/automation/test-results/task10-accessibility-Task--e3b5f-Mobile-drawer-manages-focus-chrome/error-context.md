# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task10-accessibility.spec.ts >> Task 10 · Accessibility & Keyboard >> 05 — Mobile drawer manages focus
- Location: tests\task10-accessibility.spec.ts:50:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('nav, [role="dialog"]').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" locator('nav, [role="dialog"]').first() with timeout 10000ms
  - waiting for locator('nav, [role="dialog"]').first()
    23 × locator resolved to <nav data-nav="hero" aria-label="Primary navigation" class="visible max-h-16 w-[min(760px,calc(100vw-3rem))] rounded-full border border-[#d8b65b]/20 bg-[#214936]/88 p-1.5 opacity-100 shadow-[0_12px_35px_rgba(0,0,0,0.16)] grid grid-flow-col auto-cols-max items-center justify-evenly pointer-events-auto relative z-50 h-12 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/90 backdrop-blur-md xl:text-[11px] xl:tracking-[0.09em]">…</nav>
       - unexpected value "hidden"

```

```yaml
- banner:
  - link "Camsur Uptown Golf Club — home":
    - /url: /
  - button "Close navigation" [expanded]: Menu
  - link "Call 09163007914":
    - /url: tel:+639163007914
  - button "Close mobile navigation"
  - dialog "Mobile navigation":
    - paragraph: CamSur Uptown Golf Club
    - paragraph: Explore CamSur Uptown
    - text: Menu
    - navigation "Mobile primary navigation":
      - button "Golf"
      - button "Clubhouse"
      - button "Packages"
      - button "Accommodations"
      - button "Experiences"
      - button "Events"
    - link "Plan your visit":
      - /url: /plan-your-visit
- main:
  - region "Course snapshot":
    - link "Discover the course":
      - /url: "#course-snapshot"
    - paragraph: "18"
    - paragraph: Championship holes
    - paragraph: "72"
    - paragraph: Course par
    - paragraph: "54.23"
    - paragraph: Hectares
    - paragraph: Mt. Isarog
    - paragraph: Signature backdrop
  - paragraph: A New Golf Destination in Bicol
  - heading "Championship golf in the heart of Bicol." [level=1]
  - paragraph: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
  - link "Plan your round":
    - /url: /plan-your-visit
  - link "View A Great Start for CamSur Uptown Golf Club, and for You":
    - /url: /golf/courses/hole-no.1
    - img "A Great Start for CamSur Uptown Golf Club, and for You — CamSur Uptown Golf Club hole"
    - paragraph: 01 / 18
  - button "Previous hole image"
  - paragraph: Hole
  - heading "No. 1" [level=3]
  - button "Next hole image"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - button "Show A Great Start for CamSur Uptown Golf Club, and for You"
  - paragraph: Packages
  - heading "CamSur Golf Packages" [level=2]
  - paragraph: Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
  - link "Explore packages":
    - /url: /packages
  - img "Four friends enjoying a golf getaway at CamSur Uptown Golf Club"
  - img "Stay and Play golf package at CamSur Uptown"
  - paragraph: More at CamSur
  - heading "Beyond the Course" [level=2]
  - paragraph: Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
  - link "Open-air dining at CamSur Dining":
    - /url: /dining
    - img "Open-air dining at CamSur"
    - text: Dining
  - link "Wakeboarding at the CamSur Watersports Complex Experiences":
    - /url: /experiences
    - img "Wakeboarding at the CamSur Watersports Complex"
    - text: Experiences
  - link "Villa Del Rey accommodation at CamSur Accommodations":
    - /url: /accommodations
    - img "Villa Del Rey accommodation at CamSur"
    - text: Accommodations
- contentinfo:
  - img "Camsur Uptown Golf Club"
  - paragraph: CamSur Uptown Golf Club
  - paragraph: Camarines Sur, Philippines
  - paragraph:
    - link "09163007914":
      - /url: tel:+639163007914
  - navigation "Footer navigation":
    - paragraph: Play
    - list:
      - listitem:
        - link "The Course":
          - /url: /golf
      - listitem:
        - link "Packages":
          - /url: /packages
    - paragraph: Stay & Play
    - list:
      - listitem:
        - link "Accommodations":
          - /url: /accommodations
      - listitem:
        - link "Dining":
          - /url: /dining
    - paragraph: The Club
    - list:
      - listitem:
        - link "Experiences":
          - /url: /experiences
      - listitem:
        - link "Events":
          - /url: /events
      - listitem:
        - link "Contact Us":
          - /url: /contact
  - paragraph: News & offers
  - heading "Stay connected to the club." [level=2]
  - paragraph: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
  - textbox "Email address"
  - button "Subscribe"
  - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy."
  - text: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
  - paragraph: © 2026 CamSur Uptown Golf Club. All rights reserved.
  - link "Terms of Use":
    - /url: /terms-of-use
  - paragraph: Championship golf in the heart of Camarines Sur.
- alert
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
  47  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
  48  |   });
  49  | 
  50  |   test('05 — Mobile drawer manages focus', async ({ browser }) => {
  51  |     const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  52  |     const page = await ctx.newPage();
  53  |     await page.goto('/');
  54  |     const burger = page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('button[aria-label*="menu" i]')).first();
  55  |     if ((await burger.count()) === 0) { await ctx.close(); test.skip(true, 'No hamburger — confirm selector.'); }
  56  |     await burger.click();
> 57  |     await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
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
  148 |     expect(small, 'interactive targets smaller than ~44px').toBeLessThanOrEqual(2);
  149 |   });
  150 | });
  151 | 
```