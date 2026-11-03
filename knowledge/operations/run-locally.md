---
type: Runbook
title: Run locally
description: How to get the site running on a developer machine, preview the production build, and deploy by hand.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Run locally

## Prerequisites

- Node.js at the version in `.nvmrc` (`engines.node` in `package.json` sets the minimum); npm.
- For end-to-end tests, Playwright's Chromium: `npx playwright install chromium`.
- To deploy by hand, a Firebase login with access to the project in `.firebaserc`.

## Steps

1. `npm install`.
2. `cp .env.example .env`, and set `VITE_ADSENSE_CLIENT` only if you want the AdSense tag in builds ([[operations/environment]]). Dev builds never load ads.
3. `npm run dev` starts Vite's dev server with hot reload, on Vite's default port (no port is set in `vite.config.ts`).
4. To see the production build: `npm run build`, then `npm run preview` (its port is in `scripts.preview` in `package.json`).
5. Checks and tests: see [[quality/testing]]; the commands are the policy's `checks.commands.*` ([[project/conventions]]).
6. Deploying normally happens from CI ([[quality/ci]]); `npm run deploy` builds and deploys from your machine.

## Sources

- `README.md`
- `.nvmrc`
- `package.json`
- `.env.example`
- `vite.config.ts`
- `.firebaserc`
