---
type: Feature
title: Theme and language
description: Light/dark theme and English/Hindi language, chosen in the menu, remembered per browser in localStorage, with the OS colour scheme as the first default.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Theme and language

## What it does

Two toggle groups at the bottom of the [[features/navigation-menu]] switch between light and dark themes and between English (`en`) and Hindi (`hi`). The choice applies at once — Vuetify's theme, every i18n string and the [[data/model]] content — and is remembered for the next visit in this browser.

## Screens and routes

The toggles are in `src/views/NavMenu.vue` (the `themeName` and `language` computed setters). They are reachable from every route.

## Rules

- **Saved per browser.** `saveTheme()` and `saveLocale()` in `src/util/preferences.ts` write the localStorage keys `dark` and `lang`; `initialTheme()` and `initialLocale()` read them before Vuetify and vue-i18n are created (`src/plugins/vuetify.ts`, `src/plugins/i18n.ts`).
- **Theme default.** With nothing saved, the theme follows `prefers-color-scheme`.
- **Language default.** Anything other than a saved `hi` is English. Older versions stored the value JSON-encoded, so quotes are stripped before comparing.
- **Storage may fail.** Every read and write is in try/catch; a blocked or throwing localStorage just means the choice isn't kept.
- **`<html lang>`** follows the locale (`watchEffect` in `src/main.ts`).
- **Missing content falls back to English** (`useContent()` in `src/content.ts`); missing UI strings fall back through `fallbackLocale` in `src/plugins/i18n.ts`. Both locales are kept complete — [[domain/locale-parity]].

## Sources

- `src/views/NavMenu.vue`
- `src/util/preferences.ts`
- `src/plugins/i18n.ts`
- `src/plugins/vuetify.ts`
- `src/content.ts`
- `src/main.ts`
- `src/util/__tests__/preferences.spec.ts`
- `e2e/site.spec.ts`
