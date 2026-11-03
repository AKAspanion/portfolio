---
type: Integration
title: Firebase Hosting
description: Where the built site is served from — the project, the SPA rewrite, security headers and cache rules in firebase.json, and how deploys reach it.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Firebase Hosting

## What it is used for

Serving `dist/` as the production site at spanion.in and at the project's `.web.app` address (both named in `README.md`).

## Configuration

- **Project:** the default project in `.firebaserc`; CI uses the `FIREBASE_PROJECT_ID` variable ([[quality/ci]]).
- **What is served:** `hosting.public` in `firebase.json` is `dist`; dotfiles and `node_modules` are ignored.
- **SPA rewrite:** every path that isn't a file is served `index.html`, so client routes work on reload. This is also why unknown paths return 200 and the 404 page marks itself `noindex` ([[features/not-found-and-redirects]]).
- **Headers:** security headers on every path ([[security/data-protection]]) and `Cache-Control` rules per path. The reason for `no-cache` on the HTML is in commit `28afb4f`: `index.html` had been cached for an hour while deploys removed the old JavaScript. Hashed files under `/assets/` are cached as immutable; `/images/` for a shorter time.
- **Deploying:** `deploy.yml` on every push to `master`, using `FirebaseExtended/action-hosting-deploy` with the `FIREBASE_SERVICE_ACCOUNT` secret; or by hand with `npm run deploy` (`scripts.deploy` in `package.json`), which builds and runs `firebase-tools` at a pinned version.

## Failure modes

- **Old tabs after a deploy** may ask for chunks that no longer exist; the router reloads once to pick up the new version ([[features/not-found-and-redirects]]).
- **Old service worker.** An earlier version registered a caching service worker; `public/sw.js` now replaces it with one that clears its caches and unregisters itself. Its comment says to keep it at that URL until old visitors have cycled out ([[risks/debt]]).
- **Missing deploy settings** stop the deploy job with an error naming them.

## Sources

- `firebase.json`
- `.firebaserc`
- `package.json`
- `README.md`
- `public/sw.js`
- `.github/workflows/deploy.yml`
- `src/router/index.ts`
