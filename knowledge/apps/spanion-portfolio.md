---
type: Application
title: spanion-portfolio (web)
description: The portfolio web app at the repository root — Vue 3, Vite, Vuetify, Pinia, Vue Router and vue-i18n in TypeScript.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# spanion-portfolio (web)

## Role

The only application: the static single-page site at spanion.in. See [[project/overview]] for what it shows and [[project/architecture]] for how it starts and where data comes from.

## Stack

Vue 3 with `<script setup>` and TypeScript, built by Vite; Vuetify for layout, theming and icons (`vite-plugin-vuetify` auto-imports components); Pinia for UI state; Vue Router with HTML5 history; vue-i18n in composition mode. Versions are in `package.json`; the Node version is in `.nvmrc` and `engines.node` in `package.json`.

## Entry points

- `index.html` — page metadata (title, description, canonical, Open Graph, JSON-LD `Person`), the fonts, and the `<noscript>` fallback; loads `src/main.ts`.
- `src/main.ts` — creates and mounts the app.
- `src/App.vue` — the page shell.
- `vite.config.ts` — plugins (`vue`, `vuetify`, `adsense`) and the `@` alias.
- The dev server port is Vite's default; the preview port is set in `scripts.preview` in `package.json` and in `PORT` in `playwright.config.ts`.

## Screens and routes

Routes are defined in `src/router/index.ts`: `/` (`home`, `HomeView`), the redirects in `legacyPaths`, and the `not-found` catch-all. The pages are `src/views/HomeView.vue` and `src/views/NotFound.vue`; `src/views/NavMenu.vue` is an overlay shown on every page.

## Depends on

- [[integrations/google-adsense]] — ads on the home page.
- [[integrations/firebase-hosting]] — where it is served from.
- Google Fonts (Roboto, Rubik), linked from `index.html`.

## Sources

- `package.json`
- `.nvmrc`
- `index.html`
- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/views/HomeView.vue`
- `src/views/NotFound.vue`
- `src/views/NavMenu.vue`
- `vite.config.ts`
- `playwright.config.ts`
