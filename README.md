# [spanion.in](https://spanion.in/)

My personal/portfolio website.

See the production site [here](https://spanion.in/).
[_If the above link is broken go [here](https://spanion-portfolio.web.app/)_.]

Built with Vue 3, Vite, Vuetify, Pinia, Vue Router and vue-i18n (English and Hindi), in TypeScript.

## Run locally

Needs Node.js 24 (see `.nvmrc`).

```bash
git clone https://github.com/AKAspanion/portfolio.git
cd portfolio
cp .env.example .env   # then fill in the values
npm install
npm run dev
```

## Configuration

Settings live in `.env`, which is not committed. `.env.example` lists them:

| Variable              | Purpose                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `VITE_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-…`). Adds the AdSense meta tag, generates `ads.txt` and loads ads. Leave empty for no ads. |

## Scripts

| Command              | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Dev server with hot reload                             |
| `npm run build`      | Type-check and build for production into `dist/`       |
| `npm run preview`    | Serve the production build locally                     |
| `npm run lint`       | ESLint and Prettier checks (`npm run format` fixes)    |
| `npm run type-check` | TypeScript checks                                      |
| `npm test`           | Unit and component tests (Vitest)                      |
| `npm run test:e2e`   | End-to-end tests (Playwright) against the build        |
| `npm run deploy`     | Build and deploy to Firebase Hosting from your machine |

Before the first end-to-end run, install the browser: `npx playwright install chromium`.

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on every pull request and push to `master`:

1. Lint, type-check, unit tests and a dependency audit.
2. Production build and Playwright end-to-end tests (desktop and mobile).
3. Pull requests: deploy to a Firebase preview channel and comment the URL on the PR (expires after 7 days, no ads).
4. `master`: deploy to production.

CodeQL scans the code weekly and on every change, and Dependabot opens weekly update PRs.

The workflows need, in the repository settings:

- **Secret** `FIREBASE_SERVICE_ACCOUNT_SPANION_PORTFOLIO`: a Firebase service account key with Hosting deploy rights. `npx firebase-tools init hosting:github` creates it and adds it for you.
- **Variable** `VITE_ADSENSE_CLIENT`: the AdSense publisher ID. Production deploys fail without it, so the site never ships without `ads.txt`.
