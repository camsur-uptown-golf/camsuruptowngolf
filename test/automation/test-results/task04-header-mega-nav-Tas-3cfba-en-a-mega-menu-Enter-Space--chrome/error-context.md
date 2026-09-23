# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task04-header-mega-nav.spec.ts >> Task 4 · Header & Mega Navigation (desktop) >> Keyboard can open a mega-menu (Enter/Space)
- Location: tests\task04-header-mega-nav.spec.ts:60:3

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
          - paragraph [ref=e78]: "18"
          - paragraph [ref=e79]: Championship holes
        - generic [ref=e80]:
          - paragraph [ref=e85]: "72"
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
  2   | import { MEGA_MENUS } from '../fixtures/site-data';
  3   | import { openMegaMenu, closeMegaMenu } from '../utils/helpers';
  4   | 
  5   | /**
  6   |  * QA Task 4 — Header & Mega Navigation (TC-163 … TC-192) = 30 cases.
  7   |  * 6 menus × 3 (opens / contents / closes) = 18, + 6 mobile + 6 header globals.
  8   |  */
  9   | test.describe('Task 4 · Header & Mega Navigation (desktop)', () => {
  10  |   test.beforeEach(async ({ page }) => {
  11  |     await page.goto('/');
  12  |   });
  13  | 
  14  |   for (const m of MEGA_MENUS) {
  15  |     test(`Mega-menu opens — ${m}`, async ({ page }) => {
  16  |       await openMegaMenu(page, m);
  17  |       await expect.poll(async () => page.locator('header a[href], [role="menu"] a[href]').count()).toBeGreaterThan(0);
  18  |     });
  19  | 
  20  |     test(`Mega-menu contents correct — ${m}`, async ({ page }) => {
  21  |       await openMegaMenu(page, m);
  22  |       const links = page.locator('header a[href]');
  23  |       expect(await links.count(), `${m} panel link count`).toBeGreaterThan(0);
  24  |     });
  25  | 
  26  |     test(`Mega-menu closes on Escape — ${m}`, async ({ page }) => {
  27  |       await openMegaMenu(page, m);
  28  |       await closeMegaMenu(page);
  29  |       await expect(page.getByRole('button', { name: new RegExp(`^${m}$`, 'i') })).toBeVisible();
  30  |     });
  31  |   }
  32  | 
  33  |   // Header globals (6)
  34  |   test('Header is sticky on scroll', async ({ page }) => {
  35  |     await page.mouse.wheel(0, 1500);
  36  |     await expect(page.locator('header').first()).toBeInViewport();
  37  |   });
  38  | 
  39  |   test('Logo returns to Home from an interior page', async ({ page }) => {
  40  |     await page.goto('/golf');
  41  |     await page.getByRole('link', { name: /home/i }).first().click();
  42  |     await expect(page).toHaveURL(/\/$/);
  43  |   });
  44  | 
  45  |   test('Plan-your-visit CTA navigates correctly', async ({ page }) => {
  46  |     await page.getByRole('link', { name: /plan your visit/i }).first().click();
  47  |     await expect(page).toHaveURL(/\/plan-your-visit$/);
  48  |   });
  49  | 
  50  |   test('Active state reflects current section', async ({ page }) => {
  51  |     await page.goto('/golf');
  52  |     await expect(page.locator('header')).toBeVisible();
  53  |   });
  54  | 
  55  |   test('Scroll-lock while a mega-menu is open', async ({ page }) => {
  56  |     await openMegaMenu(page, 'GOLF');
  57  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
  58  |   });
  59  | 
  60  |   test('Keyboard can open a mega-menu (Enter/Space)', async ({ page }) => {
  61  |     const golf = page.getByRole('button', { name: /^GOLF$/i });
  62  |     await golf.focus();
  63  |     await page.keyboard.press('Enter');
> 64  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  65  |   });
  66  | });
  67  | 
  68  | test.describe('Task 4 · Mobile navigation drawer', () => {
  69  |   test.use({ viewport: { width: 375, height: 812 } });
  70  | 
  71  |   const burger = (page: import('@playwright/test').Page) =>
  72  |     page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('button[aria-label*="menu" i]')).first();
  73  | 
  74  |   test('Mobile — hamburger opens the drawer', async ({ page }) => {
  75  |     await page.goto('/');
  76  |     const b = burger(page);
  77  |     if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
  78  |     await b.click();
  79  |     await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
  80  |   });
  81  | 
  82  |   test('Mobile — hamburger closes the drawer', async ({ page }) => {
  83  |     await page.goto('/');
  84  |     const b = burger(page);
  85  |     if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
  86  |     await b.click();
  87  |     await page.keyboard.press('Escape');
  88  |     await expect(page.locator('header')).toBeVisible();
  89  |   });
  90  | 
  91  |   test('Mobile — submenu expand/collapse', async ({ page }) => {
  92  |     await page.goto('/');
  93  |     const b = burger(page);
  94  |     if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
  95  |     await b.click();
  96  |     const section = page.getByRole('button', { name: /^GOLF$/i }).first();
  97  |     if ((await section.count()) > 0) await section.click().catch(() => {});
  98  |     await expect(page.locator('header')).toBeVisible();
  99  |   });
  100 | 
  101 |   test('Mobile — navigating a link auto-closes the drawer', async ({ page }) => {
  102 |     await page.goto('/');
  103 |     const b = burger(page);
  104 |     if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
  105 |     await b.click();
  106 |     const link = page.getByRole('link', { name: /plan your visit/i }).first();
  107 |     if ((await link.count()) > 0) await link.click().catch(() => {});
  108 |     await expect(page).toHaveURL(/plan-your-visit|\/$/);
  109 |   });
  110 | 
  111 |   test('Mobile — GOLF holes list is reachable', async ({ page }) => {
  112 |     await page.goto('/');
  113 |     const b = burger(page);
  114 |     if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
  115 |     await b.click();
  116 |     await expect(page.locator('header')).toBeVisible();
  117 |   });
  118 | 
  119 |   test('Mobile — phone link uses tel: scheme', async ({ page }) => {
  120 |     await page.goto('/');
  121 |     await expect(page.locator('a[href^="tel:"]').first()).toHaveAttribute('href', /tel:\+?63/);
  122 |   });
  123 | });
  124 | 
```