# CamSur Uptown Golf Club — QA Automation

Focused automated QA for the website at `http://localhost:3000`. The default run includes
only copy and spelling, accessibility and keyboard navigation, responsive layouts, and
header and mega navigation. Other spec files remain in the repository but are not discovered.

**Stack:** Playwright (Test) · axe-core · cspell.
**Browsers:** Chrome · Edge · Opera GX · Firefox.

---

## Quick start

```bash
cd test/automation
npm install                 # install dev dependencies
npx playwright install      # download browser binaries
# Make sure the site is running at http://localhost:3000 (npm run dev in repo root)
npm test                    # run the four selected areas in Opera GX
npm run report              # open the HTML report
```

Override the target URL with `BASE_URL`, e.g. `BASE_URL=https://staging.example.com npm test`.

---

## Layout

```
test/automation/
├── playwright.config.ts     # projects: chrome, edge, firefox, opera-gx, mobile-chrome
├── fixtures/site-data.ts    # single source of truth (42 pages, 18 holes, links, form, scorecard)
├── utils/                   # helpers.ts (nav/form) · a11y.ts (axe)
├── tests/                   # all specs; config discovers only the four selected areas
├── cspell.json              # spelling dictionary (Task 1)
└── ci/qa.yml                # sample GitHub Actions workflow
```

## Selected task → spec map

| Task | Spec | Runner |
|---|---|---|
| 1 Review website copy and spelling | `task01-content-spelling.spec.ts` + `npm run spell` | `npm run test:content` |
| 2 Review accessibility and keyboard navigation | `task10-accessibility.spec.ts` (axe) | `npm run test:a11y` |
| 3 Test desktop and mobile layouts | `task03-responsive-layouts.spec.ts` (visual snapshots) | `npm run test:responsive` |
| 4 Test header and mega navigation | `task04-header-mega-nav.spec.ts` | `npm run test:nav` |

## Run the selected tests by browser

```bash
npm run test:chrome
npm run test:edge
npm run test:firefox
npm run test:opera      # requires OPERA_GX_PATH (see below)
```

### Opera GX
Opera GX is **not** a native Playwright browser. Choose one:

1. **Local executable** — on Windows, the standard Opera GX installation path is detected
   automatically. For a custom installation, point Playwright at the binary:
   ```bash
   # Windows (PowerShell)
   $env:OPERA_GX_PATH="$env:LOCALAPPDATA\Programs\Opera GX\opera.exe"; npm run test:opera
   ```
   Opera GX is Chromium-based, so the `opera-gx` project launches Chromium against it.

2. **Cloud grid (recommended for real coverage)** — run against **BrowserStack** or
   **LambdaTest**, which offer genuine Opera GX. Add a project pointing at the grid's
   Playwright/Selenium endpoint with your credentials, then run only that project.

3. **Manual** — execute the 6 Task-13 flows by hand in Opera GX and record results in the
   Excel `Status` column.

## First run notes / assumptions

- **Selectors** in `fixtures/site-data.ts` and `utils/helpers.ts` were derived from the live
  DOM crawl. Confirm form field `name`s, the mobile hamburger, and success/error messages on
  first run and adjust if the markup differs. Tests that can't find an element **self-skip**
  with a clear message rather than failing spuriously.
- **Task 6 (scorecard)** self-skips until you fill the official par/metres/yardage values in
  `SCORECARD` — that data must come from the club.
- **Task 3** stores visual baselines under `tests/**/__screenshots__` on first run; review and
  commit them, then later runs diff against them (`--update-snapshots` to refresh).
- **Email delivery** for the callback form (Task 8) needs a test inbox (Mailtrap/MailHog);
  the specs verify the on-page confirmation, not the received email.

## Supporting tools

```bash
npm run spell           # cspell content spelling scan (Task 1)
```
