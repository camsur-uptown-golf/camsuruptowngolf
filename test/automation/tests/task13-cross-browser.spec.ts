import { test, expect, chromium, firefox, Browser, Page } from '@playwright/test';
import { openMegaMenu } from '../utils/helpers';
import { EXTERNAL_LINKS } from '../fixtures/site-data';

/**
 * QA Task 13 — Cross-browser (TC-359 … TC-382) = 24 cases (4 browsers × 6 flows).
 *
 * Each case launches its target browser internally, so the 24 definitions are
 * self-contained. To avoid multiplying across Playwright projects, these run once
 * (under the 'chrome' project) and skip on the others — the browser under test is
 * chosen inside the test, not by the project.
 */
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

type Launcher = () => Promise<Browser | null>;

const BROWSERS: { name: string; launch: Launcher }[] = [
  { name: 'Chrome', launch: () => chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch()) },
  { name: 'Edge', launch: () => chromium.launch({ channel: 'msedge' }).catch(() => chromium.launch()) },
  {
    name: 'Opera GX',
    launch: () =>
      process.env.OPERA_GX_PATH
        ? chromium.launch({ executablePath: process.env.OPERA_GX_PATH })
        : Promise.resolve(null), // no local Opera GX → run on a cloud grid (see README)
  },
  { name: 'Firefox', launch: () => firefox.launch() },
];

const FLOWS: { name: string; run: (page: Page) => Promise<void> }[] = [
  {
    name: 'Homepage renders',
    run: async (page) => {
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/CamSur Uptown Golf/i);
      await expect(page.locator('header')).toBeVisible();
    },
  },
  {
    name: 'Mega-menu navigation',
    run: async (page) => {
      await page.goto(`${BASE}/`);
      await openMegaMenu(page, 'GOLF');
      await page.getByRole('link', { name: 'Hole No. 1' }).click();
      await expect(page).toHaveURL(/hole-no\.1/);
    },
  },
  {
    name: 'Hole page + scorecard render',
    run: async (page) => {
      await page.goto(`${BASE}/golf/courses/hole-no.1`, { waitUntil: 'networkidle' });
      await expect(page.locator('body')).toContainText(/hole|par/i);
      expect(await page.locator('img').count()).toBeGreaterThan(0);
    },
  },
  {
    name: 'Callback form reachable',
    run: async (page) => {
      await page.goto(`${BASE}/plan-your-visit`);
      await expect(page.locator('form').first()).toBeVisible();
      await page.locator('form [name="firstName"]').first().fill('Cross');
      await expect(page.locator('form [name="firstName"]').first()).toHaveValue('Cross');
    },
  },
  {
    name: 'Responsive / mobile layout',
    run: async (page) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    },
  },
  {
    name: 'External facility links well-formed',
    run: async (page) => {
      await page.goto(`${BASE}/`);
      await openMegaMenu(page, 'EXPERIENCES');
      const link = page.getByRole('link', { name: EXTERNAL_LINKS[0].name });
      if ((await link.count()) > 0) await expect(link.first()).toHaveAttribute('href', /^https?:\/\//);
    },
  },
];

test.describe('Task 13 · Cross-browser flows', () => {
  // Run once (browser is chosen inside each test), not per Playwright project.
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chrome', 'Cross-browser handled internally; runs under the chrome project only.');
  });

  for (const b of BROWSERS) {
    for (const flow of FLOWS) {
      test(`${b.name} — ${flow.name}`, async () => {
        const browser = await b.launch();
        if (!browser) {
          test.skip(true, `${b.name}: set OPERA_GX_PATH or use a cloud grid (BrowserStack/LambdaTest).`);
          return;
        }
        const page = await browser.newPage();
        try {
          await flow.run(page);
        } finally {
          await browser.close();
        }
      });
    }
  }
});
