---
type: Architecture
title: Architecture
description: A static Vue 3 single-page app on Firebase Hosting with no backend — startup order, data flow from JSON to screen, and the build-time AdSense step.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Architecture

## Services

There is one deployable: the static bundle Vite writes to `dist/`, uploaded to Firebase Hosting. It has no server code, API or database. At runtime the browser talks only to:

- Firebase Hosting, which serves every path as `index.html` (the `rewrites` in `firebase.json`) — see [[integrations/firebase-hosting]];
- Google Fonts, linked from `index.html` (Roboto and Rubik);
- Google AdSense, whose script `src/util/ads.ts` adds on demand — see [[integrations/google-adsense]].

## Jobs and queues

None: the site has no background work. The only build-time step beyond Vite and Vue is the `adsense()` plugin in `build/adsense.ts`, registered in `vite.config.ts`.

## Data flow

1. **Startup** (`src/main.ts`): creates the app and installs Pinia, the router, Vuetify and vue-i18n, in that order; keeps `<html lang>` in step with the i18n locale; installs wheel smoothing (`src/util/smoothScroll.ts`); and mounts `#app` only after `router.isReady()` settles, so the page transition plays on later navigations and not on first load. A failed first navigation is logged and the app mounts anyway.
2. **Preferences**: the theme and locale are read from localStorage before the plugins are created (`initialTheme()` and `initialLocale()` in `src/util/preferences.ts`) — see [[features/theme-and-language]].
3. **Content**: `src/content.ts` imports one JSON file per kind per locale from `src/assets/json/<locale>/` and `useContent()` returns the current locale's set; UI strings come from `src/assets/i18n/<locale>/lang.json` through vue-i18n — see [[data/model]].
4. **Shell** (`src/App.vue`): the fixed chrome (logo, menu button, scroll progress, social links, animated cursor) and the full-screen `NavMenu`, around a `<router-view>` with a page transition.
5. **Shared UI state** lives in one Pinia store, `useUiStore` in `src/stores/ui.ts`: `loaded` (intro finished), `navMenu` (menu open), `scrollPos`, and the cursor tooltip.
6. **Routes** (`src/router/index.ts`): `/` is `HomeView`; old section URLs redirect to `/`; anything else lazy-loads `NotFound` — see [[features/not-found-and-redirects]].

## Sources

- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/stores/ui.ts`
- `src/content.ts`
- `src/util/preferences.ts`
- `src/util/smoothScroll.ts`
- `src/util/ads.ts`
- `vite.config.ts`
- `build/adsense.ts`
- `firebase.json`
- `index.html`
