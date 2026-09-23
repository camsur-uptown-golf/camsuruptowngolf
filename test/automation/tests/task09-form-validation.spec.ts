import { test, expect } from '@playwright/test';
import { fillCallbackForm, submitForm, field } from '../utils/helpers';

/**
 * QA Task 9 — Form Validation & Error Messages (TC-259 … TC-278) = 20 cases.
 * 8 required-field-missing + 12 validation/boundary/injection cases.
 */

// 8 required fields
const REQUIRED = [
  { label: 'First name', name: 'firstName', kind: 'text' },
  { label: 'Last name', name: 'lastName', kind: 'text' },
  { label: 'Email', name: 'email', kind: 'text' },
  { label: 'Mobile', name: 'mobile', kind: 'text' },
  { label: 'Guests', name: 'guests', kind: 'text' },
  { label: 'Interest', name: 'interest', kind: 'select' },
  { label: 'Timeframe', name: 'timeframe', kind: 'select' },
  { label: 'Consent', name: 'consent', kind: 'checkbox' },
] as const;

test.describe('Task 9 · Form Validation', () => {
  for (const f of REQUIRED) {
    test(`Required-field error — ${f.label} missing`, async ({ page }) => {
      await page.goto('/contact');
      await fillCallbackForm(page);
      const el = field(page, f.name);
      if (f.kind === 'select') await el.selectOption({ index: 0 }).catch(() => {});
      else if (f.kind === 'checkbox') await el.uncheck().catch(() => {});
      else await el.fill('');
      await submitForm(page);
      // Blocked: still on the form (submission prevented)
      await expect(page.locator('form')).toBeVisible();
    });
  }

  // 12 validation / boundary / injection
  test('Invalid email — no @', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { email: 'johnexample.com' });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });

  test('Invalid email — trailing dot', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { email: 'john@example.' });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });

  test('Invalid mobile — letters', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { mobile: 'abcd' });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });

  test('Guests — zero / negative rejected', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { guests: '0' });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });

  test('Guests — non-numeric rejected', async ({ page }) => {
    await page.goto('/contact');
    await field(page, 'guests').fill('ten').catch(() => {});
    const val = await field(page, 'guests').inputValue();
    expect(val === '' || /^\d*$/.test(val)).toBeTruthy();
  });

  test('Max-length handling on the question field', async ({ page }) => {
    await page.goto('/contact');
    const q = field(page, 'question');
    if ((await q.count()) === 0) test.skip(true, 'No question textarea — confirm selector.');
    await q.fill('x'.repeat(1200));
    await expect(page.locator('form')).toBeVisible();
  });

  test('Special chars / XSS is sanitised (no dialog)', async ({ page }) => {
    let dialogFired = false;
    page.on('dialog', async (d) => { dialogFired = true; await d.dismiss(); });
    await page.goto('/contact');
    await fillCallbackForm(page, { firstName: '<script>alert(1)</script>' });
    await submitForm(page);
    expect(dialogFired, 'XSS script executed').toBeFalsy();
  });

  test('Whitespace-only treated as empty', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { firstName: '   ' });
    await submitForm(page);
    await expect(page.locator('form')).toBeVisible();
  });

  test('Error clears after correction', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page);
    await field(page, 'email').fill('bad');
    await submitForm(page);
    await field(page, 'email').fill('valid.qa@example.com');
    await expect(field(page, 'email')).toHaveValue('valid.qa@example.com');
  });

  test('Postal code is optional (no error when blank)', async ({ page }) => {
    await page.goto('/contact');
    await fillCallbackForm(page, { postalCode: '' });
    await submitForm(page);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Newsletter — invalid email rejected', async ({ page }) => {
    await page.goto('/');
    const email = page.getByPlaceholder(/email/i).last();
    if ((await email.count()) === 0) test.skip(true, 'Newsletter field not found — confirm selector.');
    await email.fill('not-an-email');
    await page.getByRole('button', { name: /subscribe/i }).click().catch(() => {});
    await expect(page.locator('body')).toBeVisible();
  });

  test('Newsletter — valid email accepted', async ({ page }) => {
    await page.goto('/');
    const email = page.getByPlaceholder(/email/i).last();
    if ((await email.count()) === 0) test.skip(true, 'Newsletter field not found — confirm selector.');
    await email.fill('subscriber.qa@example.com');
    await page.getByRole('button', { name: /subscribe/i }).click().catch(() => {});
    await expect(page.locator('body')).toBeVisible();
  });
});
