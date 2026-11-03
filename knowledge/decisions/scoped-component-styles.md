---
type: Decision
title: Component styles are scoped
description: Single-file components use <style scoped> only; the existing global <style> blocks are debt to convert.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-03T04:40:51Z }
---

# Component styles are scoped

## Context

Five single-file components used a global `<style>` block and seven used `<style scoped>`, so the conventions couldn't state a rule ([[questions/scoped-vs-global-styles]]).

## Decision

Components and views use `<style scoped>` only. Styles shared across the site belong in `src/styles/main.css`, not in a component's global block. Reaching into a child component uses `:deep()`, as `src/views/HomeView.vue` does.

Decided by the developer, from the ga dashboard, on 2026-11-03.

## Consequences

- New and changed components are checked against this rule ([[project/conventions]]).
- The five existing global blocks — `src/App.vue`, `src/views/NavMenu.vue`, `src/components/CursorAnimated.vue`, `src/components/MenuHamburger.vue`, `src/components/SkewOnHover.vue` — are debt to convert ([[risks/debt]]). Some style things outside the component (the page-transition classes in `App.vue`, Vuetify's button group in `NavMenu.vue`), so converting each means moving those rules to `src/styles/main.css` or using `:deep()`.

## Sources

- `src/views/HomeView.vue`
- `src/styles/main.css`
- `src/App.vue`
- `src/views/NavMenu.vue`
- `src/components/CursorAnimated.vue`
- `src/components/MenuHamburger.vue`
- `src/components/SkewOnHover.vue`
