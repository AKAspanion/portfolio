---
type: Decision
title: pnpm is the package manager
description: The project installs and runs scripts with pnpm, locally and in CI and deploys, at the version pinned by packageManager; the dependency overrides live in pnpm-workspace.yaml.
status: draft
work_item: tmp-pnpm
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-04T17:35:51Z }
---

# pnpm is the package manager

## Context

The project used npm, with `package-lock.json`. The developer replaced the lockfile with `pnpm-lock.yaml` and pinned pnpm through `packageManager` in `package.json`, but CI and the deploy still ran `npm ci`, which needs the npm lockfile.

pnpm doesn't read npm's top-level `overrides` field in `package.json`. After the switch, the lockfile resolved `minimatch` and `glob` below the versions those overrides pin. The pins came in with the Vue 3 migration, and no reason for them was recorded.

## Decision

- pnpm installs dependencies and runs scripts everywhere: on a developer machine, in `ci.yml` and in `deploy.yml`. Its version is whatever `packageManager` in `package.json` says. In CI, `pnpm/action-setup` reads that field, and `actions/setup-node` caches pnpm's store.
- CI installs with `pnpm install --frozen-lockfile`, so a `package.json` change without a lockfile change fails the build, as `npm ci` did.
- The overrides are kept, moved to `overrides:` in `pnpm-workspace.yaml`, which is where pnpm reads them: `minimatch: ^11.0.4` and `glob: ^14.0.3`.
- Dependabot keeps `package-ecosystem: npm`, the ecosystem name it uses for pnpm projects too.

Decided by the developer, in chat, on 2026-11-04.

## Consequences

- Commands in the README, the ga check commands (`.ga/config.json`) and the runbooks use `pnpm` and `pnpm exec`, not `npm` and `npx`.
- The runtime audit in CI is `pnpm audit --prod --audit-level moderate`.

## Sources

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/dependabot.yml`
- `.ga/config.json`
