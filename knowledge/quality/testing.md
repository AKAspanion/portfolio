---
type: Test Strategy
title: Testing
description: Vitest unit and component tests in jsdom, and a Playwright suite run against the production build on desktop and mobile with an axe accessibility check.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Testing

## What is tested

**Unit and component (Vitest, `vitest.config.ts`, jsdom):**

- `src/__tests__/content.spec.ts` — locale parity and content references ([[domain/locale-parity]]).
- `src/__tests__/router.spec.ts` — legacy redirects and the 404 catch-all.
- `src/util/__tests__/` — the ads loader, preferences (including throwing storage and the old JSON-encoded locale), hash lookup.
- `src/views/__tests__/` — `HomeView` (sections render, ads after the intro, safe external links, footer year) `NotFound` (noindex, canonical removed and restored) and `PrivacyPolicy` (heading, `mailto:` link, canonical and title set and restored, no ads).
- `build/__tests__/adsense.spec.ts` — the `ads.txt` line.

Components are mounted with `mountWithApp()` from `src/test/mount.ts`, which installs a testing Pinia, a memory-history router with the app's `routes`, Vuetify and i18n, and stubs the browser observers and `matchMedia` jsdom lacks.

**End to end (Playwright, `playwright.config.ts`, `e2e/site.spec.ts`):** runs on a desktop Chrome and a Pixel 7 profile, against `vite preview` of the built `dist/`. It covers the home sections, ad timing and the no-ads 404, legacy redirects, menu navigation and focus, saved theme and language, static files, the `/privacy` page and its sitemap entry ([[features/privacy-policy]]), hostile hashes, and fails on any serious or critical axe violation. AdSense requests are blocked and counted; the ad tests skip when the build has no `VITE_ADSENSE_CLIENT`.

The `src/components/` files have no specs of their own; they are covered through the view specs and e2e.

## How to run it

The policy's `checks.commands.test` and `checks.commands.e2e` ([[project/conventions]]). End-to-end tests need a fresh production build first, since Playwright serves `dist/`; locally it reuses a preview server that is already running. CI runs both ([[quality/ci]]).

## Sources

- `vitest.config.ts`
- `playwright.config.ts`
- `src/test/mount.ts`
- `src/__tests__/content.spec.ts`
- `src/__tests__/router.spec.ts`
- `src/util/__tests__/ads.spec.ts`
- `src/util/__tests__/preferences.spec.ts`
- `src/util/__tests__/sections.spec.ts`
- `src/views/__tests__/HomeView.spec.ts`
- `src/views/__tests__/NotFound.spec.ts`
- `src/views/__tests__/PrivacyPolicy.spec.ts`
- `build/__tests__/adsense.spec.ts`
- `e2e/site.spec.ts`
- `package.json`
