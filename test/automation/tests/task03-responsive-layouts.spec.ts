import { test, expect } from '@playwright/test';
import { TEMPLATES, VIEWPORTS } from '../fixtures/site-data';
import { expectNoHorizontalScroll } from '../utils/helpers';

/**
 * QA Task 3 — Desktop & Mobile Layouts (TC-107 … TC-162).
 * 14 templates × 4 viewports. Asserts no horizontal overflow and captures a visual
 * baseline snapshot (first run creates the baseline; later runs diff against it).
 */
test.describe('Task 3 · Responsive Layouts', () => {
  let idx = 107;
  for (const tmpl of TEMPLATES) {
    for (const vp of VIEWPORTS) {
      const tc = `TC-${String(idx++).padStart(3, '0')}`;
      test(`${tc} | ${tmpl.name} @ ${vp.name} (${vp.width}×${vp.height})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(tmpl.path, { waitUntil: 'networkidle' });

        await expectNoHorizontalScroll(page);

        // Header/nav must be reachable at every breakpoint (hamburger on mobile)
        const header = page.locator('header').first();
        await expect(header).toBeVisible();

        // Visual regression baseline (tolerant to minor rendering diffs)
        await expect(page).toHaveScreenshot(`${tmpl.name}-${vp.name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.03,
          animations: 'disabled',
        });
      });
    }
  }
});
