---
type: Open Question
title: Must every deploy carry AdSense?
description: deploy.yml refuses to deploy without VITE_ADSENSE_CLIENT, while the README and the build plugin treat it as optional ("leave empty for no ads").
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Must every deploy carry AdSense?

## Question

The "Check deploy configuration" step in `.github/workflows/deploy.yml` fails the deploy when `VITE_ADSENSE_CLIENT` is empty. `README.md` says to leave it empty for no ads, and `build/adsense.ts` and `src/util/ads.ts` both work without it. Is a production deploy without ads meant to be impossible, or should CI allow it?

## Why it matters

Turning ads off — for an AdSense review, a policy problem, or by choice — would today mean editing the workflow, not just clearing a variable. See [[integrations/google-adsense]] and [[quality/ci]].

## Status

Open.

## Sources

- `.github/workflows/deploy.yml`
- `README.md`
- `build/adsense.ts`
- `src/util/ads.ts`
