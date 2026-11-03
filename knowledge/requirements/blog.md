---
type: Requirement
title: Personal blog
description: A public blog at /blog — a list and a page per post — and a Google-signed-in manager at /blog/manage where the owner writes, publishes and deletes posts with images.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:59:03Z }
---

# Personal blog

## What must hold

- **Readers.** Anyone can read published posts at `/blog` (newest first, filterable by tag, 10 at a time) and `/blog/:slug`. A draft or an unknown slug shows the noindex 404 page.
- **One author.** Only the owner ([[decisions/blog-owner-identity]]) can see drafts or write. Other accounts are signed straight back out.
- **Posts.** Each has a title, slug, excerpt, cover image with alt text, tags, a language ([[decisions/blog-posts-single-language]]), a rich body ([[decisions/blog-editor-json]]), a status of draft or published, and its created, updated and published times.
- **Stable links.** A slug can change until the post is first published, then it is locked. Slugs are unique, and `manage` is reserved.
- **Images.** Resized in the browser to at most `2000` px wide and converted to WebP before upload; Storage refuses anything that isn't an image or is over `MAX_IMAGE_MB = 10`. Deleting a post deletes its images.
- **Ads.** Blog pages follow [[domain/ads-on-content-pages]]; the manager never carries ads.
- **Privacy policy.** [[features/privacy-policy]] names the blog's ads, its Firestore and Storage hosting, the owner-only sign-in and what Firebase keeps in a visitor's browser.
- **SEO.** Every public blog URL carries its own title, description, canonical link, share-preview tags and structured data in the HTML crawlers receive; a missing post answers `404`; `/sitemap.xml` (planned) lists every published post and `/blog/rss.xml` (planned) the latest 20 ([[decisions/blog-seo-function]]). A post may set an SEO title of at most `70` characters and an SEO description of at most `160`.
- **Speed.** Firebase and the editor load only on the blog's routes, never on the home page.

## Out of scope for the first version

Comments, scheduled publishing, search and multiple authors.

## History

- 2026-11-03: left per-post share previews, a per-post sitemap and RSS out of scope; now they are required, because the owner asked for every SEO feature. See [decisions/blog-seo-function](../decisions/blog-seo-function.md).

## Sources

- `docs/specs/2026-11-03-blog.md`
