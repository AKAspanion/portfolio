# Privacy Policy Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: the project's workflow policy names the executor (`run.executor`): ga:implement-with-subagents by default, or ga:implement. Follow the policy and this plan's Checkpoints. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an English and Hindi privacy policy at `/privacy`, unlinked from the site, for Google's AdSense consent message to point to.

**Architecture:** A new lazy-loaded route and view, `src/views/PrivacyPolicy.vue`, built the way `src/views/NotFound.vue` is. While shown, it sets the page's canonical link and title, and restores them on leave. Its text lives under a `privacy` key in both `lang.json` files; URLs and the contact email stay in code. `public/sitemap.xml` lists the page.

**Tech Stack:** Vue 3 (`<script setup lang="ts">`), Vue Router, vue-i18n (composition mode), Vuetify, Pinia; Vitest with jsdom and `mountWithApp` from `src/test/mount.ts`; Playwright with axe (`e2e/site.spec.ts`); GitHub Actions CI (`.github/workflows/ci.yml`).

**Spec:** `docs/specs/2026-11-03-privacy-policy.md`

## Global Constraints

- The page is "not linked from anywhere on the site": no link to `/privacy` in `HomeView.vue`, `NavMenu.vue`, `NotFound.vue` or any component.
- The policy text is in English and Hindi. `src/assets/i18n/hi/lang.json` has exactly the `privacy` keys of `src/assets/i18n/en/lang.json` (enforced by `src/__tests__/content.spec.ts`).
- No URL and no email address inside a translation string. vue-i18n reads `@` and `{ }` as message syntax, so the view supplies them as constants or `{placeholder}` values.
- The page never calls `loadAds()`, and adds no `robots` meta: it is meant to be indexed.
- External links open in a new tab with `rel="noopener noreferrer"` and announce it with the `a11y.new-tab` text (`knowledge/design-system/accessibility.md`).

## Checkpoints

None (`run.checkpoints: none`). The run stops only where the developer names a stop.

---

### Task 1: The `/privacy` page

**Files:**

- Create: `src/views/PrivacyPolicy.vue`
- Create: `src/views/__tests__/PrivacyPolicy.spec.ts`
- Modify: `src/router/index.ts` (add the route before the catch-all)
- Modify: `src/__tests__/router.spec.ts`
- Modify: `src/content.ts` (add `CONTACT_EMAIL`)
- Modify: `src/views/HomeView.vue` (use `CONTACT_EMAIL` instead of its local `EMAIL`)
- Modify: `src/assets/i18n/en/lang.json`
- Modify: `src/assets/i18n/hi/lang.json`

**Interfaces:**

- Consumes: existing `useUiStore()` (`src/stores/ui.ts`), existing `mountWithApp()` (`src/test/mount.ts`), existing `routes` and `legacyPaths` (`src/router/index.ts`).
- Produces: the `privacy` route, the `CONTACT_EMAIL` export, and the `privacy` message keys.

```ts
// src/content.ts
export const CONTACT_EMAIL: string; // 'panditankit1995@gmail.com', moved from HomeView.vue's EMAIL

// src/router/index.ts — new entry in `routes`, before '/:pathMatch(.*)*'
// { path: '/privacy', name: 'privacy', component: () => import('@/views/PrivacyPolicy.vue') }
```

Message keys, the same in both files. Values are prose, so no email or URL goes in them:

```json
{
  "privacy": {
    "title": "",
    "page-title": "",
    "updated": "… {date}",
    "back": "",
    "sections": {
      "who": { "title": "", "body": "… {email} …" },
      "stored": { "title": "", "body": "" },
      "ads": { "title": "", "body": "" },
      "fonts": { "title": "", "body": "" },
      "hosting": { "title": "", "body": "" },
      "rights": { "title": "", "body": "… {email} …" },
      "changes": { "title": "", "body": "" }
    },
    "links": { "google-partner-sites": "", "google-ad-settings": "" }
  }
}
```

Constants inside `PrivacyPolicy.vue`:

- `CANONICAL_URL = 'https://spanion.in/privacy'`
- `UPDATED = '2026-11-03'`, formatted with `Intl.DateTimeFormat` in the current locale
- `GOOGLE_PARTNER_SITES = 'https://policies.google.com/technologies/partner-sites'`
- `GOOGLE_AD_SETTINGS = 'https://myadcenter.google.com/'`

**Spec:**

- Design, Route: "`src/router/index.ts` gains `{ path: '/privacy', name: 'privacy', component: () => import('@/views/PrivacyPolicy.vue') }`, before the catch-all."
- Design, View: "It follows `NotFound.vue`: a `<main>` with the same themed background, the text, and a link back to `/`. On mount it sets `ui.loaded`"
- Design, Head: "The canonical link points at `https://spanion.in/privacy`."
- Design, Head: "`document.title` becomes the translated "Privacy policy — Ankit Kumar Pandit"."
- Design, Head: "No `noindex`: the page should be indexed."
- Design, Ads: "The page never calls `loadAds()`."
- Design, Text: "Who runs the site, and how to contact them (email)."
- Design, Text: "What the site itself stores: the `dark` and `lang` preferences in localStorage, and `chunk-reload` in sessionStorage. There are no accounts, forms or analytics of its own."
- Design, Text: "Google AdSense: cookies and identifiers for showing and measuring ads, personalised or not; the consent message for visitors in the EEA, the UK and Switzerland; links to Google's "How Google uses information from sites that use our services" page and to Google's ad settings."
- Design, Text: "Google Fonts: loading them sends the visitor's IP address to Google."
- Design, Text: "Hosting: Firebase Hosting (Google) handles each request and may log it."
- Design, Text: "Your choices and rights: clearing site data, Google's ad settings, and asking about or deleting data by email."
- Design, Text: "Changes to the policy, with a "last updated" date set as a constant in the view and formatted per locale."
- Design, Contact email: "The `EMAIL` constant moves from `HomeView.vue` to one shared export, used by both pages."

**Tags:** `screen`, `security` (the policy states how visitors' personal data and browser storage are handled; it must match `knowledge/security/data-protection.md` exactly). No approved design exists (`steps.design` is off), so there is nothing to compare against visually.

**Knowledge:**

- `features/privacy-policy`: `/privacy` shows the privacy policy in English and Hindi, unlinked from the site; while shown, it sets the canonical link to `https://spanion.in/privacy` and its own title, and requests no ads.
- `features/not-found-and-redirects`: `/privacy` is a real route, so it never reaches the 404 catch-all.
- `security/data-protection`: the site's privacy policy is at `/privacy`.
- `risks/debt`: the contact email is a single `CONTACT_EMAIL` export in `src/content.ts`; the "Contact email in code" item no longer applies to `HomeView.vue`.
- `data/model`: `CONTACT_EMAIL` in `src/content.ts` is the contact address used by the home page and the privacy policy.

**Acceptance:**

- Given the router, when `/privacy` is pushed, then the current route's name is `privacy` and its path is `/privacy` (in `src/__tests__/router.spec.ts`).
- Given the router, when `/privacy/extra` is pushed, then the route is `not-found`.
- Given the page mounted at `/privacy` in English, then it shows an `h1` reading "Privacy policy" and an `h2` for each of the seven sections.
- Given the page mounted, then it has exactly one `a[href="mailto:panditankit1995@gmail.com"]`, and the email address appears in the "who" section text.
- Given `<head>` holds `<link rel="canonical" href="https://spanion.in/">`, when the page mounts, then that link's `href` is `https://spanion.in/privacy`; when it unmounts, then it is `https://spanion.in/` again.
- Given `document.title` is "Ankit Kumar Pandit — Software Engineer", when the page mounts, then the title is "Privacy policy — Ankit Kumar Pandit"; when it unmounts, then it is "Ankit Kumar Pandit — Software Engineer" again.
- Given `<head>` has no canonical link, when the page mounts and unmounts, then nothing throws and no canonical link is left behind.
- Given the page mounted, then `head` has no `meta[name="robots"]`.
- Given the page mounted, then `useUiStore().loaded` is `true`.
- Given `@/util/ads` is mocked, when the page mounts, then `loadAds` is never called.
- Given the page mounted, then every `a[target="_blank"]` has `rel` containing `noopener` and an `https://` `href`, and the two Google links point at `GOOGLE_PARTNER_SITES` and `GOOGLE_AD_SETTINGS`.
- Given the page mounted, then it has an `a[href="/"]` showing the `privacy.back` text.
- Given the page mounted, then it shows the "last updated" line with the year 2026.
- Given the home page mounted, then its contact link is still `mailto:panditankit1995@gmail.com` (the move to `CONTACT_EMAIL` changes nothing visible).
- Given both locales, then `src/__tests__/content.spec.ts` still passes: Hindi has every `privacy` key English has.

- [ ] **Step 1: Write the failing tests** for each Acceptance case: the route cases in `src/__tests__/router.spec.ts`, the page cases in `src/views/__tests__/PrivacyPolicy.spec.ts`, and the home-email case in `src/views/__tests__/HomeView.spec.ts` if the existing cases don't already pin it. Create `src/views/PrivacyPolicy.vue` as an empty `<main>` and add the route first, so the page tests fail on behaviour, not on a missing module.

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run src/__tests__/router.spec.ts src/views/__tests__/PrivacyPolicy.spec.ts`
Expected: FAIL on the assertions (heading, canonical, title, mailto), not on an import error

- [ ] **Step 3: Write the minimal implementation** to the Interfaces: the `CONTACT_EMAIL` export, the `HomeView.vue` change, the `privacy` keys in both `lang.json` files, and the view, until the tests pass

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run src/__tests__/router.spec.ts src/views/__tests__/PrivacyPolicy.spec.ts src/views/__tests__/HomeView.spec.ts src/__tests__/content.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/views/PrivacyPolicy.vue src/views/__tests__/PrivacyPolicy.spec.ts src/router/index.ts src/__tests__/router.spec.ts src/content.ts src/views/HomeView.vue src/assets/i18n/en/lang.json src/assets/i18n/hi/lang.json
git commit -m "Add the /privacy page with the privacy policy in English and Hindi"
```

---

### Task 2: Sitemap and end-to-end check

**Files:**

- Modify: `public/sitemap.xml`
- Modify: `e2e/site.spec.ts`

**Interfaces:**

- Consumes: the `privacy` route and `src/views/PrivacyPolicy.vue` from Task 1; the existing `watch()`, `unexpected()` and `AxeBuilder` use in `e2e/site.spec.ts`.
- Produces: nothing other tasks use.

**Spec:**

- Design, Sitemap: "`public/sitemap.xml` gains `https://spanion.in/privacy`."
- Tests: "one test that loads `/privacy` directly, checks its heading and canonical link, confirms no ad request, and checks `sitemap.xml` lists it. The existing axe test covers only `/`, so this test also runs axe on `/privacy`."

**Tags:** `screen`

**Knowledge:**

- `features/privacy-policy`: `public/sitemap.xml` lists `https://spanion.in/privacy`, which is how search engines find the unlinked page.
- `quality/testing`: `e2e/site.spec.ts` covers `/privacy`: heading, canonical link, no ad request, no serious axe violations, and its sitemap entry.

**Acceptance:**

- Given the production build, when `/privacy` is opened directly, then a heading named "Privacy policy" is visible and `link[rel="canonical"]` has `href` `https://spanion.in/privacy`.
- Given `/privacy` opened and 2 seconds passed, then no request matched the AdSense pattern, and there were no unexpected page errors (`unexpected(errors)` is empty).
- Given `/privacy` opened, then axe finds no `serious` or `critical` violations.
- Given `/privacy` opened, then the page has no `meta[name="robots"]`.
- Given the production build, when `/sitemap.xml` is requested, then it is served as text (not the app shell) and contains `<loc>https://spanion.in/privacy</loc>`.

- [ ] **Step 1: Write the failing tests** for each Acceptance case, as one or more `test(...)` blocks whose names start with "privacy page", in `e2e/site.spec.ts`

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vite build && npx playwright test e2e/site.spec.ts -g "privacy page"`
Expected: FAIL on the sitemap assertion, and on anything Task 1 left out

- [ ] **Step 3: Write the minimal implementation**: add the `<url><loc>https://spanion.in/privacy</loc></url>` entry to `public/sitemap.xml`

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vite build && npx playwright test e2e/site.spec.ts -g "privacy page"`
Expected: PASS on both the desktop and mobile projects

- [ ] **Step 5: Commit**

```bash
git add public/sitemap.xml e2e/site.spec.ts
git commit -m "List /privacy in the sitemap and cover it end to end"
```
