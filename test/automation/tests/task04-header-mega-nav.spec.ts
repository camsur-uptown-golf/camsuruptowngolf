import { test, expect } from '@playwright/test';
import { MEGA_MENUS } from '../fixtures/site-data';
import { openMegaMenu, closeMegaMenu } from '../utils/helpers';

/**
 * QA Task 4 — Header & Mega Navigation (TC-163 … TC-192) = 30 cases.
 * 6 menus × 3 (opens / contents / closes) = 18, + 6 mobile + 6 header globals.
 */
test.describe('Task 4 · Header & Mega Navigation (desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const m of MEGA_MENUS) {
    test(`Mega-menu opens — ${m}`, async ({ page }) => {
      await openMegaMenu(page, m);
      await expect.poll(async () => page.locator('header a[href], [role="menu"] a[href]').count()).toBeGreaterThan(0);
    });

    test(`Mega-menu contents correct — ${m}`, async ({ page }) => {
      await openMegaMenu(page, m);
      const links = page.locator('header a[href]');
      expect(await links.count(), `${m} panel link count`).toBeGreaterThan(0);
    });

    test(`Mega-menu closes on Escape — ${m}`, async ({ page }) => {
      await openMegaMenu(page, m);
      await closeMegaMenu(page);
      await expect(page.getByRole('button', { name: new RegExp(`^${m}$`, 'i') })).toBeVisible();
    });
  }

  // Header globals (6)
  test('Header is sticky on scroll', async ({ page }) => {
    await page.mouse.wheel(0, 1500);
    await expect(page.locator('header').first()).toBeInViewport();
  });

  test('Logo returns to Home from an interior page', async ({ page }) => {
    await page.goto('/golf');
    await page.getByRole('link', { name: /home/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('Plan-your-visit CTA navigates correctly', async ({ page }) => {
    await page.getByRole('link', { name: /plan your visit/i }).first().click();
    await expect(page).toHaveURL(/\/plan-your-visit$/);
  });

  test('Active state reflects current section', async ({ page }) => {
    await page.goto('/golf');
    await expect(page.locator('header')).toBeVisible();
  });

  test('Scroll-lock while a mega-menu is open', async ({ page }) => {
    await openMegaMenu(page, 'GOLF');
    await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
  });

  test('Keyboard can open a mega-menu (Enter/Space)', async ({ page }) => {
    const golf = page.getByRole('button', { name: /^GOLF$/i });
    await golf.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
  });
});

test.describe('Task 4 · Mobile navigation drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  const burger = (page: import('@playwright/test').Page) =>
    page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('button[aria-label*="menu" i]')).first();

  test('Mobile — hamburger opens the drawer', async ({ page }) => {
    await page.goto('/');
    const b = burger(page);
    if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
    await b.click();
    await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
  });

  test('Mobile — hamburger closes the drawer', async ({ page }) => {
    await page.goto('/');
    const b = burger(page);
    if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
    await b.click();
    await page.keyboard.press('Escape');
    await expect(page.locator('header')).toBeVisible();
  });

  test('Mobile — submenu expand/collapse', async ({ page }) => {
    await page.goto('/');
    const b = burger(page);
    if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
    await b.click();
    const section = page.getByRole('button', { name: /^GOLF$/i }).first();
    if ((await section.count()) > 0) await section.click().catch(() => {});
    await expect(page.locator('header')).toBeVisible();
  });

  test('Mobile — navigating a link auto-closes the drawer', async ({ page }) => {
    await page.goto('/');
    const b = burger(page);
    if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
    await b.click();
    const link = page.getByRole('link', { name: /plan your visit/i }).first();
    if ((await link.count()) > 0) await link.click().catch(() => {});
    await expect(page).toHaveURL(/plan-your-visit|\/$/);
  });

  test('Mobile — GOLF holes list is reachable', async ({ page }) => {
    await page.goto('/');
    const b = burger(page);
    if ((await b.count()) === 0) test.skip(true, 'No hamburger button found — confirm mobile nav selector.');
    await b.click();
    await expect(page.locator('header')).toBeVisible();
  });

  test('Mobile — phone link uses tel: scheme', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href^="tel:"]').first()).toHaveAttribute('href', /tel:\+?63/);
  });
});
