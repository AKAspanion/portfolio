---
type: Runbook
title: CI and deploys
description: GitHub Actions — checks and e2e on every pull request, the full suite then a Firebase deploy on every push to master, CodeQL, and Dependabot.
generated: { by: claude-opus-5-5/ga-2.15.0, at: 2026-11-02T19:13:09Z }
verified: human:ankitp@geekyants.com
---

# CI and deploys

## Pipelines

- **`.github/workflows/ci.yml`** — on every pull request, and called by the deploy workflow. Both jobs set up pnpm with `pnpm/action-setup` (the version comes from `packageManager`) and install with `pnpm install --frozen-lockfile` ([[decisions/pnpm]]). Job `checks`: install, lint, type-check, unit tests, a production build, and `pnpm audit --prod` of runtime dependencies. Job `e2e`: builds with the AdSense id and runs Playwright, uploading the report on failure.
- **`.github/workflows/deploy.yml`** — on every push to `master`, or run by hand. Runs `ci.yml` in full, then builds and deploys to Firebase Hosting's live channel in the `production` environment. Only one deploy runs at a time.
- **`.github/workflows/codeql.yml`** — CodeQL for JavaScript/TypeScript and for the workflows themselves, on pull requests, pushes to `master` and weekly.
- **`.github/dependabot.yml`** — weekly, grouped update PRs for npm (the ecosystem name Dependabot uses for pnpm projects too; dev and runtime separately) and for GitHub Actions. Major updates of `typescript` and `@types/node` are ignored; the comments there say why (typescript-eslint's supported range, and staying on the Node LTS in `.nvmrc`).

The `README.md` says this layout matches the author's flash-cards repository.

## Gates

- Every pull request runs `checks`, `e2e` and CodeQL. Whether they are required to merge is a branch-protection setting on GitHub, not in the repository.
- A deploy needs the whole of `ci.yml` to pass first (`needs: ci`).
- The deploy job checks for `VITE_ADSENSE_CLIENT`, `FIREBASE_PROJECT_ID` and the `FIREBASE_SERVICE_ACCOUNT` secret before building, and fails naming any that is missing ([[operations/environment]], [[decisions/adsense-required-for-deploy]]).
- Workflows run with `contents: read` (CodeQL's job adds `security-events: write`), check out without persisting credentials, and pin every action to a commit SHA.

## History

- 2026-11-04: was npm (`npm ci`, `npm audit`); now pnpm with a frozen lockfile, because the project switched package manager. See [[decisions/pnpm]].

## Sources

- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/codeql.yml`
- `.github/dependabot.yml`
- `README.md`
