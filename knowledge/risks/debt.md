---
type: Technical Debt
title: Technical debt
description: Known rough edges worth fixing — colours scattered through templates, a service-worker tombstone to keep, a hard-coded email, and inconsistent style scoping.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# Technical debt

## Items

- **Colours aren't tokens.** The light and dark greys are repeated as hex values in inline `:style` bindings and scoped CSS across views and components, rather than defined once in the Vuetify themes in `src/plugins/vuetify.ts`. A palette change means editing each place listed in [[design-system/tokens]].
- **Service-worker tombstone.** `public/sw.js` exists only to remove an old caching service worker from returning visitors; its comment says to keep it at that URL until they have cycled out. Nothing records when that will be. It can be deleted then.
- **Contact email in code.** `EMAIL` in `src/views/HomeView.vue` is the only piece of portfolio content not in the content JSON ([[data/model]]); `SECURITY.md` and `index.html` repeat contact details separately.
- **Duplicated metadata.** The social profile URLs exist in `social.json` (both locales) and again in the JSON-LD and `<noscript>` block of `index.html`.
- **Style scoping is mixed.** Some components use global `<style>`, others `<style scoped>` — [[questions/scoped-vs-global-styles]].
- **Misleading field name.** `CursorState.link` in `src/stores/ui.ts` holds an image URL, not a link (its doc comment says so); `HoverText` has the same `link` prop beside a real `href`.

## Sources

- `src/plugins/vuetify.ts`
- `public/sw.js`
- `src/views/HomeView.vue`
- `SECURITY.md`
- `index.html`
- `src/assets/json/en/social.json`
- `src/stores/ui.ts`
- `src/components/HoverText.vue`
