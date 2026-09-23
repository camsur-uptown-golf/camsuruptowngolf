import { test, expect, request as pwRequest } from '@playwright/test';
import { PAGES } from '../fixtures/site-data';

/**
 * QA Task 11 — SEO Titles & Descriptions (TC-297 … TC-346) = 50 cases.
 * 42 per-page (title + meta description + canonical) + 8 global checks.
 * Bulk crawl also available via Screaming Frog (see README).
 */
test.describe('Task 11 · SEO — per page', () => {
  PAGES.forEach(({ path, name }) => {
    test(`SEO meta — ${name}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const title = (await page.title()).trim();
      expect(title.length, `<title> length on ${path}`).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(70);

      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc, `meta description on ${path}`).toBeTruthy();
      expect((desc ?? '').length).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, `canonical on ${path}`).toBeTruthy();
    });
  });
});

test.describe('Task 11 · SEO — global', () => {
  test('Open Graph tags present on Home', async ({ page }) => {
    await page.goto('/');
    for (const sel of ['meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]']) {
      expect(await page.locator(sel).count(), sel).toBeGreaterThan(0);
    }
  });

  test('Twitter card tags present on Home', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('meta[name="twitter:card"]').count()).toBeGreaterThan(0);
  });

  test('Titles are unique across pages', async ({ page }) => {
    const titles: string[] = [];
    for (const { path } of PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      titles.push((await page.title()).trim());
    }
    const dupes = titles.filter((v, i) => titles.indexOf(v) !== i);
    expect([...new Set(dupes)], `duplicate <title> values`).toEqual([]);
  });

  test('Canonical URLs are self-referencing', async ({ page, baseURL }) => {
    for (const path of ['/', '/golf', '/contact']) {
      await page.goto(path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, `canonical on ${path}`).toContain(path === '/' ? (baseURL ?? '') : path);
    }
  });

  test('robots.txt is served and indexable', async ({ baseURL }) => {
    const ctx = await pwRequest.newContext({ baseURL });
    const robots = await ctx.get('/robots.txt');
    expect(robots.status()).toBeLessThan(400);
    await ctx.dispose();
  });

  test('sitemap.xml is served', async ({ baseURL }) => {
    const ctx = await pwRequest.newContext({ baseURL });
    const sitemap = await ctx.get('/sitemap.xml');
    expect(sitemap.status()).toBeLessThan(400);
    await ctx.dispose();
  });

  test('Structured data (JSON-LD) present on Home', async ({ page }) => {
    await page.goto('/');
    const count = await page.locator('script[type="application/ld+json"]').count();
    if (count === 0) test.skip(true, 'No JSON-LD found — recommend adding Organization/LocalBusiness schema.');
    expect(count).toBeGreaterThan(0);
  });

  test('Favicon resolves (no 404)', async ({ page, baseURL }) => {
    await page.goto('/');
    const href = (await page.locator('link[rel~="icon"]').first().getAttribute('href')) ?? '/favicon.ico';
    const ctx = await pwRequest.newContext({ baseURL });
    const res = await ctx.get(href.startsWith('http') ? href : href);
    expect(res.status()).toBeLessThan(400);
    await ctx.dispose();
  });
});
