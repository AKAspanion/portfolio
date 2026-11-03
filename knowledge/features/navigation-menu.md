---
type: Feature
title: Navigation menu
description: The full-screen menu opened from the hamburger button — jumps to a home section from any page, holds the theme and language toggles, and manages keyboard focus.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Navigation menu

## What it does

The button at the top right (`src/components/MenuHamburger.vue`, `id="menu-toggle"`) slides a full-screen panel (`src/views/NavMenu.vue`, `id="nav-menu"`) over the page. It lists the home page sections from `nav.json`, the site's host name, the theme and language toggles ([[features/theme-and-language]]), the social profiles and the copyright line. Choosing a section closes the menu and scrolls to it.

## Screens and routes

Shown over every route; it is mounted in `src/App.vue`, outside `<router-view>`. Its open state is `navMenu` in `useUiStore` (`src/stores/ui.ts`).

## Rules

- **From any page.** On `/`, a section link scrolls with Vuetify's `goTo` and focuses the section. On any other path (such as the 404 page) it routes to `/` with the hash, and the home page scrolls there after its intro ([[features/portfolio-home]]).
- **No double toggles.** `MenuHamburger` ignores clicks for the length of the slide animation (the timeout in `toggle()`).
- **Keyboard.** When the menu opens, focus moves to its first `.nav-item`; Escape closes it and returns focus to `#menu-toggle`. While open, the page behind (`.app-content` in `App.vue`) is `inert`; while closed, the menu itself is `inert` and `aria-hidden`. The button carries `aria-expanded` and `aria-controls="nav-menu"`.
- **Text masks.** While the menu is open, every `MaskText` covers its text again, and uncovers it after the menu closes (`src/components/MaskText.vue`).

## Sources

- `src/views/NavMenu.vue`
- `src/components/MenuHamburger.vue`
- `src/components/MaskText.vue`
- `src/App.vue`
- `src/stores/ui.ts`
- `src/util/sections.ts`
- `src/assets/json/en/nav.json`
- `e2e/site.spec.ts`
