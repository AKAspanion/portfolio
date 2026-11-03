---
type: Technical Debt
title: Technical debt
description: Known rough edges worth fixing — colours scattered through templates, a service-worker tombstone to keep, a hard-coded email, and inconsistent style scoping.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Technical debt

## Items

- **Colours aren't tokens.** The light and dark greys are repeated as hex values in inline `:style` bindings and scoped CSS across views and components, rather than defined once in the Vuetify themes in `src/plugins/vuetify.ts`. A palette change means editing each place listed in [[design-system/tokens]].
- **Service-worker tombstone.** `public/sw.js` exists only to remove an old caching service worker from returning visitors; its comment says to keep it at that URL until they have cycled out. Nothing records when that will be. It can be deleted then.
- **Contact email in code.** `CONTACT_EMAIL` in `src/content.ts` is the only piece of portfolio content not in the content JSON ([[data/model]]); it is a single export used by the home page and the privacy policy, but `SECURITY.md` repeats the same address.
- **Duplicated metadata.** The social profile URLs exist in `social.json` (both locales) and again in the JSON-LD and `<noscript>` block of `index.html`.
- **Global component styles.** Five components still use a global `<style>` block, against [[decisions/scoped-component-styles]]; each is listed there.
- **Misleading field name.** `CursorState.link` in `src/stores/ui.ts` holds an image URL, not a link (its doc comment says so); `HoverText` has the same `link` prop beside a real `href`.

## History

- 2026-11-03: the contact email became a single `CONTACT_EMAIL` export in `src/content.ts`; it was `EMAIL` in `HomeView.vue`. See [Privacy policy page](../features/privacy-policy.md).

## Sources

- `src/plugins/vuetify.ts`
- `public/sw.js`
- `src/content.ts`
- `SECURITY.md`
- `index.html`
- `src/assets/json/en/social.json`
- `src/stores/ui.ts`
- `src/components/HoverText.vue`
