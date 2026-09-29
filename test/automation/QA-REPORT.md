# CamSur Uptown Golf Club — Production QA Report

**Production URL:** https://camsuruptowngolf.vercel.app  
**Test date:** September 29, 2026  
**Environment:** Production deployment on Vercel  
**Test areas:** Functionality, accessibility, responsive UI, cross-browser behavior, performance, availability, and capacity

## 1. Executive summary

The production website is generally responsive and functional across the tested browsers and screen sizes. Core navigation, form validation, page rendering, images, and basic production availability passed. The configured capacity profile completed with no failed requests or dropped iterations at a peak target of 100 requests per second.

Four distinct product issues require attention:

1. The `/dining` route returned HTTP 404 during browser automation.
2. The homepage and contact page contain WCAG AA color-contrast failures.
3. The homepage heading structure skips from H1 to H3.
4. The desktop mega-menu does not lock background scrolling.

The existing visual-regression baselines are also no longer aligned with the current production design. This generated 56 screenshot comparison failures but does not represent 56 independent functional defects.

## 2. Test summary

### Chrome requested-area suite

| Result | Count |
|---|---:|
| Passed | 93 |
| Failed | 62 |
| Skipped | 1 |
| Total | 156 |

Failure classification:

| Classification | Count | Notes |
|---|---:|---|
| Visual baseline differences | 56 | Four viewports across 14 page templates |
| Other failed assertions | 6 | Represent four distinct product issues; contrast failures overlap between test suites |
| Skipped accessibility check | 1 | No skip-to-content link was found |

### Cross-browser focused production audit

Focused production checks were executed using:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Installed Opera GX
- Mobile Chrome with Pixel 7 emulation

The color-contrast and heading-hierarchy problems reproduced across browser engines and profiles. Navigation, responsive layout, form validation, resource loading, and basic timing checks otherwise passed. A mobile-project navigation harness mismatch was corrected and the affected test passed on rerun.

## 3. Detailed findings

### F-01 — Dining route returns 404

**Severity:** High  
**Area:** Functionality / navigation

The automated browser request to `/dining` returned HTTP 404. The route is included in the site's footer navigation, making it a user-facing broken destination.

**Expected result:** The Dining page should return a successful HTTP response and render its intended content.  
**Actual result:** Playwright received HTTP 404.

**Recommendation:** Implement or restore the Dining route, or remove/update links that point to it until the page is available.

### F-02 — Insufficient text contrast

**Severity:** High  
**Area:** Accessibility  
**Standard:** WCAG 2.x AA, Success Criterion 1.4.3

Automated Axe testing detected one serious color-contrast rule affecting:

- 5 nodes on the homepage
- 19 nodes on the contact page

Observed contrast ratios ranged from approximately 2.82:1 to 4.18:1, below the required 4.5:1 for the tested normal-sized text.

Affected examples include:

- Footer “Booking line” and “Email” labels
- Footer copyright and descriptive text
- Terms of Use link
- Contact breadcrumb
- Gold contact-card labels
- Form helper text
- “Required” indicators
- Newsletter/privacy text

**Recommendation:** Darken light-gray and gold foreground colors or adjust their backgrounds until every normal-sized text combination meets at least 4.5:1. Re-run Axe and Lighthouse after the design-token changes.

### F-03 — Homepage heading hierarchy skips a level

**Severity:** Medium  
**Area:** Accessibility / semantic structure

The homepage document outline contains an H1 followed by an H3 titled “Hole No. 1,” without an intervening H2.

**Recommendation:** Introduce the appropriate H2 section heading or change the hole heading to H2, depending on the intended content hierarchy.

### F-04 — Background remains scrollable while desktop mega-menu is open

**Severity:** Medium  
**Area:** Navigation / interaction

Opening the desktop GOLF mega-menu leaves the body with `overflow: visible`. Users can therefore scroll the page behind the open menu.

**Recommendation:** Apply and reliably remove body scroll locking while an overlay-style mega-menu is open. Preserve the current scroll position when restoring scrolling.

### F-05 — Skip-to-content link is absent

**Severity:** Medium  
**Area:** Keyboard accessibility

The skip-link test was skipped because no link with a skip-to-content purpose was found after the first Tab action.

**Recommendation:** Add a keyboard-visible skip link targeting the primary content container.

### F-06 — Visual-regression baselines are outdated

**Severity:** Review required  
**Area:** UI regression testing

All 56 screenshot comparisons differed from their stored baselines. A representative 320×568 homepage comparison showed:

- Expected full-page height: 4,907 px
- Current production height: 3,452 px
- Differing pixels: approximately 49%

Structural responsive assertions still passed, including absence of horizontal overflow and correct navigation visibility.

**Recommendation:** Review the current production design against the approved design. If the changes are intentional, regenerate and approve the screenshot baselines. Do not automatically accept all new snapshots without visual review.

## 4. Functionality results

The following checks passed:

- Desktop navigation controls open and close.
- Mobile navigation drawer opens successfully.
- Keyboard interaction opens the mega-menu.
- Sticky header remains available during scrolling.
- Logo and primary navigation routes operate correctly, except for `/dining`.
- Contact form exposes required controls.
- Empty contact-form submission is blocked by validation.
- Twelve key production routes returned successful responses and rendered one primary H1.
- Homepage completed without detected broken images.
- No homepage JavaScript page errors or console errors were detected.

## 5. Responsive UI results

Structural responsive checks were executed at:

| Profile | Viewport |
|---|---:|
| Mobile | 320×568 |
| Tablet | 768×1024 |
| Desktop | 1440×900 |

The homepage, Golf, Packages, Accommodations, and Contact routes passed the following checks at each tested width:

- No material horizontal overflow
- Header remained visible
- Mobile navigation appeared at mobile/tablet widths
- Desktop navigation appeared at desktop width

The remaining responsive failures are visual-baseline differences described in F-06.

## 6. Lighthouse performance results

Each URL was tested three times using the Lighthouse desktop preset. Values below are medians.

| Page | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | 99 | 94 | 100 | 100 | 316 ms | 960 ms | 0 ms | 0 | 40.91 MB |
| Golf | 99 | 96 | 100 | 100 | 357 ms | 984 ms | 0 ms | 0 | 1.72 MB |
| Hole No. 1 | 99 | 97 | 100 | 100 | 317 ms | 923 ms | 0 ms | 0 | 1.05 MB |
| Clubhouse | 99 | 96 | 100 | 100 | 335 ms | 941 ms | 0 ms | 0 | 1.05 MB |
| Packages | 99 | 96 | 100 | 100 | 284 ms | 924 ms | 0 ms | 0 | 0.88 MB |
| Contact | 100 | 96 | 100 | 100 | 300 ms | 661 ms | 0 ms | 0 | 0.57 MB |

All configured Lighthouse thresholds passed.

### Performance concern

Although the homepage received a performance score of 99, its median transfer size was approximately 40.91 MB. The hero video accounts for most of this transfer. Fast desktop paint metrics do not remove the bandwidth cost for visitors using mobile data or slower connections.

**Recommendation:** Provide smaller video variants, use aggressive compression, avoid unnecessary preload, supply an efficient poster image, and conditionally load video based on viewport, network conditions, and reduced-motion preferences.

## 7. Load and capacity results

### Bounded availability test

| Metric | Result |
|---|---:|
| Requests | 30 |
| Successful responses | 30 |
| Errors | 0 |
| Concurrency | 5 |
| Throughput | 66.03 requests/second |
| p50 latency | 46.21 ms |
| p95 latency | 161.98 ms |
| Maximum latency | 183.55 ms |

**Result:** Passed.

### k6 smoke profile

| Metric | Result |
|---|---:|
| Checks | 31/31 passed |
| Request rate | 1 request/second |
| Errors | 0 |
| Dropped iterations | 0 |
| Average latency | 63.98 ms |
| p95 latency | 86.55 ms |
| p99 latency | 151.57 ms |
| Maximum latency | 175.71 ms |

**Result:** Passed.

### Staged capacity profile

The test ramped through 10, 25, 50, 75, and 100 requests per second over approximately 16 minutes.

| Metric | Result |
|---|---:|
| Checks | 46,949/46,949 passed |
| HTTP errors | 0 |
| Dropped iterations | 0 |
| Average request rate across ramps | 48.905 requests/second |
| Median latency | 51.04 ms |
| Average latency | 57.38 ms |
| p95 latency | 89 ms |
| p99 latency | 162.78 ms |
| Maximum latency | 1.38 seconds |
| Data received | Approximately 3.6 GB |

**Result:** Passed. No capacity limit was observed at the configured peak target of 100 requests per second.

### Capacity-test limitation

This result establishes a tested floor, not the absolute capacity of the application. The profile requested the CDN-cached homepage document. It did not execute full browser asset loading, form submissions, authenticated flows, database operations, cache bypasses, or origin-only traffic. A production breaking-point test should only be performed with explicit infrastructure-owner approval, monitoring, and an agreed abort threshold.

## 8. Recommended remediation order

1. Restore or remove the broken `/dining` route.
2. Correct the homepage and contact-page contrast failures.
3. Fix the homepage heading hierarchy and add a skip-to-content link.
4. Add desktop mega-menu background scroll locking.
5. Reduce the homepage hero-video payload.
6. Review and approve the current visual design, then regenerate screenshot baselines.
7. Re-run the full automated suite and Lighthouse audit after remediation.

## 9. Test artifacts

- `tests/production-health.spec.ts` — focused production health audit
- `scripts/load-test.mjs` — bounded HTTP availability test
- `scripts/capacity-test.js` — guarded k6 smoke and staged capacity profiles
- `lighthouserc.cjs` — six-page Lighthouse configuration
- `lighthouse-reports/` — generated Lighthouse HTML and JSON reports
- `tests/task03-responsive-layouts.spec.ts-snapshots/` — stored visual baselines

## 10. Final assessment

**Overall status: Passed with remediation required.**

The deployment remained available and responsive during the configured load tests and performed well under desktop Lighthouse conditions. Release quality is primarily affected by the broken Dining route, repeated accessibility contrast failures, semantic heading issue, missing skip link, background scrolling under the mega-menu, and the unusually large homepage video payload.
