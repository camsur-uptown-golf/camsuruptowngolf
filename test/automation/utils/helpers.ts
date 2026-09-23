import { Page, expect, Locator } from '@playwright/test';

/** Open a header mega-menu by its trigger label and return the opened panel scope. */
export async function openMegaMenu(page: Page, label: string): Promise<void> {
  const trigger = page.getByRole('button', { name: new RegExp(`^${label}$`, 'i') });
  await expect(trigger).toBeVisible();
  await trigger.click();
}

/** Close any open mega-menu via Escape. */
export async function closeMegaMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
}

/** Count broken images on the current page (naturalWidth === 0 for loaded <img>). */
export async function findBrokenImages(page: Page): Promise<string[]> {
  return page.$$eval('img', (imgs) =>
    imgs
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => (img as HTMLImageElement).currentSrc || img.getAttribute('src') || '(no src)'),
  );
}

/** Return images missing a meaningful alt attribute (null alt; empty alt = decorative, allowed). */
export async function findImagesMissingAlt(page: Page): Promise<string[]> {
  return page.$$eval('img', (imgs) =>
    imgs
      .filter((img) => img.getAttribute('alt') === null)
      .map((img) => img.getAttribute('src') || '(no src)'),
  );
}

/** Assert the page has no horizontal overflow at the current viewport. */
export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  // allow a 2px rounding tolerance
  expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(2);
}

/**
 * Best-effort locator for a callback form field by its `name` attribute,
 * scoped to the primary form on the page.
 */
export function field(page: Page, name: string): Locator {
  return page.locator(`form [name="${name}"]`).first();
}

/** Fill the callback request form with valid data. Pass overrides to omit/alter fields. */
export async function fillCallbackForm(
  page: Page,
  overrides: Partial<Record<string, string | boolean>> = {},
): Promise<void> {
  const data: Record<string, string | boolean> = {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.qa@example.com',
    mobile: '09171234567',
    guests: '4',
    consent: true,
    ...overrides,
  };

  for (const [name, value] of Object.entries(data)) {
    const el = field(page, name);
    if ((await el.count()) === 0) continue;
    const tag = await el.evaluate((n) => n.tagName.toLowerCase());
    const type = (await el.getAttribute('type')) ?? '';
    if (type === 'checkbox') {
      if (value === true) await el.check().catch(() => {});
      else await el.uncheck().catch(() => {});
    } else if (tag === 'select') {
      // pick the first non-empty option
      await el.selectOption({ index: 1 }).catch(() => {});
    } else if (typeof value === 'string') {
      await el.fill(value).catch(() => {});
    }
  }

  // required selects that have no override
  for (const sel of ['interest', 'timeframe']) {
    const el = field(page, sel);
    if ((await el.count()) > 0) await el.selectOption({ index: 1 }).catch(() => {});
  }
}

/** Submit the primary form. */
export async function submitForm(page: Page): Promise<void> {
  const submit = page
    .locator('form button[type="submit"], form input[type="submit"], form button:has-text("Submit"), form button:has-text("Send")')
    .first();
  await submit.click();
}
