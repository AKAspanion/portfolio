---
type: Design Tokens
title: Design tokens
description: The type scale and fonts in src/styles/main.css, and the light/dark greys that are written directly into components rather than kept as theme tokens.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# Design tokens

## Colours

There is no colour token file. The palette is a set of Material greys per theme, written as hex values where they are used:

- Page and section backgrounds: `.v-theme--light` / `.v-theme--dark` rules in `src/styles/main.css` and the scoped styles of `src/views/HomeView.vue`.
- Foreground and control colours: inline `:style` bindings that pick a value from `theme.current.value.dark`, in `HomeView.vue`, `NotFound.vue`, `NavMenu.vue`, `MenuHamburger.vue`, `SpanionLogo.vue`, `ScrollProgress.vue` and `SocialLinks.vue`.
- The phone top bar's fallback colours in `src/App.vue`.
- Brand colours of social profiles in `socialBrands` in `src/icons.ts`, and of project tags in `projects.json`.

Vuetify's own `light` and `dark` themes are used unchanged (`src/plugins/vuetify.ts`). Changing a colour means finding each place; see [[risks/debt]].

## Spacing and radius

Spacing uses Vuetify's utility classes (`pa-*`, `pt-*`, `my-*`). Page padding is `.home-padding` and the content width `.fixed-wrapper`, both in `src/styles/main.css`. Corners are square: the toggles set `rounded="0"`.

## Typography

- Fonts: Rubik for body text (`#app` in `main.css`) and Roboto for headings and the type scale, both loaded from Google Fonts in `index.html`.
- Type scale: the `.type-display-3` … `.type-overline` classes in `src/styles/main.css`. Its comment says they carry over the Vuetify 2 (Material Design 2) scale the design was built on; weights come from Vuetify's `font-weight-*` utilities.

## Sources

- `src/styles/main.css`
- `src/plugins/vuetify.ts`
- `src/icons.ts`
- `src/App.vue`
- `src/views/HomeView.vue`
- `src/views/NotFound.vue`
- `src/views/NavMenu.vue`
- `src/components/MenuHamburger.vue`
- `src/components/SpanionLogo.vue`
- `src/components/ScrollProgress.vue`
- `src/components/SocialLinks.vue`
- `index.html`
