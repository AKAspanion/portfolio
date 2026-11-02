---
type: Conventions
title: Conventions
description: How code is written in this repository — file layout, naming, component style, error handling, tests, lint, git and the commands to run.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# Conventions

## Naming

- Components and views are PascalCase single-file components, as in `src/components/HoverText.vue` and `src/views/NavMenu.vue`.
- Composables are named `useSomething`, one per file of the same name in `src/composables/`, as in `src/composables/useMagnet.ts`.
- Utility modules are camelCase, as in `src/util/smoothScroll.ts`.
- Content JSON is named after the content kind, one file per locale folder, as in `src/assets/json/en/projects.json`.

## Folder layout

- Pages go in `src/views/`, reusable components in `src/components/`, composables in `src/composables/`, plain helpers in `src/util/`, plugin setup in `src/plugins/`, the store in `src/stores/`.
- Import from `src` through the `@/` alias set in `vite.config.ts` and `tsconfig.app.json`, as `src/App.vue` does.
- Components use `<script setup lang="ts">` with typed `defineProps`, as in `src/components/HoverText.vue`.
- Visible text comes from i18n keys (`t('…')`), with both `src/assets/i18n/en/lang.json` and `src/assets/i18n/hi/lang.json` updated together ([[domain/locale-parity]]).
- Brand-icon SVG paths are imported one by one from `@mdi/js` in `src/icons.ts`, never the whole icon font.
- Build-time code lives in `build/`, as in `build/adsense.ts`.
- Component styles: split between global `<style>` and `<style scoped>` — see [[questions/scoped-vs-global-styles]].

## Error handling

- Browser storage access is wrapped in try/catch and failures are ignored, as in `src/util/preferences.ts`.
- Input from the URL is decoded defensively and looked up by id, never used as a selector, as in `src/util/sections.ts`.
- Router failures are handled in `router.onError` in `src/router/index.ts`; elsewhere errors go to `console.error` (`src/main.ts`).

## Tests

- Unit and component specs are `*.spec.ts` in a `__tests__/` folder beside the code they test, as in `src/util/__tests__/preferences.spec.ts`.
- Components are mounted with `mountWithApp` from `src/test/mount.ts`, as in `src/views/__tests__/NotFound.spec.ts`.
- End-to-end specs go in `e2e/`, as in `e2e/site.spec.ts`. More in [[quality/testing]].

## Lint and format

- ESLint, configured in `./eslint.config.ts` (Vue + type-checked TypeScript, formatting rules left to Prettier).
- Prettier, configured in `./.prettierrc.json`, with `./.prettierignore`.
- TypeScript project references in `./tsconfig.json`, checked by `vue-tsc`.

## Git

- Commit messages: free-form, imperative summaries — 0 of the last 100 commits on `master` are conventional (`git.message`).
- No ticket keys in history, no commitlint (`git.ticket`).
- Changes merge into `master`, 33 of 33 merges (`git.base`).
- Branch names are split (claude/ 3, feat/ 2, none 2 of 7); ga's default is kept (`git.branch`).
- Pull requests land as merge commits, keeping their commits (`git.squash`).

## Commands

The policy's `checks.commands.typecheck`, `checks.commands.lint`, `checks.commands.lint-fix`, `checks.commands.format-check`, `checks.commands.test` and `checks.commands.e2e` (shown by `ga.mjs workflow show`) come from `scripts` in `package.json`; e2e builds first because Playwright serves `dist/` (`playwright.config.ts`, `.github/workflows/ci.yml`).

## Sources

- `./eslint.config.ts`
- `./.prettierrc.json`
- `./.prettierignore`
- `./tsconfig.json`
- `tsconfig.app.json`
- `vite.config.ts`
- `package.json`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `src/App.vue`
- `src/components/HoverText.vue`
- `src/views/NavMenu.vue`
- `src/composables/useMagnet.ts`
- `src/util/smoothScroll.ts`
- `src/util/preferences.ts`
- `src/util/sections.ts`
- `src/router/index.ts`
- `src/main.ts`
- `src/icons.ts`
- `src/assets/json/en/projects.json`
- `src/assets/i18n/en/lang.json`
- `src/assets/i18n/hi/lang.json`
- `build/adsense.ts`
- `src/test/mount.ts`
- `src/util/__tests__/preferences.spec.ts`
- `src/views/__tests__/NotFound.spec.ts`
- `e2e/site.spec.ts`
