---
type: Runbook
title: Environment
description: The one build-time variable, VITE_ADSENSE_CLIENT, and the GitHub Actions variables and secret the deploy needs — where each is set and read.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# Environment

## Variables

| Name                       | Kind                              | What it is                                                                                        |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `VITE_ADSENSE_CLIENT`      | Build-time, public                | The AdSense publisher id. Optional locally: empty means no ads ([[integrations/google-adsense]]). |
| `FIREBASE_PROJECT_ID`      | GitHub Actions variable           | The Firebase project to deploy to.                                                                |
| `FIREBASE_SERVICE_ACCOUNT` | GitHub Actions secret             | Service-account key for the hosting deploy.                                                       |
| `APP_URL`                  | GitHub Actions variable, optional | Address shown on the `production` environment.                                                    |
| `CI`                       | Set by the CI runner              | Switches Playwright to CI behaviour.                                                              |

Locally the variable goes in `.env` (git-ignored), copied from `.env.example`. The values for CI are listed in `README.md` under CI/CD.

## Where each is read

- `VITE_ADSENSE_CLIENT`: `build/adsense.ts` (from Vite's resolved `config.env`), `src/util/ads.ts` (`import.meta.env`), typed in `env.d.ts`; passed to the e2e and deploy jobs in `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`.
- `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT`, `APP_URL`: `.github/workflows/deploy.yml`.
- `CI`: `playwright.config.ts` (retries, reporter, `forbidOnly`, server reuse).
- Vite's own `BASE_URL` and `PROD` are read in `src/router/index.ts` and `src/util/ads.ts`.

## Sources

- `.env.example`
- `env.d.ts`
- `build/adsense.ts`
- `src/util/ads.ts`
- `src/router/index.ts`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `README.md`
- `.gitignore`
