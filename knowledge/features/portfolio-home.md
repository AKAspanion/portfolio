---
type: Feature
title: Portfolio home page
description: The one page a visitor reads — an intro, then projects, skills, experience and contact sections — with the intro delay, deep links by hash and hover previews.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Portfolio home page

## What it does

A visitor lands on `/` and scrolls through five sections, each a `<section>` with an `id` in `src/views/HomeView.vue`:

1. `home` — a large greeting with his name; hovering the name shows his photo in the cursor tooltip.
2. `projects` — a grid of project cards from `projects.json`: image, name, technology tags, and a "view" link to the live project that previews its screenshot on hover.
3. `skills` — a grid of technology icons from `skills.json`.
4. `experience` — job cards from `experience.json`, each company name linking to the company and previewing its logo.
5. `contact` — a `mailto:` link and the social profiles from `social.json`; then a footer with the current year.

The content comes from [[data/model]] in the visitor's language ([[features/theme-and-language]]). Text reveals with a wipe as each heading scrolls into view (`MaskText`), project cards tilt towards the pointer (`SkewOnHover`), and a custom cursor follows the mouse on desktop — see [[design-system/components]].

## Screens and routes

- `GET /` → `HomeView` (route `home` in `src/router/index.ts`).
- `/#<section>` scrolls to and focuses that section once the intro ends.

## Rules

- **Intro first.** The fixed controls (logo, menu button, scroll progress, social links) stay off-screen until `INTRO_MS` in `HomeView.vue` has passed; then `ui.loaded` becomes true and they slide in (`App.vue`). While `loaded` is false the app root has `disable-cursor`, which turns off pointer events.
- **Ads after content.** The AdSense script is requested at the end of the intro, after the next render — [[domain/ads-only-with-content]].
- **Hash links are looked up by id.** `findSection()` in `src/util/sections.ts` decodes the hash and uses `getElementById`, so a hash that isn't a valid CSS selector (such as `#1`) can't throw; the section then gets focus without a second scroll (`focusSection()`).
- **Phones.** Below Vuetify's `xs` breakpoint the cursor effects are off (`useCursor`, `useMagnet`), the social-links widget is hidden, and the top bar takes the background colour of the section under it (`App.vue`).
- **External links** follow the new-tab rule in [[design-system/accessibility]].
- The contact email is the `EMAIL` constant in `HomeView.vue`.

## Sources

- `src/views/HomeView.vue`
- `src/App.vue`
- `src/router/index.ts`
- `src/util/sections.ts`
- `src/util/ads.ts`
- `src/composables/useCursor.ts`
- `src/composables/useMagnet.ts`
- `src/components/HoverText.vue`
- `src/components/MaskText.vue`
- `src/components/SkewOnHover.vue`
- `src/stores/ui.ts`
- `src/views/__tests__/HomeView.spec.ts`
- `e2e/site.spec.ts`
