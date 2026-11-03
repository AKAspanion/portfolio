---
type: Open Question
title: Does the site need ad consent?
description: AdSense loads on the home page with no cookie-consent banner or consent platform; is one needed for the site's visitors?
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Does the site need ad consent?

## Question

`loadAds()` in `src/util/ads.ts` adds the AdSense script once the home page's content is shown, and nothing in the code asks visitors for consent first. Google normally requires a Google-certified consent management platform for ads served to visitors in the EEA, the UK and Switzerland. Does this site need one, and if so, should ads wait for consent?

## Why it matters

It decides whether ad loading needs a consent step before `loadAds()`, which would change [[domain/ads-only-with-content]] and [[security/data-protection]]. It is a policy and legal question about the site's audience, so the code can't answer it.

## Status

Open.

## Sources

- `src/util/ads.ts`
- `src/views/HomeView.vue`
