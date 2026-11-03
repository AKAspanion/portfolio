---
type: Data Model
title: Content model
description: The portfolio's content — projects, experience, skills, nav items and social links — typed in src/content.ts and stored as JSON per locale, with images found by basename.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# Content model

There is no database. All content is JSON committed under `src/assets/json/<locale>/`, typed by the interfaces in `src/content.ts` and bundled at build time. Editing the portfolio means editing these files (in both locales — [[domain/locale-parity]]).

## Entities

| Entity         | Interface                          | File per locale   | Shown in                                  |
| -------------- | ---------------------------------- | ----------------- | ----------------------------------------- |
| Project        | `Project` (with `ProjectTag` tags) | `projects.json`   | Projects section                          |
| Job            | `Experience`                       | `experience.json` | Experience section                        |
| Skill          | `Skill`                            | `skills.json`     | Skills section                            |
| Menu item      | `NavItem`                          | `nav.json`        | `NavMenu`                                 |
| Social profile | `SocialLink`                       | `social.json`     | Contact section, `SocialLinks`, `NavMenu` |

`content` in `src/content.ts` maps each `Locale` (`en`, `hi`, from `src/plugins/i18n.ts`) to a `Content` object holding all five lists; `useContent()` returns the current locale's, falling back to English.

## Relations

No entity refers to another. Each refers to files in `public/`:

- `Project.img` is the basename of `public/images/<img>.webp` (the card) and `public/images/ss/<img>.webp` (the screenshot shown in the cursor tooltip).
- `Experience.img` is the basename of a company logo in `public/images/`.
- `Skill.icon` is the basename of `public/images/icons/<icon>.svg`; `Skill.top` gives the card a different accent colour in `HomeView.vue`.
- `ProjectTag.icon` is an MDI name listed in `projectIcons` in `src/icons.ts`, or a raw SVG path starting with `M`.
- `SocialLink.url`'s domain picks its icon and brand colour through `socialBrand()` in `src/icons.ts` — names are translated, so the URL is the key.
- `NavItem.domId` is the `id` of a `<section>` in `HomeView.vue`.

`CONTACT_EMAIL` in `src/content.ts` is not part of the JSON: it is the contact address used by the home page and the privacy policy ([[features/privacy-policy]]).

`src/__tests__/content.spec.ts` checks every one of these references.

## History

- 2026-11-03: `CONTACT_EMAIL` added to `src/content.ts` as the contact address shared by the home page and the privacy policy.

## Sources

- `src/content.ts`
- `src/icons.ts`
- `src/plugins/i18n.ts`
- `src/views/HomeView.vue`
- `src/assets/json/en/projects.json`
- `src/assets/json/en/experience.json`
- `src/assets/json/en/skills.json`
- `src/assets/json/en/nav.json`
- `src/assets/json/en/social.json`
- `src/__tests__/content.spec.ts`
