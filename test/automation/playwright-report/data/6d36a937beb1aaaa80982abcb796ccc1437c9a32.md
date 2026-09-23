# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task04-header-mega-nav.spec.ts >> Task 4 · Mobile navigation drawer >> Mobile — hamburger closes the drawer
- Location: tests\task04-header-mega-nav.spec.ts:82:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('header')
Expected: visible
Error: strict mode violation: locator('header') resolved to 2 elements:
    1) <header class=" fixed inset-x-0 top-0 z-[100] isolate overflow-visible bg-transparent font-navigation">…</header> aka getByRole('banner')
    2) <header class="max-w-[760px]">…</header> aka getByText('More at CamSurBeyond the')

Call log:
  - Expect "toBeVisible" locator('header') with timeout 10000ms
  - waiting for locator('header')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Camsur Uptown Golf Club — home" [ref=e4] [cursor=pointer]:
        - /url: /
      - button "Open navigation" [active] [ref=e5]: Menu
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
  64  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
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
> 88  |     await expect(page.locator('header')).toBeVisible();
      |                                          ^ Error: expect(locator).toBeVisible() failed
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