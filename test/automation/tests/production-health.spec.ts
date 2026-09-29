import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const KEY_ROUTES = [
  '/',
  '/golf',
  '/clubhouse',
  '/packages',
  '/events',
  '/experiences',
  '/accommodations',
  '/plan-your-visit',
  '/contact',
  '/faq',
  '/getting-here',
  '/terms-of-use',
];

const VIEWPORTS = [
  { name: 'mobile', width: 320, height: 568, mobileNavigation: true },
  { name: 'tablet', width: 768, height: 1024, mobileNavigation: true },
  { name: 'desktop', width: 1440, height: 900, mobileNavigation: false },
] as const;

const RESPONSIVE_ROUTES = ['/', '/golf', '/packages', '/accommodations', '/contact'];

test.describe('Production health audit', () => {
  test('key routes respond successfully and render a primary heading', async ({ request, page }) => {
    for (const route of KEY_ROUTES) {
      const response = await request.get(route);
      expect(response.status(), `${route} HTTP status`).toBeLessThan(400);

      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1'), `${route} primary heading`).toHaveCount(1);
    }
  });

  test('desktop and mobile navigation controls are operable', async ({ browser }) => {
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('/');
    const golf = desktopPage.getByRole('button', { name: 'GOLF', exact: true }).first();
    await golf.click();
    await expect(golf).toHaveAttribute('aria-expanded', 'true');
    await expect(desktopPage.locator('#desktop-mega-menu')).toBeVisible();
    await desktopPage.keyboard.press('Escape');
    await expect(golf).toHaveAttribute('aria-expanded', 'false');
    await desktopContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('/');
    const openNavigation = mobilePage.getByRole('button', { name: /open navigation/i });
    await openNavigation.click();
    await expect(mobilePage.locator('#mobile-navigation')).toBeVisible();
    await mobileContext.close();
  });

  test('contact form exposes required fields and blocks an empty submission', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    const requiredControls = form.locator('input[required], select[required], textarea[required]');
    expect(await requiredControls.count(), 'required form controls').toBeGreaterThan(0);
    expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBeFalsy();
    expect(await form.locator(':invalid').count(), 'invalid empty controls').toBeGreaterThan(0);
  });

  test('homepage and contact page have no serious WCAG rule violations', async ({ page }, testInfo) => {
    for (const route of ['/', '/contact']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const violations = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );

      await testInfo.attach(`axe-${route === '/' ? 'home' : 'contact'}.json`, {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });

      expect.soft(
        violations,
        `${route} WCAG violations:\n${violations
          .map((violation) => `${violation.id}: ${violation.nodes.length} node(s)`)
          .join('\n')}`,
      ).toEqual([]);
    }
  });

  test('homepage heading levels do not skip the document outline', async ({ page }) => {
    await page.goto('/');
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((elements) =>
      elements.map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: element.textContent?.trim().replace(/\s+/g, ' ') ?? '',
      })),
    );
    const jumps = headings.filter((heading, index) => {
      if (index === 0) return heading.level !== 1;
      return heading.level > headings[index - 1].level + 1;
    });

    expect(jumps, `heading level jumps: ${JSON.stringify(jumps)}`).toEqual([]);
  });

  for (const viewport of VIEWPORTS) {
    test(`${viewport.name} layout has no horizontal overflow and shows the correct navigation`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const route of RESPONSIVE_ROUTES) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect.soft(
          overflow,
          `${route} ${viewport.name} horizontal overflow in pixels`,
        ).toBeLessThanOrEqual(2);

        const mobileButton = page.getByRole('button', { name: /open navigation/i });
        const desktopNavigation = page.locator('nav[data-nav="hero"]:visible, nav[data-nav="compact"]:visible');
        if (viewport.mobileNavigation) {
          await expect.soft(mobileButton, `${route} mobile navigation`).toBeVisible();
          await expect.soft(desktopNavigation, `${route} desktop navigation hidden`).toHaveCount(0);
        } else {
          await expect.soft(mobileButton, `${route} mobile navigation hidden`).toHaveCount(0);
          await expect.soft(desktopNavigation.first(), `${route} desktop navigation`).toBeVisible();
        }
      }
    });
  }

  test('homepage finishes without broken images, page errors, or console errors', async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    const response = await page.goto('/', { waitUntil: 'networkidle' });
    expect(response?.status(), 'homepage document status').toBeLessThan(400);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page
      .waitForFunction(() => [...document.images].every((image) => image.complete), undefined, {
        timeout: 5_000,
      })
      .catch(() => undefined);

    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images
        .filter((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 0)
        .map((image) => (image as HTMLImageElement).currentSrc || image.getAttribute('src')),
    );

    expect(brokenImages, 'broken images').toEqual([]);
    expect(pageErrors, 'uncaught page errors').toEqual([]);
    expect(consoleErrors, 'console errors').toEqual([]);
  });

  test('homepage load timing stays inside a generous production budget', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'load' });
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return {
        ttfbMs: navigation.responseStart - navigation.startTime,
        domContentLoadedMs: navigation.domContentLoadedEventEnd - navigation.startTime,
        loadMs: navigation.loadEventEnd - navigation.startTime,
        resourceCount: resources.length,
        transferBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
      };
    });

    await testInfo.attach('performance.json', {
      body: JSON.stringify(metrics, null, 2),
      contentType: 'application/json',
    });

    expect(metrics.ttfbMs, 'TTFB').toBeLessThan(2_000);
    expect(metrics.domContentLoadedMs, 'DOMContentLoaded').toBeLessThan(4_000);
    expect(metrics.loadMs, 'load event').toBeLessThan(8_000);
  });
});
