---
type: Decision
title: Each blog post is written in one language
description: A post is written once, in English or Hindi, and shown as written whatever the site's language; the blog's own labels still follow the site language.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:59:03Z }
---

# Each blog post is written in one language

## Context

The site is fully bilingual: every UI string and every content list exists in English and Hindi ([[domain/locale-parity]]). Blog posts are personal writing on tech, travel or anything else, and translating each one would double the work of every post.

## Decision

Each post records the one language it is written in (`lang`, `en` or `hi`) and is shown as written, whatever language the visitor has chosen; its `lang` is set on the article element. The blog's labels, buttons and messages are UI strings, so they come from both `lang.json` files as [[domain/locale-parity]] requires.

Posts live in Firestore, not in the JSON content lists, so the item-count parity in [[domain/locale-parity]] doesn't apply to them.

## Consequences

- The blog list shows posts in both languages together, each card marked with its language.

## Sources

- `src/assets/i18n/en/lang.json`
- `src/assets/i18n/hi/lang.json`
- `docs/specs/2026-11-03-blog.md`
