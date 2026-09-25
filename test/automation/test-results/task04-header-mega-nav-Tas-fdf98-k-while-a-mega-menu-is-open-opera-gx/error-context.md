# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task04-header-mega-nav.spec.ts >> Task 4 · Header globals >> TC-191 | Scroll-lock while a mega-menu is open
- Location: tests\task04-header-mega-nav.spec.ts:133:3

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('body')
Expected: "hidden"
Received: "visible"
Timeout:  10000ms

Call log:
  - Expect "toHaveCSS" locator('body') with timeout 10000ms
  - waiting for locator('body')
    24 × locator resolved to <body class="min-h-full flex flex-col">…</body>
       - unexpected value "visible"

```

```yaml
- banner:
  - link "Camsur Uptown Golf Club — home":
    - /url: /
  - link "Plan your visit":
    - /url: /plan-your-visit
  - link "09163007914":
    - /url: tel:+639163007914
  - navigation "Primary navigation"
  - link "Contact Us":
    - /url: /contact
  - paragraph: Golf and clubhouse
  - link "Golf Explore Golf":
    - /url: /golf
  - paragraph: Course holes
  - link "Hole No. 1":
    - /url: /golf/courses/hole-no.1
  - link "Hole No. 2":
    - /url: /golf/courses/hole-no.2
  - link "Hole No. 3":
    - /url: /golf/courses/hole-no.3
  - link "Hole No. 4":
    - /url: /golf/courses/hole-no.4
  - link "Hole No. 5":
    - /url: /golf/courses/hole-no.5
  - link "Hole No. 6":
    - /url: /golf/courses/hole-no.6
  - link "Hole No. 7":
    - /url: /golf/courses/hole-no.7
  - link "Hole No. 8":
    - /url: /golf/courses/hole-no.8
  - link "Hole No. 9":
    - /url: /golf/courses/hole-no.9
  - link "Hole No. 10":
    - /url: /golf/courses/hole-no.10
  - link "Hole No. 11":
    - /url: /golf/courses/hole-no.11
  - link "Hole No. 12":
    - /url: /golf/courses/hole-no.12
  - link "Hole No. 13":
    - /url: /golf/courses/hole-no.13
  - link "Hole No. 14":
    - /url: /golf/courses/hole-no.14
  - link "Hole No. 15":
    - /url: /golf/courses/hole-no.15
  - link "Hole No. 16":
    - /url: /golf/courses/hole-no.16
  - link "Hole No. 17":
    - /url: /golf/courses/hole-no.17
  - link "Hole No. 18":
    - /url: /golf/courses/hole-no.18
  - paragraph: Competition
  - link "Tournaments":
    - /url: /events
- main:
  - region "Course snapshot"
  - paragraph: A New Golf Destination in Bicol
  - heading "Championship golf in the heart of Bicol." [level=1]
  - paragraph: Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
  - link "Plan your round":
    - /url: /plan-your-visit
  - 'button "Previous image: A Great Start for CamSur Uptown Golf Club, and for You"'
  - 'button "Next image: A Great Start for CamSur Uptown Golf Club, and for You"'
  - link "View A Great Start for CamSur Uptown Golf Club, and for You":
    - /url: /golf/courses/hole-no.1
  - button "Previous hole image"
  - paragraph: Hole
  - heading "No. 1" [level=3]
  - paragraph: The opening drive begins close to the club precinct and moves into a generous fairway. The preferred side leaves a clear angle to a green protected by a measured arrangement of bunkers.
  - link "Explore this hole":
    - /url: /golf/courses/hole-no.1
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
  - link "Wakeboarding at the CamSur Watersports Complex Experiences":
    - /url: /experiences
  - link "Villa Del Rey accommodation at CamSur Accommodations":
    - /url: /accommodations
- contentinfo:
  - img "Camsur Uptown Golf Club"
  - paragraph: CamSur Uptown Golf Club
  - paragraph: Camarines Sur, Philippines
  - paragraph
  - navigation "Footer navigation"
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
  35  |       await openMegaMenu(page, menuLabel);
  36  |       await expect(desktopMegaMenu(page)).toBeVisible();
  37  |     });
  38  | 
  39  |     test(testCase(firstId + 1, `Mega-menu contents correct — ${menuLabel}`), async ({ page }) => {
  40  |       await openMegaMenu(page, menuLabel);
  41  |       expect(await desktopMegaMenu(page).getByRole('link').count(), `${menuLabel} panel link count`).toBeGreaterThan(0);
  42  |     });
  43  | 
  44  |     test(testCase(firstId + 2, `Mega-menu closes — ${menuLabel}`), async ({ page }) => {
  45  |       await openMegaMenu(page, menuLabel);
  46  |       const trigger = visibleDesktopNavigation(page).getByRole('button', { name: menuLabel, exact: true });
  47  |       await closeMegaMenu(page);
  48  |       await expect(desktopMegaMenu(page)).toBeHidden();
  49  |       await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  50  |     });
  51  |   }
  52  | });
  53  | 
  54  | test.describe('Task 4 · Mobile navigation drawer', () => {
  55  |   test.use({ viewport: { width: 375, height: 812 } });
  56  | 
  57  |   test.beforeEach(async ({ page }) => {
  58  |     await page.goto('/');
  59  |   });
  60  | 
  61  |   test(testCase(181, 'Mobile — hamburger opens the drawer'), async ({ page }) => {
  62  |     await openMobileNavigation(page);
  63  |   });
  64  | 
  65  |   test(testCase(182, 'Mobile — hamburger closes the drawer'), async ({ page }) => {
  66  |     await openMobileNavigation(page);
  67  |     await page.keyboard.press('Escape');
  68  |     await expect(mobileNavigation(page)).toBeHidden();
  69  |     await expect(mobileNavigationButton(page)).toHaveAttribute('aria-expanded', 'false');
  70  |   });
  71  | 
  72  |   test(testCase(183, 'Mobile — submenu expand/collapse'), async ({ page }) => {
  73  |     await openMobileNavigation(page);
  74  |     const dialog = mobileNavigation(page);
  75  | 
  76  |     await dialog.getByRole('button', { name: /^golf$/i }).click();
  77  |     await expect(dialog.getByRole('link', { name: 'Hole No. 1', exact: true })).toBeVisible();
  78  | 
  79  |     await dialog.getByRole('button', { name: /go back/i }).click();
  80  |     await expect(dialog.getByRole('button', { name: /^golf$/i })).toBeVisible();
  81  |     await expect(dialog.getByRole('link', { name: 'Hole No. 1', exact: true })).toHaveCount(0);
  82  |   });
  83  | 
  84  |   test(testCase(184, 'Mobile — navigating a link auto-closes the drawer'), async ({ page }) => {
  85  |     await openMobileNavigation(page);
  86  |     await mobileNavigation(page).getByRole('link', { name: /plan your visit/i }).click();
  87  |     await expect(page).toHaveURL(/\/plan-your-visit$/);
  88  |     await expect(mobileNavigation(page)).toBeHidden();
  89  |   });
  90  | 
  91  |   test(testCase(185, 'Mobile — GOLF holes list is reachable'), async ({ page }) => {
  92  |     await openMobileNavigation(page);
  93  |     const dialog = mobileNavigation(page);
  94  |     await dialog.getByRole('button', { name: /^golf$/i }).click();
  95  | 
  96  |     const holes = dialog.getByRole('link', { name: /^Hole No\. \d+$/i });
  97  |     await expect(holes).toHaveCount(18);
  98  |     await holes.last().scrollIntoViewIfNeeded();
  99  |     await expect(holes.last()).toBeVisible();
  100 |   });
  101 | 
  102 |   test(testCase(186, 'Mobile — phone link uses tel: scheme'), async ({ page }) => {
  103 |     await expect(page.locator('header a[href^="tel:"]:visible').first()).toHaveAttribute('href', /tel:\+?63/);
  104 |   });
  105 | });
  106 | 
  107 | test.describe('Task 4 · Header globals', () => {
  108 |   test.beforeEach(async ({ page }) => {
  109 |     await page.goto('/');
  110 |   });
  111 | 
  112 |   test(testCase(187, 'Header is sticky on scroll'), async ({ page }) => {
  113 |     await page.mouse.wheel(0, 1500);
  114 |     await expect(page.locator('header').first()).toBeInViewport();
  115 |   });
  116 | 
  117 |   test(testCase(188, 'Logo returns to Home from an interior page'), async ({ page }) => {
  118 |     await page.goto('/golf');
  119 |     await page.locator('header a[aria-label*="home" i]:visible').first().click();
  120 |     await expect(page).toHaveURL(/\/$/);
  121 |   });
  122 | 
  123 |   test(testCase(189, 'Plan-your-visit CTA navigates correctly'), async ({ page }) => {
  124 |     await page.locator('header a[href="/plan-your-visit"]:visible').first().click();
  125 |     await expect(page).toHaveURL(/\/plan-your-visit$/);
  126 |   });
  127 | 
  128 |   test(testCase(190, 'Active state reflects current section'), async ({ page }) => {
  129 |     await page.goto('/golf');
  130 |     await expect(page.locator('header')).toBeVisible();
  131 |   });
  132 | 
  133 |   test(testCase(191, 'Scroll-lock while a mega-menu is open'), async ({ page }) => {
  134 |     await openMegaMenu(page, 'GOLF');
> 135 |     await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
      |                                        ^ Error: expect(locator).toHaveCSS(expected) failed
  136 |   });
  137 | 
  138 |   test(testCase(192, 'Keyboard can open a mega-menu (Enter/Space)'), async ({ page }) => {
  139 |     const golf = visibleDesktopNavigation(page).getByRole('button', { name: 'GOLF', exact: true });
  140 |     await golf.focus();
  141 |     await page.keyboard.press('Enter');
  142 |     await expect(desktopMegaMenu(page).getByRole('link', { name: 'Hole No. 1', exact: true })).toBeVisible();
  143 |   });
  144 | });
  145 | 
```