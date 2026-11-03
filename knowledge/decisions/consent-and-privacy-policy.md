---
type: Decision
title: Consent through Google, privacy policy at /privacy
description: Ad consent is left to Google's own AdSense consent message; the privacy policy it points to lives at /privacy in English and Hindi and is not linked from the site.
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-03T04:35:58Z }
---

# Consent through Google, privacy policy at /privacy

## Context

AdSense loads on the home page with no consent step of the site's own ([[questions/ad-consent]]). AdSense's European regulations message, offered in the AdSense dashboard under Privacy & messaging, shows Google's certified consent message to visitors in the EEA, the UK and Switzerland through the same `adsbygoogle.js` script the site already loads. That message needs a privacy policy URL, and the site had none.

## Decision

- Consent is handled by Google's consent message, configured in the AdSense dashboard. The site builds no consent banner or consent platform of its own, and `loadAds()` gets no consent step.
- The privacy policy is a page of the site at `/privacy`, in English and Hindi like the rest of the site.
- It is not linked from anywhere on the site. Visitors reach it through Google's consent message; search engines through `public/sitemap.xml`.

Decided by the developer with the approved spec `docs/specs/2026-11-03-privacy-policy.md`.

## Consequences

- Whether consent is asked depends on the message being published in the AdSense dashboard, which the repository can't show.
- Visitors outside the EEA, the UK and Switzerland don't see the consent message, so they find the policy only through search. If Google asks for a visible link, a footer link is a small change (the spec's Risks).
- [[domain/ads-only-with-content]] is unchanged: ads still load only on the home page after its content.

## Sources

- `docs/specs/2026-11-03-privacy-policy.md`
- `src/util/ads.ts`
- `public/sitemap.xml`
