# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task04-header-mega-nav.spec.ts >> Task 4 · Mobile navigation drawer >> Mobile — submenu expand/collapse
- Location: tests\task04-header-mega-nav.spec.ts:91:3

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
      - button "Close navigation" [expanded] [active] [ref=e5]: Menu
      - link "Call 09163007914" [ref=e9] [cursor=pointer]:
        - /url: tel:+639163007914
    - button "Close mobile navigation" [ref=e12]
    - dialog "Mobile navigation" [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - paragraph [ref=e16]: CamSur Uptown Golf Club
          - paragraph [ref=e17]: Explore CamSur Uptown
        - generic [ref=e18]: Menu
      - navigation "Mobile primary navigation" [ref=e19]:
        - button "Golf" [ref=e20]
        - button "Clubhouse" [ref=e24]
        - button "Packages" [ref=e28]
        - button "Accommodations" [ref=e32]
        - button "Experiences" [ref=e36]
        - button "Events" [ref=e40]
      - link "Plan your visit" [ref=e44] [cursor=pointer]:
        - /url: /plan-your-visit
  - main [ref=e45]:
    - region "Course snapshot" [ref=e51]:
      - link "Discover the course" [ref=e53] [cursor=pointer]:
        - /url: "#course-snapshot"
      - generic [ref=e59]:
        - generic [ref=e60]:
          - paragraph [ref=e64]: "18"
          - paragraph [ref=e65]: Championship holes
        - generic [ref=e66]:
          - paragraph [ref=e71]: "72"
          - paragraph [ref=e72]: Course par
        - generic [ref=e73]:
          - paragraph [ref=e78]: "54.23"
          - paragraph [ref=e79]: Hectares
        - generic [ref=e80]:
          - paragraph [ref=e84]: Mt. Isarog
          - paragraph [ref=e85]: Signature backdrop
    - generic [ref=e87]:
      - paragraph [ref=e89]: A New Golf Destination in Bicol
      - heading "Championship golf in the heart of Bicol." [level=1] [ref=e90]
      - paragraph [ref=e91]: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
      - link "Plan your round" [ref=e92] [cursor=pointer]:
        - /url: /plan-your-visit
    - generic [ref=e95]:
      - generic [ref=e96]:
        - link "View A Great Start for CamSur Uptown Golf Club, and for You" [ref=e98] [cursor=pointer]:
          - /url: /golf/courses/hole-no.1
          - img "A Great Start for CamSur Uptown Golf Club, and for You — CamSur Uptown Golf Club hole" [ref=e99]
          - paragraph [ref=e101]: 01 / 18
        - generic [ref=e102]:
          - button "Previous hole image" [ref=e103]
          - generic [ref=e107]:
            - paragraph [ref=e108]: Hole
            - heading "No. 1" [level=3] [ref=e109]
          - button "Next hole image" [ref=e110]
        - generic "Choose hole image" [ref=e113]:
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e114]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e115]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e116]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e117]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e118]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e119]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e120]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e121]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e122]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e123]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e124]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e125]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e126]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e127]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e128]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e129]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e130]
          - button "Show A Great Start for CamSur Uptown Golf Club, and for You" [ref=e131]
      - generic [ref=e133]:
        - generic [ref=e134]:
          - paragraph [ref=e135]: Packages
          - heading "CamSur Golf Packages" [level=2] [ref=e136]: CamSur GolfPackages
          - paragraph [ref=e137]: Whether you are planning a quick round, a one-night escape, or a golf trip with friends, our packages make it easy to play and stay at CamSur Uptown.
          - link "Explore packages" [ref=e138] [cursor=pointer]:
            - /url: /packages
        - generic [ref=e141]:
          - img "Four friends enjoying a golf getaway at CamSur Uptown Golf Club" [ref=e143]
          - img "Stay and Play golf package at CamSur Uptown" [ref=e145]
      - generic [ref=e147]:
        - generic [ref=e148]:
          - paragraph [ref=e149]: More at CamSur
          - heading "Beyond the Course" [level=2] [ref=e150]
          - paragraph [ref=e151]: Set the clubs down and discover more of CamSur—from relaxed clubhouse dining and outdoor adventures to comfortable stays close to the fairways.
        - generic [ref=e152]:
          - link "Open-air dining at CamSur Dining" [ref=e153] [cursor=pointer]:
            - /url: /dining
            - img "Open-air dining at CamSur" [ref=e154]
            - generic [ref=e156]: Dining
          - link "Wakeboarding at the CamSur Watersports Complex Experiences" [ref=e161] [cursor=pointer]:
            - /url: /experiences
            - img "Wakeboarding at the CamSur Watersports Complex" [ref=e162]
            - generic [ref=e164]: Experiences
          - link "Villa Del Rey accommodation at CamSur Accommodations" [ref=e169] [cursor=pointer]:
            - /url: /accommodations
            - img "Villa Del Rey accommodation at CamSur" [ref=e170]
            - generic [ref=e172]: Accommodations
  - contentinfo [ref=e177]:
    - generic [ref=e179]:
      - generic [ref=e180]:
        - generic [ref=e182]:
          - img "Camsur Uptown Golf Club" [ref=e183]
          - generic [ref=e184]:
            - paragraph [ref=e185]: CamSur Uptown Golf Club
            - paragraph [ref=e186]: Camarines Sur, Philippines
            - paragraph [ref=e187]:
              - link "09163007914" [ref=e188] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e189]:
          - generic [ref=e190]:
            - paragraph [ref=e191]: Play
            - list [ref=e192]:
              - listitem [ref=e193]:
                - link "The Course" [ref=e194] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e195]:
                - link "Packages" [ref=e196] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e197]:
            - paragraph [ref=e198]: Stay & Play
            - list [ref=e199]:
              - listitem [ref=e200]:
                - link "Accommodations" [ref=e201] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e202]:
                - link "Dining" [ref=e203] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e204]:
            - paragraph [ref=e205]: The Club
            - list [ref=e206]:
              - listitem [ref=e207]:
                - link "Experiences" [ref=e208] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e209]:
                - link "Events" [ref=e210] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e211]:
                - link "Contact Us" [ref=e212] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e213]:
          - paragraph [ref=e214]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e215]
          - paragraph [ref=e216]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e217]:
            - generic [ref=e218]:
              - textbox "Email address" [ref=e219]
              - button "Subscribe" [ref=e220]
            - generic [ref=e221]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e222]
              - generic [ref=e223]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e224]:
        - generic [ref=e225]:
          - paragraph [ref=e226]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e227] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e228]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e234] [cursor=pointer]
  - alert [ref=e238]
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
> 98  |     await expect(page.locator('header')).toBeVisible();
      |                                          ^ Error: expect(locator).toBeVisible() failed
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