---
type: Security
title: Data protection
description: The site has no accounts and collects nothing; what it stores in the browser, the HTTP security headers Firebase sends, and how outbound links and URL input are handled.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Data protection

## Sensitive data

- The site has no sign-in, forms or server, and sends nothing about the visitor to an endpoint of its own.
- The site's own code stores only two preferences in localStorage (`dark`, `lang`) and one sessionStorage key (`chunk-reload`) — see [[features/theme-and-language]] and [[features/not-found-and-redirects]].
- Third parties the browser contacts: Google Fonts (`index.html`) and, on the home page, Google AdSense ([[integrations/google-adsense]]). Once AdSense loads, it sets Google's own cookies; the site has no consent banner of its own, because consent is left to Google's consent message — see [[decisions/consent-and-privacy-policy]].
- Ankit's own contact email is in `HomeView.vue` and `SECURITY.md`, and his social profiles in `social.json` and the JSON-LD in `index.html` — public by intent.
- The only build setting, `VITE_ADSENSE_CLIENT`, is a public publisher id, not a secret ([[operations/environment]]). The deploy credential is a GitHub Actions secret ([[quality/ci]]).

## Protections

- **Response headers.** `firebase.json` sends, on every path: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and a `Content-Security-Policy`. The CSP sets `base-uri`, `object-src`, `frame-ancestors`, `form-action` and `upgrade-insecure-requests`; it has no `script-src`, `style-src` or `connect-src`, so it does not limit where scripts load from.
- **Outbound links** that open a new tab use `rel="noopener noreferrer"` (`HoverText.vue`, `SocialLinks.vue`, `HomeView.vue`).
- **URL input.** The location hash is decoded defensively and looked up with `getElementById`, never passed to a selector API (`src/util/sections.ts`).
- **AdSense id** is checked against a pattern at build time before it is written into the page (`CLIENT_PATTERN` in `build/adsense.ts`).
- **Dependencies and code** are scanned by `npm audit` in CI, CodeQL and Dependabot ([[quality/ci]]). Vulnerabilities are reported privately, as `SECURITY.md` says.

## Sources

- `firebase.json`
- `index.html`
- `SECURITY.md`
- `src/util/preferences.ts`
- `src/util/sections.ts`
- `src/router/index.ts`
- `src/components/HoverText.vue`
- `src/components/SocialLinks.vue`
- `src/views/HomeView.vue`
- `build/adsense.ts`
- `.github/workflows/ci.yml`
