# app-ads.txt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: the project's workflow policy names the executor (`run.executor`): ga:implement-with-subagents by default, or ga:implement. Follow the policy and this plan's Checkpoints. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the production build emit `app-ads.txt` at the site root, next to `ads.txt`, so AdMob can verify the
Android app `in.spanion.weather`.

**Architecture:** The existing Vite plugin `adsense()` in `build/adsense.ts` already emits `ads.txt` from
`VITE_ADSENSE_CLIENT` in `generateBundle()`. It emits a second asset, `app-ads.txt`, with the same `adsTxt(client)`
content, under the same condition.

**Tech Stack:** Vue 3 + Vite (TypeScript), Vitest for unit tests, Firebase Hosting, GitHub Actions CI.

**Spec:** `docs/specs/2026-11-04-app-ads-txt.md`

## Global Constraints

- The publisher id is never hard-coded in the repository. It comes only from `VITE_ADSENSE_CLIENT`.
- Both files hold exactly the same line, built by `adsTxt(client)`.

## Checkpoints

None (`run.checkpoints: none`).

---

### Task 1: Emit app-ads.txt beside ads.txt

**Files:**

- Modify: `build/adsense.ts`
- Test: `build/__tests__/adsense.spec.ts`

**Interfaces:**

- Consumes: existing `adsTxt(client: string): string` and `adsense(): Plugin` in `build/adsense.ts`.
- Produces: no new exports. `adsense()`'s `generateBundle()` emits two assets when the id is set:

```ts
{ type: 'asset', fileName: 'ads.txt', source: adsTxt(client) }
{ type: 'asset', fileName: 'app-ads.txt', source: adsTxt(client) }
```

**Spec:**

- What changes: "`generateBundle()` emits `app-ads.txt` beside `ads.txt`, with the same `adsTxt(client)` content."
- What changes: "when it's set, both files are emitted; when it's empty, neither is."
- What changes: "The doc comment on `adsense()` says the file also serves AdMob."

**Knowledge:** `integrations/google-adsense: the build also emits app-ads.txt with the ads.txt line, for AdMob's
verification of the Android app in.spanion.weather`. Under `knowledge.update: after-finish`, the after-finish job writes
this edit and the README's `VITE_ADSENSE_CLIENT` row, not this task.

**Acceptance:**

- Given `VITE_ADSENSE_CLIENT=ca-pub-1234567890123456`, when the plugin's `configResolved` then `generateBundle` run,
  then `emitFile` is called with `ads.txt` and with `app-ads.txt`, each with the source
  `google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n`.
- Given `VITE_ADSENSE_CLIENT` is empty, when the same hooks run, then `emitFile` is never called.

- [ ] **Step 1: Write the failing tests** for each Acceptance case in `build/__tests__/adsense.spec.ts`. Call the
      hooks on the object `adsense()` returns, with a stub `emitFile` as `this` for `generateBundle`

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run build/__tests__/adsense.spec.ts`
Expected: the id-set case FAILS because `app-ads.txt` isn't emitted, and the empty case passes

- [ ] **Step 3: Write the minimal implementation**: emit `app-ads.txt` in `generateBundle()` and update the doc comment
      on `adsense()`

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run build/__tests__/adsense.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add build/adsense.ts build/__tests__/adsense.spec.ts
git commit -m "Emit app-ads.txt beside ads.txt so AdMob can verify the Android weather app."
```
