import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * CamSur Uptown Golf Club — Playwright configuration.
 *
 * Target browsers (QA Task 13): Chrome · Edge · Opera GX · Firefox.
 *
 * Opera GX is NOT a natively supported Playwright browser. Two supported paths:
 *   1) Local: set OPERA_GX_PATH to the Opera GX executable — the 'opera-gx' project
 *      launches Chromium against that binary.
 *   2) Cloud grid: run against BrowserStack/LambdaTest which provide real Opera GX
 *      (see README "Opera GX" section). Then run only chrome/edge/firefox locally.
 */

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const DEFAULT_OPERA_GX_PATH = process.env.LOCALAPPDATA
  ? join(process.env.LOCALAPPDATA, 'Programs', 'Opera GX', 'opera.exe')
  : undefined;
const OPERA_GX_PATH = process.env.OPERA_GX_PATH
  ?? (DEFAULT_OPERA_GX_PATH && existsSync(DEFAULT_OPERA_GX_PATH) ? DEFAULT_OPERA_GX_PATH : undefined);

export default defineConfig({
  testDir: './tests',
  // Keep the default suite focused on the four requested review areas.
  testMatch: [
    '**/task01-content-spelling.spec.ts',
    '**/task03-responsive-layouts.spec.ts',
    '**/task04-header-mega-nav.spec.ts',
    '**/task10-accessibility.spec.ts',
  ],
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  // Uncomment to let Playwright start the Next.js dev server automatically.
  // webServer: {
  //   command: 'npm --prefix ../../ run dev',
  //   url: BASE_URL,
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120_000,
  // },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      // Opera GX (Chromium-based) via local executable. Skipped if OPERA_GX_PATH is unset.
      name: 'opera-gx',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: OPERA_GX_PATH ? { executablePath: OPERA_GX_PATH } : {},
      },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
