---
type: Business Rule
title: Ads only on screens with content
description: AdSense is loaded only on the home page after its content has rendered, never on the intro, a 404 or a redirect — to meet AdSense's publisher-content policy.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
superseded_by: domain/ads-on-content-pages
status: superseded
---

# Ads only on screens with content

## Rule

The AdSense script may be on a page only when that page shows real publisher content. Concretely:

- It is not in `index.html`; it is added at runtime, once.
- It is requested only on the home page, after the intro, once the content sections have rendered.
- The 404 page never carries it. Because a loaded AdSense script can't be removed (comment in `src/router/index.ts`), any in-app navigation to a 404 after ads have loaded — such as browser Back from the home page — does a full reload, so the 404 starts clean.
- Builds without `VITE_ADSENSE_CLIENT`, and development builds, load no ads at all.

The reason is in commit `60a055c`, "Fix AdSense 'ads on screens without publisher content' violation", which fixed that violation by keeping ads off the splash, 404 and stub pages.

Whether ads must also wait for visitor consent is open: [[questions/ad-consent]].

## Where it is enforced

- `createAdsLoader()` in `src/util/ads.ts` adds the script at most once, and only when a client id is set and the build is production (`import.meta.env.PROD`).
- `HomeView.vue` calls `loadAds()` in the intro timer, after `nextTick()`.
- `router.afterEach` in `src/router/index.ts` reloads on arriving at `not-found` from another route when `adsLoaded()` is true.
- `build/adsense.ts` emits the verification meta tag and `ads.txt` only when the client id is set.
- Tests: `src/util/__tests__/ads.spec.ts`, `src/views/__tests__/HomeView.spec.ts`, and the ad tests in `e2e/site.spec.ts`, which skip when the build has no client id.

How AdSense is configured is in [[integrations/google-adsense]].

## Sources

- `src/util/ads.ts`
- `src/views/HomeView.vue`
- `src/router/index.ts`
- `build/adsense.ts`
- `src/util/__tests__/ads.spec.ts`
- `src/views/__tests__/HomeView.spec.ts`
- `e2e/site.spec.ts`
