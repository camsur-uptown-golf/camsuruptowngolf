# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task03-responsive-layouts.spec.ts >> Task 3 · Responsive Layouts >> TC-107 | Home @ Mobile S (320×568)
- Location: tests\task03-responsive-layouts.spec.ts:15:7

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  65447 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: Home-Mobile S.png

Call log:
  - Expect "toHaveScreenshot(Home-Mobile S.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 65447 pixels (ratio 0.05 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 65447 pixels (ratio 0.05 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Camsur Uptown Golf Club — home" [ref=e4] [cursor=pointer]:
        - /url: /
      - button "Open navigation" [ref=e5]: Menu
      - link "Call 09163007914" [ref=e10] [cursor=pointer]:
        - /url: tel:+639163007914
  - main [ref=e13]:
    - region "Course snapshot" [ref=e19]:
      - link "Discover the course" [ref=e21] [cursor=pointer]:
        - /url: "#course-snapshot"
      - generic [ref=e27]:
        - generic [ref=e28]:
          - paragraph [ref=e32]: "18"
          - paragraph [ref=e33]: Championship holes
        - generic [ref=e34]:
          - paragraph [ref=e39]: "72"
          - paragraph [ref=e40]: Course par
        - generic [ref=e41]:
          - paragraph [ref=e46]: "54.23"
          - paragraph [ref=e47]: Hectares
        - generic [ref=e48]:
          - paragraph [ref=e52]: Mt. Isarog
          - paragraph [ref=e53]: Signature backdrop
    - generic [ref=e55]:
      - paragraph [ref=e57]: A New Golf Destination in Bicol
      - heading "Championship golf in the heart of Bicol." [level=1] [ref=e58]
      - paragraph [ref=e59]: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
      - link "Plan your round" [ref=e60] [cursor=pointer]:
        - /url: /plan-your-visit
    - generic [ref=e63]:
      - generic [ref=e64]:
        - link "View A Great Start for CamSur Uptown Golf Club, and for You" [ref=e66] [cursor=pointer]:
          - /url: /golf/courses/hole-no.1
          - img "A Great Start for CamSur Uptown Golf Club, and for You — CamSur Uptown Golf Club hole" [ref=e67]
          - paragraph [ref=e69]: 01 / 18
        - generic [ref=e70]:
          - button "Previous hole image" [ref=e71]
          - generic [ref=e75]:
            - paragraph [ref=e76]: Hole
            - heading "No. 1" [level=3] [ref=e77]
          - button "Next hole image" [ref=e78]
        - generic "Choose hole image" [ref=e81]:
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e82]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e83]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e84]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e85]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e86]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e87]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e88]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e89]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e90]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e91]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e92]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e93]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e94]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e95]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e96]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e97]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e98]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e99]
      - generic [ref=e101]:
        - generic [ref=e102]:
          - paragraph [ref=e103]: Packages
          - heading "CamSur Golf Packages" [level=2] [ref=e104]: CamSur GolfPackages
          - paragraph [ref=e105]: Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
          - link "Explore packages" [ref=e106] [cursor=pointer]:
            - /url: /packages
        - generic [ref=e109]:
          - img "Four friends enjoying a golf getaway at CamSur Uptown Golf Club" [ref=e111]
          - img "Stay and Play golf package at CamSur Uptown" [ref=e113]
      - generic [ref=e115]:
        - generic [ref=e116]:
          - paragraph [ref=e117]: More at CamSur
          - heading "Beyond the Course" [level=2] [ref=e118]
          - paragraph [ref=e119]: Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
        - generic [ref=e120]:
          - link "Open-air dining at CamSur Dining" [ref=e121] [cursor=pointer]:
            - /url: /dining
            - img "Open-air dining at CamSur" [ref=e122]
            - generic [ref=e124]: Dining
          - link "Wakeboarding at the CamSur Watersports Complex Experiences" [ref=e129] [cursor=pointer]:
            - /url: /experiences
            - img "Wakeboarding at the CamSur Watersports Complex" [ref=e130]
            - generic [ref=e132]: Experiences
          - link "Villa Del Rey accommodation at CamSur Accommodations" [ref=e137] [cursor=pointer]:
            - /url: /accommodations
            - img "Villa Del Rey accommodation at CamSur" [ref=e138]
            - generic [ref=e140]: Accommodations
  - contentinfo [ref=e145]:
    - generic [ref=e147]:
      - generic [ref=e148]:
        - generic [ref=e150]:
          - img "Camsur Uptown Golf Club" [ref=e151]
          - generic [ref=e152]:
            - paragraph [ref=e153]: CamSur Uptown Golf Club
            - paragraph [ref=e154]: Camarines Sur, Philippines
            - paragraph [ref=e155]:
              - link "09163007914" [ref=e156] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e157]:
          - generic [ref=e158]:
            - paragraph [ref=e159]: Play
            - list [ref=e160]:
              - listitem [ref=e161]:
                - link "The Course" [ref=e162] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e163]:
                - link "Packages" [ref=e164] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e165]:
            - paragraph [ref=e166]: Stay & Play
            - list [ref=e167]:
              - listitem [ref=e168]:
                - link "Accommodations" [ref=e169] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e170]:
                - link "Dining" [ref=e171] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e172]:
            - paragraph [ref=e173]: The Club
            - list [ref=e174]:
              - listitem [ref=e175]:
                - link "Experiences" [ref=e176] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e177]:
                - link "Events" [ref=e178] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e179]:
                - link "Contact Us" [ref=e180] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e181]:
          - paragraph [ref=e182]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e183]
          - paragraph [ref=e184]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e185]:
            - generic [ref=e186]:
              - textbox "Email address" [ref=e187]
              - button "Subscribe" [ref=e188]
            - generic [ref=e189]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e190]
              - generic [ref=e191]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e192]:
        - generic [ref=e193]:
          - paragraph [ref=e194]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e195] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e196]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e202] [cursor=pointer]
  - alert [ref=e206]
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