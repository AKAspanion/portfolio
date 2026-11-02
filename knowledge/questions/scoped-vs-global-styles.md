---
type: Open Question
title: Scoped or global component styles?
description: Five single-file components use a global <style> block and seven use <style scoped>; which should new code follow?
status: draft
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
---

# Scoped or global component styles?

## Question

Which should a new component use: `<style scoped>` or a global `<style>`?

- Global `<style>`: `src/App.vue`, `src/views/NavMenu.vue`, `src/components/CursorAnimated.vue`, `src/components/MenuHamburger.vue`, `src/components/SkewOnHover.vue`.
- `<style scoped>`: `src/views/HomeView.vue`, `src/views/NotFound.vue`, `src/components/HoverText.vue`, `src/components/MaskText.vue`, `src/components/ScrollProgress.vue`, `src/components/SocialLinks.vue`, `src/components/SpanionLogo.vue`.

Some global blocks may be deliberate — `App.vue`'s page-transition classes, or `NavMenu.vue` styling Vuetify's button group inside it — but nothing in the code says so.

## Why it matters

[[project/conventions]] can't state a rule, so reviewers can't check new components against one; and global class names (`.ham`, `.slide-large`) can collide. Tracked in [[risks/debt]].

## Status

Open.

## Sources

- `src/App.vue`
- `src/views/NavMenu.vue`
- `src/views/HomeView.vue`
- `src/views/NotFound.vue`
- `src/components/CursorAnimated.vue`
- `src/components/MenuHamburger.vue`
- `src/components/SkewOnHover.vue`
- `src/components/HoverText.vue`
- `src/components/MaskText.vue`
- `src/components/ScrollProgress.vue`
- `src/components/SocialLinks.vue`
- `src/components/SpanionLogo.vue`
