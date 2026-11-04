---
type: Business Rule
title: Ads only on screens with content
description: AdSense loads on the home page and on blog pages that show posts, only after their content has rendered — never on the intro, a 404, a redirect, an empty blog list or the blog manager.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:59:03Z }
---

# Ads only on screens with content

## Rule

The AdSense script may be on a page only when that page shows real publisher content. Concretely:

- It is not in `index.html`; it is added at runtime, once.
- It is requested on the home page, after the intro, once the content sections have rendered.
- It is requested on a published blog post once its body has rendered, and on the blog list once it shows at least one post.
- The privacy policy page never requests it; if ads already loaded on the home page, the script stays and the page is not reloaded ([[features/privacy-policy]]).
- The 404 page, an empty blog list and the blog manager never carry it. Because a loaded AdSense script can't be removed (comment in `src/router/index.ts`), any in-app navigation to one of those after ads have loaded does a full reload, so the screen starts clean.
- Builds without `VITE_ADSENSE_CLIENT`, and development builds, load no ads at all.

The reason is in commit `60a055c`, "Fix AdSense 'ads on screens without publisher content' violation", which fixed that violation by keeping ads off the splash, 404 and stub pages. Blog posts are publisher content, so they carry ads; the manager is a private tool, so it never does.

Visitor consent is asked by Google's own consent message, not by the site, so this rule has no consent step: [[decisions/consent-and-privacy-policy]].

## Where it is enforced

- `createAdsLoader()` in `src/util/ads.ts` adds the script at most once, and only when a client id is set and the build is production (`import.meta.env.PROD`).
- `HomeView.vue` calls `loadAds()` in the intro timer, after `nextTick()`.
- `router.afterEach` in `src/router/index.ts` reloads on arriving at a screen that must stay ad-free from another route when `adsLoaded()` is true.
- `build/adsense.ts` emits the verification meta tag, `ads.txt` and `app-ads.txt` only when the client id is set.

How AdSense is configured is in [[integrations/google-adsense]]. The blog's screens are specified in `docs/specs/2026-11-03-blog.md`.

## History

- 2026-11-04: said the build emits the meta tag and `ads.txt`; now it also emits `app-ads.txt`, because AdMob verifies the Android weather app against it. See [Google AdSense](../integrations/google-adsense.md).
- 2026-11-03: said visitor consent was an open question; now Google's consent message handles it and the privacy page requests no ads, because master answered `questions/ad-consent`. See [Consent through Google](../decisions/consent-and-privacy-policy.md).

## Sources

- `src/util/ads.ts`
- `src/views/HomeView.vue`
- `src/router/index.ts`
- `build/adsense.ts`
- `src/util/__tests__/ads.spec.ts`
- `src/views/__tests__/HomeView.spec.ts`
- `e2e/site.spec.ts`
- `docs/specs/2026-11-03-blog.md`

Supersedes [Ads only on screens with content](ads-only-with-content.md): Blog posts and a non-empty blog list now carry ads too; the blog manager never does.
