---
type: Decision
title: Blog posts are managed in a Firebase-backed web manager
description: The blog's posts are written and published in a web manager on the live site, signed in with the owner's Google account only, and stored in Firestore with images in Firebase Storage.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:39:29Z }
---

# Blog posts are managed in a Firebase-backed web manager

## Context

The site owner wants a personal blog (tech, travel, anything) with a manager to write and upload posts, and a public page where anyone reads them. Until now the site has been a static bundle with no backend, accounts or database ([[project/architecture]], [[security/data-protection]]), and all content lives in JSON committed to the repository ([[data/model]]).

Three ways to hold the posts were weighed:

- **Markdown files in the repository**, published by pushing to `master`: fully static and best for search, but no upload screen — the editor and git are the manager.
- **A git-backed web CMS** (Decap or Sveltia) committing Markdown to GitHub: a web editor, but it needs a GitHub OAuth proxy to sign in.
- **A web manager on the live site backed by Firebase**, in the same Firebase project as [[integrations/firebase-hosting]].

## Decision

Posts are written, edited, published and unpublished in a web manager on the live site. The manager is signed in with Google through Firebase Authentication, and only the owner's Google account may write. Posts are stored in Cloud Firestore and their images in Firebase Storage, in the same Firebase project that serves the site. That project is on the Blaze (pay-as-you-go) plan, which Firebase Storage requires for new buckets; a personal blog's use stays within the free quota.

Chosen because the owner wants a manager they can upload from anywhere, phone included, without a commit and a deploy per post.

## Consequences

- This is the site's first runtime backend and first sign-in: Firebase Authentication, Firestore and Storage join Hosting, with security rules that let anyone read published posts and only the owner write.
- Blog content is read at runtime from Firestore, not bundled from JSON, so [[data/model]] no longer describes all of the site's content.
- The privacy and header picture in [[security/data-protection]] changes: the Content-Security-Policy and the list of third parties the browser contacts must allow Firebase.

## Sources

- `firebase.json`
- `.firebaserc`
