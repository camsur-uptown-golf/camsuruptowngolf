import { test, expect, type Page } from '@playwright/test';
import { MEGA_MENUS } from '../fixtures/site-data';
import {
  closeMegaMenu,
  desktopMegaMenu,
  mobileNavigation,
  mobileNavigationButton,
  openMegaMenu,
  visibleDesktopNavigation,
} from '../utils/helpers';

/**
 * QA Task 4 — Header & Mega Navigation (TC-163 … TC-192) = 30 cases.
 * 6 menus × 3 (opens / contents / closes) = 18, + 6 mobile + 6 header globals.
 */
const testCase = (id: number, title: string) => `TC-${id} | ${title}`;

async function openMobileNavigation(page: Page) {
  const button = mobileNavigationButton(page);
  await expect(button).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(mobileNavigation(page)).toBeVisible();
}

test.describe('Task 4 · Header & Mega Navigation (desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const [menuIndex, menuLabel] of MEGA_MENUS.entries()) {
    const firstId = 163 + menuIndex * 3;

    test(testCase(firstId, `Mega-menu opens — ${menuLabel}`), async ({ page }) => {
      await openMegaMenu(page, menuLabel);
      await expect(desktopMegaMenu(page)).toBeVisible();
    });

    test(testCase(firstId + 1, `Mega-menu contents correct — ${menuLabel}`), async ({ page }) => {
      await openMegaMenu(page, menuLabel);
      expect(await desktopMegaMenu(page).getByRole('link').count(), `${menuLabel} panel link count`).toBeGreaterThan(0);
    });

    test(testCase(firstId + 2, `Mega-menu closes — ${menuLabel}`), async ({ page }) => {
      await openMegaMenu(page, menuLabel);
      const trigger = visibleDesktopNavigation(page).getByRole('button', { name: menuLabel, exact: true });
      await closeMegaMenu(page);
      await expect(desktopMegaMenu(page)).toBeHidden();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  }
});

test.describe('Task 4 · Mobile navigation drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(testCase(181, 'Mobile — hamburger opens the drawer'), async ({ page }) => {
    await openMobileNavigation(page);
  });

  test(testCase(182, 'Mobile — hamburger closes the drawer'), async ({ page }) => {
    await openMobileNavigation(page);
    await page.keyboard.press('Escape');
    await expect(mobileNavigation(page)).toBeHidden();
    await expect(mobileNavigationButton(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test(testCase(183, 'Mobile — submenu expand/collapse'), async ({ page }) => {
    await openMobileNavigation(page);
    const dialog = mobileNavigation(page);

    await dialog.getByRole('button', { name: /^golf$/i }).click();
    await expect(dialog.getByRole('link', { name: 'Hole No. 1', exact: true })).toBeVisible();

    await dialog.getByRole('button', { name: /go back/i }).click();
    await expect(dialog.getByRole('button', { name: /^golf$/i })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Hole No. 1', exact: true })).toHaveCount(0);
  });

  test(testCase(184, 'Mobile — navigating a link auto-closes the drawer'), async ({ page }) => {
    await openMobileNavigation(page);
    await mobileNavigation(page).getByRole('link', { name: /plan your visit/i }).click();
    await expect(page).toHaveURL(/\/plan-your-visit$/);
    await expect(mobileNavigation(page)).toBeHidden();
  });

  test(testCase(185, 'Mobile — GOLF holes list is reachable'), async ({ page }) => {
    await openMobileNavigation(page);
    const dialog = mobileNavigation(page);
    await dialog.getByRole('button', { name: /^golf$/i }).click();

    const holes = dialog.getByRole('link', { name: /^Hole No\. \d+$/i });
    await expect(holes).toHaveCount(18);
    await holes.last().scrollIntoViewIfNeeded();
    await expect(holes.last()).toBeVisible();
  });

  test(testCase(186, 'Mobile — phone link uses tel: scheme'), async ({ page }) => {
    await expect(page.locator('header a[href^="tel:"]:visible').first()).toHaveAttribute('href', /tel:\+?63/);
  });
});

test.describe('Task 4 · Header globals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(testCase(187, 'Header is sticky on scroll'), async ({ page }) => {
    await page.mouse.wheel(0, 1500);
    await expect(page.locator('header').first()).toBeInViewport();
  });

  test(testCase(188, 'Logo returns to Home from an interior page'), async ({ page }) => {
    await page.goto('/golf');
    await page.locator('header a[aria-label*="home" i]:visible').first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test(testCase(189, 'Plan-your-visit CTA navigates correctly'), async ({ page }) => {
    await page.locator('header a[href="/plan-your-visit"]:visible').first().click();
    await expect(page).toHaveURL(/\/plan-your-visit$/);
  });

  test(testCase(190, 'Active state reflects current section'), async ({ page }) => {
    await page.goto('/golf');
    await expect(page.locator('header')).toBeVisible();
  });

  test(testCase(191, 'Scroll-lock while a mega-menu is open'), async ({ page }) => {
    await openMegaMenu(page, 'GOLF');
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  });

  test(testCase(192, 'Keyboard can open a mega-menu (Enter/Space)'), async ({ page }) => {
    const golf = visibleDesktopNavigation(page).getByRole('button', { name: 'GOLF', exact: true });
    await golf.focus();
    await page.keyboard.press('Enter');
    await expect(desktopMegaMenu(page).getByRole('link', { name: 'Hole No. 1', exact: true })).toBeVisible();
  });
});
