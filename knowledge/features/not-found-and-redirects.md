---
type: Feature
title: Not-found page and old URLs
description: Old section URLs redirect to the home page, every other unknown path shows a noindex 404 page without ads, and a stale chunk after a deploy triggers one reload.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Not-found page and old URLs

## What it does

The site used to have separate pages per section. Those URLs now land on the home page, and any other unknown path shows a simple 404 page with a link back to the portfolio.

## Screens and routes

Defined in `src/router/index.ts`:

- `legacyPaths` — each redirects to `/`. The comment there gives the reason: older section URLs must never render an empty or under-construction screen.
- `/privacy` is a real route ([[features/privacy-policy]]), so it never reaches the catch-all.
- `/:pathMatch(.*)*` → route `not-found`, lazy-loading `src/views/NotFound.vue`.

## Rules

- **Not indexed.** Firebase serves `index.html` with a 200 for every path, so `NotFound.vue` adds `<meta name="robots" content="noindex">` and removes the canonical link while it is shown, and restores the canonical link when it leaves (comments in `NotFound.vue`).
- **No ads.** The 404 page never loads AdSense; an in-app navigation to a 404 after ads loaded on the home page reloads the page fresh — [[domain/ads-only-with-content]].
- **Controls shown at once.** `NotFound.vue` sets `ui.loaded` on mount, so the logo and menu button appear without the home page's intro.
- **Stale chunks after a deploy.** If a lazy-loaded chunk fails to import (`router.onError`), the router does a full page load of the target once; the `chunk-reload` key in sessionStorage stops it from looping on the same path.
- **Static files stay files.** `robots.txt` and `sitemap.xml` in `public/` are served as themselves, not the app shell (checked in `e2e/site.spec.ts`).

## History

- 2026-11-03: `/privacy` became a real route, so it no longer falls to the 404 page. See [Privacy policy page](privacy-policy.md).

## Sources

- `src/router/index.ts`
- `src/views/NotFound.vue`
- `src/util/ads.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- `firebase.json`
- `src/__tests__/router.spec.ts`
- `src/views/__tests__/NotFound.spec.ts`
- `e2e/site.spec.ts`
