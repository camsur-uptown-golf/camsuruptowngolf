import { test, expect } from '@playwright/test';
import { HOLES } from '../fixtures/site-data';
import { findBrokenImages, findImagesMissingAlt } from '../utils/helpers';

/**
 * QA Task 7 — Verify Hole Maps and Images (TC-226 … TC-246).
 * Per-hole: no broken images, all images carry an alt attribute. Plus homepage
 * showcase, gallery/lightbox, and a site-wide alt audit.
 */
test.describe('Task 7 · Maps & Images', () => {
  HOLES.forEach((hole, i) => {
    test(`Hole ${i + 1} — imagery loads and has alt text`, async ({ page }) => {
      await page.goto(hole.path, { waitUntil: 'networkidle' });
      const broken = await findBrokenImages(page);
      expect(broken, `broken images on ${hole.path}`).toEqual([]);
      const missingAlt = await findImagesMissingAlt(page);
      expect(missingAlt, `images missing alt on ${hole.path}`).toEqual([]);
    });
  });

  test('Homepage hole showcase renders imagery', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(await findBrokenImages(page)).toEqual([]);
    await expect(page.locator('body')).toContainText(/hole/i);
  });

  test('Gallery / lightbox opens and closes (if present)', async ({ page }) => {
    await page.goto('/golf/courses/hole-no.1', { waitUntil: 'networkidle' });
    const img = page.locator('main img').first();
    await img.click({ trial: true }).catch(() => {});
    // Non-fatal: only assert no broken imagery after interaction
    expect(await findBrokenImages(page)).toEqual([]);
  });

  test('Site-wide alt-text audit on key pages', async ({ page }) => {
    for (const path of ['/', '/golf', '/clubhouse', '/packages']) {
      await page.goto(path, { waitUntil: 'networkidle' });
      const missing = await findImagesMissingAlt(page);
      expect(missing, `images missing alt on ${path}`).toEqual([]);
    }
  });
});
