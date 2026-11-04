# app-ads.txt for AdMob

## Why

The Android app "Beautiful Weather" (`in.spanion.weather`) is on Google Play with AdMob banners. Its Play listing gives
`https://spanion.in/` as the developer website. AdMob checks that site for `app-ads.txt` before it serves ads to the
app, and right now it can't find a valid one. `https://spanion.in/app-ads.txt` answers with the SPA's `index.html`
(200, `text/html`), because `firebase.json` rewrites every path with no matching file to `/index.html`.

The AdMob publisher id is the same as the AdSense one (`pub-9381121077394867`), so `app-ads.txt` needs exactly the
line `ads.txt` already has.

## What changes

- `build/adsense.ts`: `generateBundle()` emits `app-ads.txt` beside `ads.txt`, with the same `adsTxt(client)` content.
  Both depend on `VITE_ADSENSE_CLIENT` in the same way: when it's set, both files are emitted; when it's empty, neither
  is. The doc comment on `adsense()` says the file also serves AdMob.
- The id stays in `.env` and in the CI variable, following commit `60a055c`. No static file goes in `public/`.
- Firebase Hosting serves an existing file before it applies rewrites, so `firebase.json` stays as it is.

## Testing

`build/__tests__/adsense.spec.ts` runs the plugin's `configResolved` and `generateBundle` hooks with a stubbed
`emitFile`. With an id set, it expects `ads.txt` and `app-ads.txt` to be emitted with the same line. With no id, it
expects nothing to be emitted. The test is written first and must fail before the code changes. A local `vite build`
with `VITE_ADSENSE_CLIENT` set must put `dist/app-ads.txt` in the output, holding
`google.com, pub-9381121077394867, DIRECT, f08c47fec0942fa0`.

## Knowledge

`integrations/google-adsense` and `README.md` (the `VITE_ADSENSE_CLIENT` row) say the same publisher line also feeds
AdMob's `app-ads.txt`, and why. Under `decisions/adsense-required-for-deploy`, a deploy without the id would drop both
files from the live site.

## Out of scope

Deploying. `npm run deploy` or a push to `master` publishes the site, and that waits for the developer. After the
deploy, the developer clicks "Check for updates" on AdMob's app-ads.txt page.
