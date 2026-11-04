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

| Variable              | Purpose                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-…`). Adds the AdSense meta tag, generates `ads.txt` and `app-ads.txt` (AdMob's, for the Android app) and loads ads. Leave empty for no ads. |

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

GitHub Actions, in the same layout as [flash-cards](https://github.com/AKAspanion/flash-cards):

- **`ci.yml`**: on every pull request, runs lint, type-check, unit tests, the production build and a dependency audit, then the Playwright end-to-end suite.
- **`deploy.yml`**: on every push to `master` (or run by hand), runs the full CI suite and then deploys to Firebase Hosting.
- **`codeql.yml`**: CodeQL code scanning on pull requests, pushes to `master` and weekly.
- **Dependabot**: grouped weekly update PRs for npm packages and GitHub Actions.

Deploys need, under Settings > Secrets and variables > Actions:

| Name                       | Kind     | Value                                                     |
| -------------------------- | -------- | --------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Secret   | JSON key of a service account with Firebase Hosting Admin |
| `FIREBASE_PROJECT_ID`      | Variable | `spanion-portfolio`                                       |
| `VITE_ADSENSE_CLIENT`      | Variable | The AdSense publisher ID (`ca-pub-…`)                     |
| `APP_URL`                  | Variable | Optional: `https://spanion.in`, shown on deployments      |

The deploy job stops with an error naming any setting that is missing.
