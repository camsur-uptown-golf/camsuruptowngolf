import { Page, expect, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Run an axe-core accessibility scan against WCAG 2.1 A/AA and attach the full
 * result to the test report. Fails on any violation.
 */
export async function runAxe(page: Page, testInfo: TestInfo, context?: string): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  await testInfo.attach(`axe-${context ?? 'scan'}.json`, {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });

  const summary = results.violations.map(
    (v) => `${v.id} (${v.impact}) — ${v.nodes.length} node(s): ${v.help}`,
  );
  expect(results.violations, `axe violations:\n${summary.join('\n')}`).toEqual([]);
}
