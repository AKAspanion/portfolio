---
type: Component Inventory
title: Components
description: The site's own components and composables — the fixed page chrome, the animated cursor, and the hover and reveal effects — and where each is used.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Components

## Components

Layout primitives, buttons, icons and progress rings come from Vuetify (auto-imported by `vite-plugin-vuetify`). The site's own:

| Component                           | What it is                                                                                                                  | Used in                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `src/components/SpanionLogo.vue`    | Logo at the top left; links to `/`, or scrolls to the top when already there                                                | `App.vue`                     |
| `src/components/MenuHamburger.vue`  | The menu button ([[features/navigation-menu]])                                                                              | `App.vue`                     |
| `src/components/ScrollProgress.vue` | Ring showing how far down the page is; click scrolls down a little or back to the top. Also writes `scrollPos` to the store | `App.vue`                     |
| `src/components/SocialLinks.vue`    | Bottom-left button that fans out the social profile links; hidden on phones                                                 | `App.vue`                     |
| `src/components/CursorAnimated.vue` | A ring that follows the mouse, growing on hover and showing a text or image tooltip; only with a fine pointer at `smAndUp`  | `App.vue`                     |
| `src/components/HoverText.vue`      | Text or link with a directional underline, magnetic nudge and cursor tooltip; marks external links as opening a new tab     | `HomeView.vue`, `NavMenu.vue` |
| `src/components/MaskText.vue`       | Reveals its text with a wipe when it first scrolls into view; re-covers it while the menu is open                           | `HomeView.vue`                |
| `src/components/SkewOnHover.vue`    | Tilts its content in 3D towards the pointer                                                                                 | `HomeView.vue`                |

Composables:

- `useCursor()` (`src/composables/useCursor.ts`) — sets the cursor tooltip in the store, except on phones.
- `useMagnet()` (`src/composables/useMagnet.ts`) — `iconHover` and `textHover`, moving an element towards the pointer, except on phones.

Shared state for all of these is `useUiStore` in `src/stores/ui.ts`. Accessibility rules they follow are in [[design-system/accessibility]].

## Sources

- `src/components/SpanionLogo.vue`
- `src/components/MenuHamburger.vue`
- `src/components/ScrollProgress.vue`
- `src/components/SocialLinks.vue`
- `src/components/CursorAnimated.vue`
- `src/components/HoverText.vue`
- `src/components/MaskText.vue`
- `src/components/SkewOnHover.vue`
- `src/composables/useCursor.ts`
- `src/composables/useMagnet.ts`
- `src/stores/ui.ts`
- `src/App.vue`
