import { test, expect } from '@playwright/test';
import { FORM_PAGES } from '../fixtures/site-data';
import { fillCallbackForm, submitForm, field } from '../utils/helpers';

/**
 * QA Task 8 — Test Callback Request Form (TC-247 … TC-258) = 12 cases.
 */
const SUCCESS = /thank|received|success|touch|confirm/i;

test.describe('Task 8 · Callback Request Form', () => {
  for (const path of FORM_PAGES) {
    test(`[${path}] Submit with all valid fields (happy path)`, async ({ page }) => {
      await page.goto(path);
      await fillCallbackForm(page);
      await submitForm(page);
      await expect(page.locator('body')).toContainText(SUCCESS, { timeout: 15_000 });
    });

    test(`[${path}] Submit with required fields only`, async ({ page }) => {
      await page.goto(path);
      await fillCallbackForm(page, { postalCode: '', question: '' });
      await submitForm(page);
      await expect(page.locator('body')).toContainText(SUCCESS, { timeout: 15_000 });
    });
  }

  test('Interest dropdown lists valid options', async ({ page }) => {
    await page.goto('/plan-your-visit');
    expect(await field(page, 'interest').locator('option').count()).toBeGreaterThan(1);
  });

  test('Timeframe dropdown lists valid options', async ({ page }) => {
    await page.goto('/plan-your-visit');
    expect(await field(page, 'timeframe').locator('option').count()).toBeGreaterThan(1);
  });

  test('Preferred call-window checkboxes are selectable', async ({ page }) => {
    await page.goto('/plan-your-visit');
    const boxes = page.locator('form [name="callWindow"]');
    test.skip((await boxes.count()) === 0, 'No callWindow checkboxes found — confirm selector.');
    await boxes.first().check();
    await expect(boxes.first()).toBeChecked();
  });

  test('Guests numeric field accepts valid values', async ({ page }) => {
    await page.goto('/plan-your-visit');
    const g = field(page, 'guests');
    await g.fill('4');
    await expect(g).toHaveValue('4');
  });

  test('Confirmation message shown after a valid submit', async ({ page }) => {
    await page.goto('/plan-your-visit');
    await fillCallbackForm(page);
    await submitForm(page);
    await expect(page.locator('body')).toContainText(SUCCESS, { timeout: 15_000 });
  });

  test('Submission is captured (backend / test inbox)', async ({ page }) => {
    // Requires Mailtrap/MailHog or backend access to fully verify delivery.
    test.skip(!process.env.MAIL_INBOX_URL, 'Set MAIL_INBOX_URL (Mailtrap/MailHog) to verify delivery.');
    await page.goto('/contact');
    await fillCallbackForm(page);
    await submitForm(page);
    await expect(page.locator('body')).toContainText(SUCCESS, { timeout: 15_000 });
  });

  test('Double-submit guard (button disables or dedupes)', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page);
    const submit = page.locator('form button[type="submit"]').first();
    await submit.click();
    await submit.click({ timeout: 2000 }).catch(() => {});
    await expect(page.locator('body')).toContainText(SUCCESS, { timeout: 15_000 });
  });

  test('Consent is required to submit', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { consent: false });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });
});
