---
type: Convention
title: Accessibility
description: The accessibility rules the site follows — real links and buttons with labels, visible focus, inert backgrounds, reduced motion, decorative effects hidden — and the axe check that guards them.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Accessibility

## Rules

- **Real controls.** Clickable things are `<a>`, `<button>` or `router-link`, never a clickable `div`: see `MenuHamburger.vue`, `SpanionLogo.vue`, `HoverText.vue`.
- **Labels from i18n.** Icon-only controls get an `aria-label` from the `a11y.*` keys in `lang.json`, so they are translated too. Toggles carry `aria-expanded` and `aria-controls` (`MenuHamburger.vue`, `SocialLinks.vue`).
- **New tabs are announced.** Links opening a new tab say so, in a `.visually-hidden` span (`HoverText.vue`) or in the `aria-label` (`SocialLinks.vue`, `HomeView.vue`).
- **Hidden means inert.** Content that is covered or collapsed is `inert`: the page behind the open menu, the closed menu, the collapsed social links ([[features/navigation-menu]]).
- **Focus is visible and moved on purpose.** `:focus-visible` draws an outline (`src/styles/main.css`); sections are focusable (`tabindex="-1"`) and get focus when jumped to (`focusSection()` in `src/util/sections.ts`).
- **Decoration is hidden.** The animated cursor, progress rings and decorative images are `aria-hidden` or have empty `alt`.
- **Reduced motion.** With `prefers-reduced-motion: reduce`, CSS animations and transitions are cut to near zero (`main.css`) and wheel smoothing is not installed (`src/util/smoothScroll.ts`).
- **Language.** `<html lang>` follows the chosen locale (`src/main.ts`).
- **No-JS fallback.** `index.html` has a `<noscript>` message with links to his profiles.

## Sources

- `src/styles/main.css`
- `src/util/sections.ts`
- `src/util/smoothScroll.ts`
- `src/main.ts`
- `index.html`
- `src/App.vue`
- `src/views/NavMenu.vue`
- `src/views/HomeView.vue`
- `src/components/MenuHamburger.vue`
- `src/components/SpanionLogo.vue`
- `src/components/HoverText.vue`
- `src/components/SocialLinks.vue`
- `src/components/CursorAnimated.vue`
- `src/assets/i18n/en/lang.json`
- `e2e/site.spec.ts`
