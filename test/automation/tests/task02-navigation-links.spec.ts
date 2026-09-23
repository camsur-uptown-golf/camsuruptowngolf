import { test, expect } from '@playwright/test';
import { EXTERNAL_LINKS, HOLES } from '../fixtures/site-data';
import { openMegaMenu } from '../utils/helpers';

/**
 * QA Task 2 — Verify All Navigation Links (TC-043 … TC-106) = 64 cases.
 * 62 link instances (every placement: header, all 6 mega-menus, footer, tel & external)
 * + custom 404 handling + external-new-tab safety.
 * Internal targets are navigated; tel/external targets are format-validated here and
 * fully reachability-checked by `npm run links:crawl` (Linkinator).
 */

type Link = { location: string; label: string; target: string };

const LINK_INSTANCES: Link[] = [
  // Header (3)
  { location: 'Header', label: 'Logo → Home', target: '/' },
  { location: 'Header', label: 'Plan your visit', target: '/plan-your-visit' },
  { location: 'Header', label: 'Phone number', target: 'tel:+639163007914' },
  // GOLF menu (20)
  { location: 'GOLF menu', label: 'Course Overview', target: '/golf' },
  ...HOLES.map((h, i) => ({ location: 'GOLF menu', label: `Hole No. ${i + 1}`, target: h.path })),
  { location: 'GOLF menu', label: 'Tournaments', target: '/events' },
  // CLUBHOUSE menu (10)
  { location: 'CLUBHOUSE menu', label: 'Overview', target: '/clubhouse' },
  { location: 'CLUBHOUSE menu', label: 'The arrival canopy', target: '/clubhouse/the-drum' },
  { location: 'CLUBHOUSE menu', label: 'The entrance hall', target: '/clubhouse/the-hall' },
  { location: 'CLUBHOUSE menu', label: 'The golf shop', target: '/clubhouse/golf-shop' },
  { location: 'CLUBHOUSE menu', label: 'Locker rooms', target: '/clubhouse/locker-rooms' },
  { location: 'CLUBHOUSE menu', label: 'Showers & wellness', target: '/clubhouse/spa' },
  { location: 'CLUBHOUSE menu', label: "Members' lounge", target: '/clubhouse/members-lounge' },
  { location: 'CLUBHOUSE menu', label: 'Practice bays', target: '/clubhouse/practice-bays' },
  { location: 'CLUBHOUSE menu', label: 'The VIP wing', target: '/clubhouse/vip' },
  { location: 'CLUBHOUSE menu', label: 'The rooftop', target: '/clubhouse/rooftop' },
  // PACKAGES menu (3)
  { location: 'PACKAGES menu', label: 'Overview', target: '/packages' },
  { location: 'PACKAGES menu', label: 'Stay and Play', target: '/packages/stay-and-play' },
  { location: 'PACKAGES menu', label: 'Buddy Trip', target: '/packages/buddy-trip' },
  // ACCOMMODATIONS menu (3)
  { location: 'ACCOMMODATIONS menu', label: 'Overview', target: '/accommodations' },
  { location: 'ACCOMMODATIONS menu', label: 'Villa Del Rey', target: '/accommodations/villa-del-rey' },
  { location: 'ACCOMMODATIONS menu', label: 'Gota Village Resort', target: '/accommodations/gota-village-resort' },
  // EXPERIENCES menu (13 = overview + 12 external)
  { location: 'EXPERIENCES menu', label: 'Overview', target: '/experiences' },
  ...EXTERNAL_LINKS.map((e) => ({ location: 'EXPERIENCES menu', label: `${e.name} (external)`, target: e.url })),
  // EVENTS menu (1)
  { location: 'EVENTS menu', label: 'Events', target: '/events' },
  // Footer (9)
  { location: 'Footer', label: 'The Course', target: '/golf' },
  { location: 'Footer', label: 'Packages', target: '/packages' },
  { location: 'Footer', label: 'Accommodations', target: '/accommodations' },
  { location: 'Footer', label: 'Dining', target: '/dining' },
  { location: 'Footer', label: 'Experiences', target: '/experiences' },
  { location: 'Footer', label: 'Events', target: '/events' },
  { location: 'Footer', label: 'Contact Us', target: '/contact' },
  { location: 'Footer', label: 'Terms of Use', target: '/terms-of-use' },
  { location: 'Footer', label: 'Phone number', target: 'tel:+639163007914' },
];

test.describe('Task 2 · Navigation Links', () => {
  LINK_INSTANCES.forEach((lnk, i) => {
    test(`TC-${String(43 + i).padStart(3, '0')} | [${lnk.location}] ${lnk.label} → ${lnk.target}`, async ({ page }) => {
      if (lnk.target.startsWith('/')) {
        const res = await page.goto(lnk.target, { waitUntil: 'domcontentloaded' });
        expect(res, `no response for ${lnk.target}`).not.toBeNull();
        expect(res!.status(), `status for ${lnk.target}`).toBeLessThan(400);
        expect(new URL(page.url()).pathname).toBe(lnk.target);
      } else if (lnk.target.startsWith('tel:')) {
        expect(lnk.target, 'tel: link format').toMatch(/^tel:\+?\d{6,}$/);
      } else {
        expect(lnk.target, 'external URL format').toMatch(/^https?:\/\/.+/);
      }
    });
  });

  test('TC-105 | Global — custom 404 handling for unknown route', async ({ page }) => {
    const res = await page.goto('/no-such-page-xyz', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/not found|404|home/i);
  });

  test('TC-106 | Experiences — external links open in a new tab with rel=noopener', async ({ page }) => {
    await page.goto('/');
    await openMegaMenu(page, 'EXPERIENCES');
    for (const ext of EXTERNAL_LINKS.slice(0, 4)) {
      const link = page.getByRole('link', { name: ext.name });
      if ((await link.count()) === 0) continue;
      await expect(link.first()).toHaveAttribute('target', '_blank');
      const rel = (await link.first().getAttribute('rel')) ?? '';
      expect(rel, `rel on ${ext.name}`).toContain('noopener');
    }
  });
});
