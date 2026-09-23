// QA Task 12 — Lighthouse CI configuration.
// Usage: npm run lhci   (requires the site running at BASE_URL).
const BASE = process.env.BASE_URL || 'http://localhost:3000';

module.exports = {
  ci: {
    collect: {
      url: [
        `${BASE}/`,
        `${BASE}/golf`,
        `${BASE}/golf/courses/hole-no.1`,
        `${BASE}/clubhouse`,
        `${BASE}/packages`,
        `${BASE}/contact`,
      ],
      numberOfRuns: 3,
      settings: { preset: 'desktop' },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './lighthouse-reports' },
  },
};
