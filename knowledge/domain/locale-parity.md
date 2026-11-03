---
type: Business Rule
title: English and Hindi stay in step
description: Hindi must have exactly the English UI-string keys and the same number of content items, and every image, icon and link the content names must exist — enforced by unit tests.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# English and Hindi stay in step

## Rule

Any change to the site's text or content is made in both locales:

- `src/assets/i18n/hi/lang.json` has exactly the keys of `src/assets/i18n/en/lang.json`, no more and no fewer.
- Each content list in `src/assets/json/hi/` has as many items as its English twin in `src/assets/json/en/`.
- Every project has its card and screenshot image, an `https://` link, and tag icons that resolve.
- Every job has its logo and an `https://` link; every skill has its SVG icon.
- Every social link has an `https://` URL whose domain has a brand icon in `src/icons.ts`.
- Every nav item points at a section that exists on the home page.

The file-to-image conventions behind these checks are in [[data/model]].

## Where it is enforced

`src/__tests__/content.spec.ts`, which runs for every locale in `content` (`src/content.ts`) as part of `npm test`, and so in CI ([[quality/ci]]).

The nav-item check compares against a list of section ids written in that test, not against `src/views/HomeView.vue`: a new home page section must be added to that list too, and a section renamed on the page is not caught.

## Sources

- `src/__tests__/content.spec.ts`
- `src/content.ts`
- `src/icons.ts`
- `src/assets/i18n/en/lang.json`
- `src/assets/i18n/hi/lang.json`
- `src/views/HomeView.vue`
