---
type: Decision
title: Blog posts are written in a TipTap editor and stored as JSON
description: Posts are written in a WYSIWYG TipTap editor and saved as its structured JSON, which the public page turns into HTML through the same fixed set of elements — never as stored HTML.
status: draft
work_item: tmp-blog
generated: { by: claude-code/claude-opus-5-5, at: 2026-11-03T04:59:03Z }
---

# Blog posts are written in a TipTap editor and stored as JSON

## Context

The blog needs rich content — headings, links, lists, quotes, code blocks, images with captions, embedded video — written in the web manager ([[decisions/blog-firebase-manager]]). Three ways were weighed: a WYSIWYG TipTap (ProseMirror) editor saving its JSON document; a Markdown editor with live preview, rendered and sanitised on display; and a Quill editor storing HTML, sanitised on display.

## Decision

Posts are written in a TipTap editor and the post body is stored as TipTap's JSON document in the post's `content` field. The public post page builds HTML from that JSON with the same extensions the editor uses, so only the elements the editor allows can appear. Stored HTML is never rendered.

On top of the schema, rendering allows link targets only with the `https:`, `http:` and `mailto:` protocols, and image sources only over `https:`.

Chosen because it gives the owner a familiar "standard blog" editing experience, and structured JSON can't carry a script the way stored HTML or Markdown with raw HTML can.

## Consequences

- TipTap and its extensions become dependencies, loaded only by the blog's routes, never by the home page.
- Changing the set of allowed elements later means the editor and the renderer change together; older posts keep rendering as long as their nodes stay in the schema.

## Sources

- `docs/specs/2026-11-03-blog.md`
