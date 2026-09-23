# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task03-responsive-layouts.spec.ts >> Task 3 · Responsive Layouts >> TC-110 | Home @ Desktop (1440×900)
- Location: tests\task03-responsive-layouts.spec.ts:15:7

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  376124 pixels (ratio 0.07 of all image pixels) are different.

  Snapshot: Home-Desktop.png

Call log:
  - Expect "toHaveScreenshot(Home-Desktop.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 376124 pixels (ratio 0.07 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 376124 pixels (ratio 0.07 of all image pixels) are different.

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
  1  | import { test, expect } from '@playwright/test';
  2  | import { TEMPLATES, VIEWPORTS } from '../fixtures/site-data';
  3  | import { expectNoHorizontalScroll } from '../utils/helpers';
  4  | 
  5  | /**
  6  |  * QA Task 3 — Desktop & Mobile Layouts (TC-107 … TC-162).
  7  |  * 14 templates × 4 viewports. Asserts no horizontal overflow and captures a visual
  8  |  * baseline snapshot (first run creates the baseline; later runs diff against it).
  9  |  */
  10 | test.describe('Task 3 · Responsive Layouts', () => {
  11 |   let idx = 107;
  12 |   for (const tmpl of TEMPLATES) {
  13 |     for (const vp of VIEWPORTS) {
  14 |       const tc = `TC-${String(idx++).padStart(3, '0')}`;
  15 |       test(`${tc} | ${tmpl.name} @ ${vp.name} (${vp.width}×${vp.height})`, async ({ page }) => {
  16 |         await page.setViewportSize({ width: vp.width, height: vp.height });
  17 |         await page.goto(tmpl.path, { waitUntil: 'networkidle' });
  18 | 
  19 |         await expectNoHorizontalScroll(page);
  20 | 
  21 |         // Header/nav must be reachable at every breakpoint (hamburger on mobile)
  22 |         const header = page.locator('header').first();
  23 |         await expect(header).toBeVisible();
  24 | 
  25 |         // Visual regression baseline (tolerant to minor rendering diffs)
> 26 |         await expect(page).toHaveScreenshot(`${tmpl.name}-${vp.name}.png`, {
     |                            ^ Error: expect(page).toHaveScreenshot(expected) failed
  27 |           fullPage: true,
  28 |           maxDiffPixelRatio: 0.03,
  29 |           animations: 'disabled',
  30 |         });
  31 |       });
  32 |     }
  33 |   }
  34 | });
  35 | 
```