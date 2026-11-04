---
type: Integration
title: Google AdSense
description: Display ads on the home page — the build-time site tag, ads.txt and app-ads.txt from VITE_ADSENSE_CLIENT, and the script loaded on demand at runtime.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Google AdSense

## What it is used for

Showing Google ads on the home page. When ads may appear is a business rule of its own: [[domain/ads-only-with-content]]. Consent is asked by Google's own consent message, set up in the AdSense dashboard: [[decisions/consent-and-privacy-policy]].

## Configuration

- **Publisher id:** `VITE_ADSENSE_CLIENT` ([[operations/environment]]), typed in `env.d.ts`. The comment on `adsense()` in `build/adsense.ts` gives the reason it is an environment variable: so the id lives in `.env` rather than in the repository.
- **Build time** (`build/adsense.ts`, registered in `vite.config.ts`): with the id set, the plugin checks it against `CLIENT_PATTERN`, failing the build if it doesn't match; adds the `google-adsense-account` meta tag to `index.html`; and emits `ads.txt` built by `adsTxt()` from the id and `GOOGLE_TAG_ID`, and `app-ads.txt` with the same line. Without the id it adds nothing: neither file is written.
- **Why `app-ads.txt`:** AdMob verifies the Android app "Beautiful Weather" (`in.spanion.weather`) against `app-ads.txt` at the root of the developer website on its Play listing, `https://spanion.in/`. The AdMob publisher id is the same as the AdSense one, so the file carries the same line as `ads.txt`.
- **Runtime** (`src/util/ads.ts`): `loadAds()` appends the `adsbygoogle.js` script to `<head>` with the id as `client`, once, in production builds only. No ad slots are placed in the markup.
- **In CI** the id comes from the repository variable of the same name; `deploy.yml` refuses to deploy without it ([[quality/ci]], [[decisions/adsense-required-for-deploy]]).

## Failure modes

- **Malformed id** → the build stops with an error naming the value.
- **Id missing** → no meta tag, no `ads.txt`, no `app-ads.txt`, no script; the site works without ads. The e2e ad tests skip themselves.
- **Deploy without the id** drops both files, so AdMob can no longer verify the app; [[decisions/adsense-required-for-deploy]] is what keeps that from shipping.
- **Script blocked** (ad blocker, network) → nothing in the app depends on it; the e2e suite blocks it on purpose and ignores the resulting errors (`unexpected()` in `e2e/site.spec.ts`).

## History

- 2026-11-04: was `ads.txt` only; now `app-ads.txt` is emitted beside it with the same line, because AdMob verifies the Android weather app against `https://spanion.in/app-ads.txt`.

## Sources

- `build/adsense.ts`
- `build/__tests__/adsense.spec.ts`
- `src/util/ads.ts`
- `src/util/__tests__/ads.spec.ts`
- `vite.config.ts`
- `env.d.ts`
- `.env.example`
- `.github/workflows/deploy.yml`
- `e2e/site.spec.ts`
