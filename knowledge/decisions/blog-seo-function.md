---
type: Decision
title: A Cloud Function serves the blog's public pages to crawlers and link previews
description: /blog, /blog/:slug, /sitemap.xml and /blog/rss.xml go through a Cloud Function that fills the site's index.html with each page's tags, structured data and article, so bots that don't run JavaScript see real content.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T05:27:28Z }
---

# A Cloud Function serves the blog's public pages to crawlers and link previews

## Context

The site is a single-page app: every path returns the same `index.html`, whose head describes the home page. Google runs JavaScript, so it can read tags set in the browser. Link-preview bots (WhatsApp, X, LinkedIn, Slack) and Bing's first pass don't, so a shared post would show the home page's title and image. The owner asked for the blog to have every SEO feature: per-post previews, structured data, a sitemap with posts, a feed, robots rules and canonical links.

Three ways were weighed: a Cloud Function behind Hosting for the blog's public URLs; prerendering static HTML on publish through a GitHub Action, which needs a token reachable from the manager and adds minutes per publish; and tags set only in the browser, which leaves previews broken.

## Decision

A 2nd-gen HTTPS Cloud Function, `seo`, in `asia-south1` beside Firestore, answers `/blog`, `/blog/:slug`, `/sitemap.xml` (planned) and `/blog/rss.xml` (planned) through Hosting rewrites. It fetches the live `index.html`, replaces the block between `<!-- seo:start -->` and `<!-- seo:end -->` with the page's own title, description, canonical link, Open Graph and Twitter tags and JSON-LD, and for a post also places the rendered article and the post's data in the page. A missing post answers a real `404`. The sitemap and the RSS feed are generated from published posts. Responses are cached at Hosting's edge for `s-maxage=600`.

Chosen because it is the only option that gives every crawler and preview bot the right content on first request without a rebuild per post, and the project is already on the Blaze plan ([[decisions/blog-firebase-manager]]).

## Consequences

- The site gains server code: a `functions/` package, deployed with the site.
- The function reads Firestore with admin rights, which bypass the security rules, so it must filter on `status == 'published'` itself.
- Hand-written `public/sitemap.xml` goes: Hosting serves a real file before any rewrite, so it would hide the generated one.
- A new post reaches crawlers within the edge cache's ten minutes.

## Sources

- `docs/specs/2026-11-03-blog.md`
- `index.html`
- `firebase.json`
