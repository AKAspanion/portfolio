---
type: Project Overview
title: Overview
description: spanion.in — Ankit Kumar Pandit's single-page, English/Hindi portfolio site; what it shows and its parts.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Overview

## Purpose

The personal portfolio of Ankit Kumar Pandit, a software engineer, served at spanion.in (the canonical URL is set in `index.html`). Visitors scroll one page that introduces him, then shows his projects, skills, work experience and contact links. The whole site can be read in English or Hindi and in a light or dark theme.

There are no accounts, no forms and no backend: everything shown comes from JSON files in the repository. The site carries Google AdSense ads on the home page once its content is on screen ([[domain/ads-only-with-content]]).

## Applications

- One web app at the repository root, `spanion-portfolio` ([[apps/spanion-portfolio]]): Vue 3 + Vite, built to `dist/` and served by Firebase Hosting ([[integrations/firebase-hosting]]).
- A Vite build plugin, `build/adsense.ts`, that injects the AdSense site tag and writes `ads.txt` and `app-ads.txt` at build time ([[integrations/google-adsense]]).

How the parts fit is in [[project/architecture]]; the content each section shows is described in [[data/model]].

## Open

The questions found while learning the code are answered; see [[decisions/adsense-required-for-deploy]], [[decisions/scoped-component-styles]] and [[decisions/consent-and-privacy-policy]].

## Sources

- `README.md`
- `index.html`
- `build/adsense.ts`
- `package.json`
- `src/views/HomeView.vue`
