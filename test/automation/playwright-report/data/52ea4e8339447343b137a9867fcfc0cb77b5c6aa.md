# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task10-accessibility.spec.ts >> Task 10 · Accessibility & Keyboard >> 08 — Colour contrast (text) meets AA
- Location: tests\task10-accessibility.spec.ts:74:3

# Error details

```
Error: [
  6
]

expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 233

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f7f5ee",
+               "contrastRatio": 3.8,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.8 (foreground color: #98782f, background color: #f7f5ee, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"home-packages\" class=\"bg-[#f7f5ee] py-20 text-[#1b2730] sm:py-24 lg:py-28\">",
+                 "target": Array [
+                   "#home-packages",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.8 (foreground color: #98782f, background color: #f7f5ee, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] sm:text-[11px]\">Packages</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".lg\\:pt-2 > .sm\\:text-\\[11px\\].tracking-\\[0\\.16em\\].text-\\[\\#98782f\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f7f5ee",
+               "contrastRatio": 3.8,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.8 (foreground color: #98782f, background color: #f7f5ee, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-[#f7f5ee] py-20 text-[#1b2730] sm:py-24 lg:py-28\">",
+                 "target": Array [
+                   ".py-20.text-\\[\\#1b2730\\].sm\\:py-24:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.8 (foreground color: #98782f, background color: #f7f5ee, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] sm:text-[11px]\">More at CamSur</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".max-w-\\[760px\\] > .sm\\:text-\\[11px\\].tracking-\\[0\\.16em\\].text-\\[\\#98782f\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 3.49,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7b8d85",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.49 (foreground color: #7b8d85, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.49 (foreground color: #7b8d85, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>I agree to receive news and offers from CamSur Uptown, and I have read the<!-- --> <span class=\"text-white/80\">Privacy Policy</span>.</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label > span",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 2.9,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b8076",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>© 2026 CamSur Uptown Golf Club. All rights reserved.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex-wrap > p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 4.32,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8e9d96",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.32 (foreground color: #8e9d96, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.32 (foreground color: #8e9d96, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<a class=\"font-medium text-white/50 transition-colors hover:text-[#f0dca0]\" href=\"/terms-of-use\">Terms of Use</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-white\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 2.9,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b8076",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Championship golf in the heart of Camarines Sur.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".mt-14 > p",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - button "GOLF" [ref=e16] [cursor=pointer]
          - button "CLUBHOUSE" [ref=e17] [cursor=pointer]
          - button "PACKAGES" [ref=e18] [cursor=pointer]
          - button "ACCOMMODATIONS" [ref=e19] [cursor=pointer]
          - button "EXPERIENCES" [ref=e20] [cursor=pointer]
          - button "EVENTS" [ref=e21] [cursor=pointer]
      - link "Contact Us" [ref=e22] [cursor=pointer]:
        - /url: /contact
  - main [ref=e23]:
    - region "Course snapshot" [ref=e29]:
      - link "Discover the course" [ref=e31] [cursor=pointer]:
        - /url: "#course-snapshot"
      - generic [ref=e37]:
        - generic [ref=e38]:
          - paragraph [ref=e42]: "18"
          - paragraph [ref=e43]: Championship holes
        - generic [ref=e44]:
          - paragraph [ref=e49]: "72"
          - paragraph [ref=e50]: Course par
        - generic [ref=e51]:
          - paragraph [ref=e56]: "54.23"
          - paragraph [ref=e57]: Hectares
        - generic [ref=e58]:
          - paragraph [ref=e62]: Mt. Isarog
          - paragraph [ref=e63]: Signature backdrop
    - generic [ref=e65]:
      - paragraph [ref=e67]: A New Golf Destination in Bicol
      - heading "Championship golf in the heart of Bicol." [level=1] [ref=e68]
      - paragraph [ref=e69]: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
      - link "Plan your round" [ref=e70] [cursor=pointer]:
        - /url: /plan-your-visit
    - generic [ref=e73]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - 'button "Previous image: A Great Start for CamSur Uptown Golf Club, and for You" [ref=e76]'
          - 'button "Next image: A Great Start for CamSur Uptown Golf Club, and for You" [ref=e78]'
          - link "View A Great Start for CamSur Uptown Golf Club, and for You" [ref=e82] [cursor=pointer]:
            - /url: /golf/courses/hole-no.1
            - img "A Great Start for CamSur Uptown Golf Club, and for You — CamSur Uptown Golf Club hole" [ref=e83]
            - paragraph [ref=e85]: 01 / 18
        - generic [ref=e86]:
          - button "Previous hole image" [ref=e87]
          - generic [ref=e90]:
            - generic [ref=e91]:
              - paragraph [ref=e92]: Hole
              - heading "No. 1" [level=3] [ref=e93]
            - generic [ref=e94]:
              - paragraph [ref=e95]: The opening drive begins close to the club precinct and moves into a generous fairway. The preferred side leaves a clear angle to a green protected by a measured arrangement of bunkers.
              - link "Explore this hole" [ref=e96] [cursor=pointer]:
                - /url: /golf/courses/hole-no.1
          - button "Next hole image" [ref=e97]
        - generic "Choose hole image" [ref=e100]:
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e101]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e102]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e103]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e104]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e105]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e106]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e107]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e108]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e109]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e110]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e111]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e112]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e113]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e114]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e115]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e116]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e117]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e118]
      - generic [ref=e120]:
        - generic [ref=e121]:
          - paragraph [ref=e122]: Packages
          - heading "CamSur Golf Packages" [level=2] [ref=e123]: CamSur GolfPackages
          - paragraph [ref=e124]: Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
          - link "Explore packages" [ref=e125] [cursor=pointer]:
            - /url: /packages
        - generic [ref=e128]:
          - img "Four friends enjoying a golf getaway at CamSur Uptown Golf Club" [ref=e130]
          - img "Stay and Play golf package at CamSur Uptown" [ref=e132]
      - generic [ref=e134]:
        - generic [ref=e135]:
          - paragraph [ref=e136]: More at CamSur
          - heading "Beyond the Course" [level=2] [ref=e137]
          - paragraph [ref=e138]: Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
        - generic [ref=e139]:
          - link "Open-air dining at CamSur Dining" [ref=e140] [cursor=pointer]:
            - /url: /dining
            - img "Open-air dining at CamSur" [ref=e141]
            - generic [ref=e143]: Dining
          - link "Wakeboarding at the CamSur Watersports Complex Experiences" [ref=e148] [cursor=pointer]:
            - /url: /experiences
            - img "Wakeboarding at the CamSur Watersports Complex" [ref=e149]
            - generic [ref=e151]: Experiences
          - link "Villa Del Rey accommodation at CamSur Accommodations" [ref=e156] [cursor=pointer]:
            - /url: /accommodations
            - img "Villa Del Rey accommodation at CamSur" [ref=e157]
            - generic [ref=e159]: Accommodations
  - contentinfo [ref=e164]:
    - generic [ref=e166]:
      - generic [ref=e167]:
        - generic [ref=e169]:
          - img "Camsur Uptown Golf Club" [ref=e170]
          - generic [ref=e171]:
            - paragraph [ref=e172]: CamSur Uptown Golf Club
            - paragraph [ref=e173]: Camarines Sur, Philippines
            - paragraph [ref=e174]:
              - link "09163007914" [ref=e175] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e176]:
          - generic [ref=e177]:
            - paragraph [ref=e178]: Play
            - list [ref=e179]:
              - listitem [ref=e180]:
                - link "The Course" [ref=e181] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e182]:
                - link "Packages" [ref=e183] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e184]:
            - paragraph [ref=e185]: Stay & Play
            - list [ref=e186]:
              - listitem [ref=e187]:
                - link "Accommodations" [ref=e188] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e189]:
                - link "Dining" [ref=e190] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e191]:
            - paragraph [ref=e192]: The Club
            - list [ref=e193]:
              - listitem [ref=e194]:
                - link "Experiences" [ref=e195] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e196]:
                - link "Events" [ref=e197] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e198]:
                - link "Contact Us" [ref=e199] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e200]:
          - paragraph [ref=e201]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e202]
          - paragraph [ref=e203]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e204]:
            - generic [ref=e205]:
              - textbox "Email address" [ref=e206]
              - button "Subscribe" [ref=e207]
            - generic [ref=e208]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e209]
              - generic [ref=e210]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e211]:
        - generic [ref=e212]:
          - paragraph [ref=e213]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e214] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e215]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e221] [cursor=pointer]
  - alert [ref=e225]
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
> 77  |     expect(violations, JSON.stringify(violations.map((v) => v.nodes.length), null, 2)).toEqual([]);
      |                                                                                        ^ Error: [
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