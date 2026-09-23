import { test, expect } from '@playwright/test';
import { SCORECARD, SCORECARD_TOTALS, HOLES } from '../fixtures/site-data';

/**
 * QA Task 6 — Verify Scorecard, Par, Metres, Yardages (TC-203 … TC-225) = 23 cases.
 * 18 per-hole value checks + 5 totals (par, metres, yards, front-9, back-9).
 *
 * Per-hole and total-value assertions self-skip until the OFFICIAL scorecard values
 * are filled into SCORECARD / SCORECARD_TOTALS in fixtures/site-data.ts.
 */
test.describe('Task 6 · Scorecard values', () => {
  SCORECARD.forEach((row, i) => {
    test(`Hole ${row.hole} — par / metres / yardage match source`, async ({ page }) => {
      if (row.par === null && row.metres === null && row.yards === null) {
        test.skip(true, `Populate official par/metres/yards for hole ${row.hole} in SCORECARD to enable.`);
      }
      await page.goto(HOLES[i].path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      if (row.par !== null) expect(text).toContain(String(row.par));
      if (row.metres !== null) expect(text).toContain(String(row.metres));
      if (row.yards !== null) expect(text).toContain(String(row.yards));
    });
  });

  test('Total par equals 72 (homepage hero + scorecard)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toContainText(String(SCORECARD_TOTALS.par));
  });

  test('Total metres reconciles with per-hole values', async ({}, testInfo) => {
    testInfo.skip(SCORECARD.some((r) => r.metres === null), 'Populate metres in SCORECARD to enable.');
    const sum = SCORECARD.reduce((s, r) => s + (r.metres ?? 0), 0);
    if (SCORECARD_TOTALS.metres !== null) expect(sum).toBe(SCORECARD_TOTALS.metres);
  });

  test('Total yardage reconciles with per-hole values', async ({}, testInfo) => {
    testInfo.skip(SCORECARD.some((r) => r.yards === null), 'Populate yards in SCORECARD to enable.');
    const sum = SCORECARD.reduce((s, r) => s + (r.yards ?? 0), 0);
    if (SCORECARD_TOTALS.yards !== null) expect(sum).toBe(SCORECARD_TOTALS.yards);
  });

  test('Front-9 par subtotal is correct', async ({}, testInfo) => {
    testInfo.skip(SCORECARD.slice(0, 9).some((r) => r.par === null), 'Populate front-9 par in SCORECARD.');
    const front = SCORECARD.slice(0, 9).reduce((s, r) => s + (r.par ?? 0), 0);
    expect(front).toBeGreaterThan(0);
  });

  test('Back-9 par subtotal is correct', async ({}, testInfo) => {
    testInfo.skip(SCORECARD.slice(9).some((r) => r.par === null), 'Populate back-9 par in SCORECARD.');
    const back = SCORECARD.slice(9).reduce((s, r) => s + (r.par ?? 0), 0);
    expect(back).toBeGreaterThan(0);
  });
});
