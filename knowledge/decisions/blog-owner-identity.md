---
type: Decision
title: The blog owner is identified by a verified Google email in the security rules
description: Only a verified Google sign-in with the owner's email may read drafts or write posts and images; the email is written into the Firestore and Storage rules, not looked up.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:59:03Z }
---

# The blog owner is identified by a verified Google email in the security rules

## Context

The blog manager is the site's first sign-in ([[decisions/blog-firebase-manager]]). There is exactly one author. Firebase Authentication lets any Google account sign in, so who may write has to be decided in the Firestore and Storage security rules, which are the only boundary — the manager's own "not allowed" screen is a convenience.

## Decision

The owner is the account signed in with the `google.com` provider whose token carries `email == 'panditankit1995@gmail.com'` and `email_verified == true`. That check is written into both the Firestore and the Storage rules. Every other signed-in account is treated like an anonymous visitor.

An email rather than a user id, because it is known before the owner's first sign-in, and it is already public on the site (the contact email in `src/views/HomeView.vue`).

## Consequences

- Changing the owner's account means changing both rules files and redeploying them.
- The manager signs any other account straight back out and says it isn't allowed.

## Sources

- `src/views/HomeView.vue`
- `docs/specs/2026-11-03-blog.md`
