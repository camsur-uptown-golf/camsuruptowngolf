import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { chromium } from '@playwright/test';
import { PERF_PAGES, PERF_THRESHOLDS } from '../fixtures/site-data';

/**
 * QA Task 12 — Website Performance (TC-347 … TC-358).
 * Lighthouse audits (mobile + desktop) on 6 key pages via playwright-lighthouse.
 * Chromium-only; runs on a dedicated debugging port. `npm run lhci` is the CI gate.
 */
const PORT = 9222;

test.describe('Task 12 · Performance (Lighthouse)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Lighthouse runs on Chromium only.');
  test.describe.configure({ mode: 'serial', timeout: 120_000 });

  for (const { path, name } of PERF_PAGES) {
    for (const preset of ['desktop', 'mobile'] as const) {
      test(`Lighthouse — ${name} (${preset})`, async () => {
        const browser = await chromium.launch({ args: [`--remote-debugging-port=${PORT}`] });
        const page = await browser.newPage();
        await page.goto((process.env.BASE_URL ?? 'http://localhost:3000') + path, {
          waitUntil: 'networkidle',
        });
        await playAudit({
          page,
          port: PORT,
          thresholds: PERF_THRESHOLDS,
          config: { extends: 'lighthouse:default', settings: { formFactor: preset, screenEmulation: { disabled: preset === 'desktop' } } },
          reports: {
            formats: { html: true, json: true },
            name: `lh-${name.replace(/\W+/g, '-')}-${preset}`,
            directory: 'lighthouse-reports',
          },
        });
        await browser.close();
      });
    }
  }
});
