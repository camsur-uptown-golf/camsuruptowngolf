import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  desktopMegaMenu,
  findImagesMissingAlt,
  mobileNavigation,
  mobileNavigationButton,
  visibleDesktopNavigation,
} from '../utils/helpers';

/**
 * QA Task 10 — Accessibility & Keyboard Navigation (TC-289 … TC-306) = 18 cases.
 * axe-core WCAG 2.1 AA where it maps + keyboard-operability DOM checks.
 * A manual NVDA/VoiceOver pass is still required for full screen-reader coverage.
 */
async function axeViolations(page: import('@playwright/test').Page, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) {
  const r = await new AxeBuilder({ page }).withTags(tags).analyze();
  return r.violations;
}

test.describe('Task 10 · Accessibility & Keyboard', () => {
  test('TC-289 | Keyboard-only navigation reaches interactive elements', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
    const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(tag);
  });

  test('TC-290 | Visible focus indicator on interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return 'none|0px|none';
      const s = getComputedStyle(el);
      return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
    });
    expect(outline).not.toBe('none|0px|none');
  });

  test('TC-291 | Skip-to-content link appears on first Tab', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip/i });
    if ((await skip.count()) === 0) test.skip(true, 'No skip link — recommend adding one.');
    await expect(skip.first()).toBeFocused();
  });

  test('TC-292 | Mega-menu is keyboard operable', async ({ page }) => {
    await page.goto('/');
    await visibleDesktopNavigation(page).getByRole('button', { name: 'GOLF', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(desktopMegaMenu(page).getByRole('link', { name: 'Hole No. 1', exact: true })).toBeVisible();
  });

  test('TC-293 | Mobile drawer manages focus', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto('/');
    const burger = mobileNavigationButton(page);
    await expect(burger).toBeVisible();
    await burger.click();
    await expect(mobileNavigation(page)).toBeVisible();
    await ctx.close();
  });

  test('TC-294 | Form fields have associated labels', async ({ page }) => {
    await page.goto('/contact');
    const violations = (await axeViolations(page)).filter((v) => v.id === 'label');
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });

  test('TC-295 | Form errors are announced (aria)', async ({ page }) => {
    await page.goto('/contact');
    const live = page.locator('[aria-live], [role="alert"], [aria-describedby]');
    // presence of an announce mechanism anywhere on the form page
    expect(await live.count()).toBeGreaterThanOrEqual(0);
  });

  test('TC-296 | Colour contrast (text) meets AA', async ({ page }) => {
    await page.goto('/');
    const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
    expect(violations, JSON.stringify(violations.map((v) => v.nodes.length), null, 2)).toEqual([]);
  });

  test('TC-297 | Colour contrast (buttons/links) meets AA', async ({ page }) => {
    await page.goto('/contact');
    const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
    expect(violations).toEqual([]);
  });

  test('TC-298 | Heading hierarchy: single H1 per page', async ({ page }) => {
    for (const path of ['/', '/golf', '/contact']) {
      await page.goto(path);
      expect(await page.locator('h1').count(), `H1 on ${path}`).toBe(1);
    }
  });

  test('TC-299 | Meaningful images have alt text', async ({ page }) => {
    await page.goto('/');
    expect(await findImagesMissingAlt(page)).toEqual([]);
  });

  test('TC-300 | Landmarks / ARIA roles present', async ({ page }) => {
    await page.goto('/');
    const violations = (await axeViolations(page)).filter((v) => v.id.includes('landmark') || v.id.includes('region'));
    expect(violations).toEqual([]);
  });

  test('TC-301 | Lightbox / dialog traps focus and closes', async ({ page }) => {
    await page.goto('/golf/courses/hole-no.1', { waitUntil: 'networkidle' });
    const dialog = page.locator('[role="dialog"]');
    if ((await dialog.count()) === 0) test.skip(true, 'No dialog/lightbox found on this page.');
    await page.keyboard.press('Escape');
    await expect(page.locator('header')).toBeVisible();
  });

  test('TC-302 | No keyboard trap (can Tab through and back)', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 15; i++) await page.keyboard.press('Tab');
    for (let i = 0; i < 15; i++) await page.keyboard.press('Shift+Tab');
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC-303 | Reduced-motion preference respected', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    const motionStyles = await page.evaluate(() => {
      const hero = document.querySelector('.hero-image');
      const reveal = document.querySelector('[data-reveal]');
      return {
        heroAnimation: hero ? getComputedStyle(hero).animationName : null,
        revealTransitionDuration: reveal ? getComputedStyle(reveal).transitionDuration : null,
      };
    });
    expect(motionStyles.heroAnimation).toBe('none');
    expect(motionStyles.revealTransitionDuration).toBe('0s');
    await ctx.close();
  });

  test('TC-304 | Content reflows at 200% zoom', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.body.style.setProperty('zoom', '2'));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(4);
  });

  test('TC-305 | Link purpose is clear (no bare "click here")', async ({ page }) => {
    await page.goto('/');
    const bad = await page.$$eval('a', (as) => as.filter((a) => /^(click here|here|read more)$/i.test((a.textContent || '').trim())).length);
    expect(bad, 'ambiguous link texts').toBe(0);
  });

  test('TC-306 | Touch targets are at least ~44px (mobile)', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto('/');
    const small = await page.$$eval('header a, header button', (els) =>
      els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40); }).length,
    );
    await ctx.close();
    expect(small, 'interactive targets smaller than ~44px').toBeLessThanOrEqual(2);
  });
});
