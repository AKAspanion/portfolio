---
type: Feature
title: Privacy policy page
description: The privacy policy at /privacy in English and Hindi, unlinked from the site and listed in the sitemap; while shown it names itself as canonical and requests no ads.
status: draft
generated: { by: claude-code/claude-sonnet-5-5, at: 2026-11-03T04:47:01Z }
---

# Privacy policy page

## What it does

`/privacy` shows the site's privacy policy in the visitor's language (English or Hindi, [[features/theme-and-language]]). It says who runs the site and how to write to them, what the site itself stores in the browser, what Google AdSense, Google Fonts and Firebase Hosting do with visitors' data, and how a visitor can control or ask about it. It exists so that Google's AdSense consent message has a policy URL to point to — [[decisions/consent-and-privacy-policy]].

## Screens and routes

- Route `privacy` at `/privacy` in `src/router/index.ts`, lazy-loading `src/views/PrivacyPolicy.vue`. It is a real route, so it never reaches the 404 catch-all ([[features/not-found-and-redirects]]); a path below it, such as `/privacy/extra`, still does.
- The page is a themed `<main>` with the seven sections, then a link back to `/`.
- The text is under the `privacy` key of `src/assets/i18n/en/lang.json` and `src/assets/i18n/hi/lang.json`, so the locale parity test covers it ([[domain/locale-parity]]).

## Rules

- **Not linked from the site.** Visitors reach it through Google's consent message; search engines through `public/sitemap.xml`, which lists `https://spanion.in/privacy`.
- **Indexable, with its own canonical link.** Firebase serves the same `index.html` for every path, so while the page is shown it sets the canonical link to `https://spanion.in/privacy` (`CANONICAL_URL`), and puts it back when it leaves. It adds no `robots` meta, unlike the 404 page.
- **Its own title.** `document.title` is the translated `privacy.page-title` while shown, and the previous title is restored when it leaves.
- **No ads requested.** The page never calls `loadAds()`; ads stay on the home page only ([[domain/ads-only-with-content]]). If ads already loaded on the home page, the script stays and the page is not reloaded.
- **Controls shown at once.** It sets `ui.loaded` on mount, so the logo and menu button appear without the home page's intro.
- **Contact email.** The address is `CONTACT_EMAIL` from `src/content.ts`, the same one the home page shows ([[data/model]]).
- **Last updated.** The date shown is the `UPDATED` constant in `PrivacyPolicy.vue`, formatted for the locale; it is edited by hand with every change to the text.
- **Must match what the site does.** What the policy says about browser storage and third parties has to agree with [[security/data-protection]].

## Tests

`src/views/__tests__/PrivacyPolicy.spec.ts` and `src/__tests__/router.spec.ts` cover the route, heading, `mailto:` link, canonical link and title while shown and restored, no `robots` meta and no ads. `e2e/site.spec.ts` opens `/privacy` directly, checks the heading, canonical link, no ad request and no serious axe violations, and checks the sitemap entry ([[quality/testing]]).

## History

- 2026-11-03: added, with the consent decision it carries out.

## Sources

- `src/views/PrivacyPolicy.vue`
- `src/router/index.ts`
- `src/content.ts`
- `src/assets/i18n/en/lang.json`
- `src/assets/i18n/hi/lang.json`
- `public/sitemap.xml`
- `src/views/__tests__/PrivacyPolicy.spec.ts`
- `src/__tests__/router.spec.ts`
- `e2e/site.spec.ts`
- `docs/specs/2026-11-03-privacy-policy.md`
