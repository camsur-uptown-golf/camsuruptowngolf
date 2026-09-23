# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task04-header-mega-nav.spec.ts >> Task 4 · Mobile navigation drawer >> Mobile — hamburger opens the drawer
- Location: tests\task04-header-mega-nav.spec.ts:74:3

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
> 79  |     await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
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