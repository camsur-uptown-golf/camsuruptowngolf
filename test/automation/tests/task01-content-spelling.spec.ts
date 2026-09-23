import { test, expect } from '@playwright/test';
import { PAGES } from '../fixtures/site-data';

/**
 * QA Task 1 — Review Website Copy and Spelling (TC-001 … TC-042).
 *
 * Automated smoke of content presence per page. Spelling/grammar is scanned by
 * `npm run spell` (cspell); tone/terminology still needs a human review pass.
 */
test.describe('Task 1 · Copy & Spelling', () => {
  PAGES.forEach(({ path, name }, i) => {
    test(`TC-${String(i + 1).padStart(3, '0')} | Copy present — ${name}`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), `HTTP status for ${path}`).toBeLessThan(400);

      // Page renders visible textual content
      const bodyText = (await page.locator('main, body').first().innerText()).trim();
      expect(bodyText.length, `visible copy length on ${path}`).toBeGreaterThan(30);

      // No obvious placeholder / build leakage
      expect(bodyText.toLowerCase()).not.toContain('lorem ipsum');
      expect(bodyText).not.toContain('undefined');
      expect(bodyText.toLowerCase()).not.toContain('{{');
    });
  });
});
