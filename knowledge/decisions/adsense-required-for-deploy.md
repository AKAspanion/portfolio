---
type: Decision
title: Every deploy carries AdSense
description: A production deploy must have VITE_ADSENSE_CLIENT set; deploy.yml failing without it is intended. Leaving it empty is for local builds only.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-03T04:40:51Z }
---

# Every deploy carries AdSense

## Context

The "Check deploy configuration" step in `.github/workflows/deploy.yml` fails a deploy when `VITE_ADSENSE_CLIENT` is empty, while `README.md`, `build/adsense.ts` and `src/util/ads.ts` all work without it ([[questions/adsense-required-to-deploy]]).

## Decision

`VITE_ADSENSE_CLIENT` must be present for every deploy. The check in `deploy.yml` stays as it is. "Leave empty for no ads" in `README.md` describes local builds, where ads never load anyway ([[operations/run-locally]]).

Decided by the developer, from the ga dashboard, on 2026-11-03.

## Consequences

- Production always ships the AdSense site tag, `ads.txt`, `app-ads.txt` and the on-demand script ([[integrations/google-adsense]]).
- Turning ads off in production means changing this decision and the workflow, not just clearing the variable.

## History

- 2026-11-04: was a deploy carrying `ads.txt`; now it also carries `app-ads.txt`, because the build emits both ([[integrations/google-adsense]]).

## Sources

- `.github/workflows/deploy.yml`
- `README.md`
- `build/adsense.ts`
- `src/util/ads.ts`
