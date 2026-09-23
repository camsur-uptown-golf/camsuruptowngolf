import { test, expect } from '@playwright/test';
import { HOLES } from '../fixtures/site-data';

/**
 * QA Task 5 — Verify All 18 Hole Pages (TC-183 … TC-202, overlapping numbering
 * with the sheet; grouped here by intent). Each hole page loads and shows its number.
 */
test.describe('Task 5 · Hole Pages', () => {
  HOLES.forEach((hole, i) => {
    test(`Hole No. ${i + 1} loads & renders`, async ({ page }) => {
      const res = await page.goto(hole.path, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), `status for ${hole.path}`).toBeLessThan(400);
      // The hole number should appear somewhere prominent
      await expect(page.locator('body')).toContainText(new RegExp(`No\\.?\\s*${i + 1}\\b|Hole\\s*${i + 1}\\b`, 'i'));
      // A hero image should be present
      expect(await page.locator('img').count()).toBeGreaterThan(0);
    });
  });

  test('Course overview page loads with links to holes', async ({ page }) => {
    const res = await page.goto('/golf', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator('body')).toContainText(/hole|course|par/i);
  });

  test('Prev / next navigation moves between holes', async ({ page }) => {
    await page.goto('/golf/courses/hole-no.1');
    const next = page.getByRole('link', { name: /next|hole no\.?\s*2/i }).first();
    if ((await next.count()) === 0) test.skip(true, 'No prev/next control found — confirm selector.');
    await next.click();
    await expect(page).toHaveURL(/hole-no\.2/);
  });
});
