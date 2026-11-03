# Privacy policy page

Date: 2026-11-03 · Status: awaiting approval · Path: bounded

## Goal

Publish a privacy policy at `https://spanion.in/privacy`, so that the AdSense European regulations consent message (configured in the AdSense dashboard, see `knowledge/questions/ad-consent.md`) and AdSense's own policies have a privacy policy URL to point to.

## Decided with the developer

- The policy text is in **English and Hindi**, like the rest of the site. The Hindi text is drafted by Claude and checked by the developer before release.
- **No link to it anywhere on the site.** Visitors reach it through Google's consent message, which shows the URL. Search engines find it through `sitemap.xml`.
- No consent banner or consent platform is built here: Google's own consent message, switched on in the AdSense dashboard, does that.

## Design

**Route.** `src/router/index.ts` gains `{ path: '/privacy', name: 'privacy', component: () => import('@/views/PrivacyPolicy.vue') }`, before the catch-all. It is lazy-loaded, like `NotFound`. Firebase's SPA rewrite already serves it.

**View: `src/views/PrivacyPolicy.vue`.** It follows `NotFound.vue`: a `<main>` with the same themed background, the text, and a link back to `/`. On mount it sets `ui.loaded`, so the logo and menu show at once.

**Head, while the page is shown** (restored on leave):

- The canonical link points at `https://spanion.in/privacy`. Today it would say the home page, which tells search engines this page is a copy of it.
- `document.title` becomes the translated "Privacy policy — Ankit Kumar Pandit".
- No `noindex`: the page should be indexed.

**Ads.** The page never calls `loadAds()`. If a visitor arrives in-app after ads loaded on the home page, the script stays, and that is allowed: this page shows real publisher content, which is what `domain/ads-only-with-content` requires. No reload, unlike the 404 page.

**Text.** It lives under a `privacy` key in `src/assets/i18n/en/lang.json` and `src/assets/i18n/hi/lang.json`, so the existing parity test keeps them in step. URLs stay out of the translations: the view supplies them. The sections are:

1. Who runs the site, and how to contact them (email).
2. What the site itself stores: the `dark` and `lang` preferences in localStorage, and `chunk-reload` in sessionStorage. There are no accounts, forms or analytics of its own.
3. Google AdSense: cookies and identifiers for showing and measuring ads, personalised or not; the consent message for visitors in the EEA, the UK and Switzerland; links to Google's "How Google uses information from sites that use our services" page and to Google's ad settings.
4. Google Fonts: loading them sends the visitor's IP address to Google.
5. Hosting: Firebase Hosting (Google) handles each request and may log it.
6. Your choices and rights: clearing site data, Google's ad settings, and asking about or deleting data by email.
7. Changes to the policy, with a "last updated" date set as a constant in the view and formatted per locale.

**Contact email.** The `EMAIL` constant moves from `HomeView.vue` to one shared export, used by both pages. This also clears that item from `knowledge/risks/debt.md`.

**Sitemap.** `public/sitemap.xml` gains `https://spanion.in/privacy`.

## Tests

Tests are written first where they can be:

- `src/__tests__/router.spec.ts`: `/privacy` resolves to the `privacy` route.
- `src/views/__tests__/PrivacyPolicy.spec.ts`: the page renders its heading and a `mailto:` link; it sets the canonical link and title while shown and restores both on unmount; it adds no `robots` meta; it sets `ui.loaded`; it requests no ads.
- `src/__tests__/content.spec.ts`: no change. It already fails if Hindi lacks a `privacy` key English has.
- `e2e/site.spec.ts`: one test that loads `/privacy` directly, checks its heading and canonical link, confirms no ad request, and checks `sitemap.xml` lists it. The existing axe test covers only `/`, so this test also runs axe on `/privacy`.

## Knowledge

- New: `features/privacy-policy`.
- Decision recorded with `ga:remember`: the policy is reached through Google's consent message and the sitemap, not linked on the site.
- Updated:
  - `security/data-protection`, `questions/ad-consent` (the URL now exists; still open until the message is published), `risks/debt` (email item), `features/not-found-and-redirects` (routes list) and `design-system/accessibility` if it changes.
  - Verified concepts that change need your re-review.

## Out of scope

- A consent banner or platform of our own.
- Analytics.
- A cookie table listing Google's individual cookies, which Google changes without notice. The policy links Google's own page instead.

## Risks

- This is not legal advice. Check the text, especially the Hindi, before publishing.
- With no link on the site, visitors outside the EEA, the UK and Switzerland never see Google's consent message, so they only find the policy through search. AdSense's program policies ask for a privacy policy, not for where it is linked. If Google asks for a visible link later, a footer link is a one-line change.
