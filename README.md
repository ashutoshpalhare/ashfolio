# Ashfolio

Personal portfolio of **Ashutosh Palhare**, built with Next.js, React, TypeScript, and Tailwind CSS.

Live site: https://ashutoshpalhare.github.io/ashfolio/

## Overview

Ashfolio is a statically exported portfolio deployed to GitHub Pages. The site is built with the Next.js App Router and uses client-side React components for its interactive portfolio experience.

## Tech stack

- Next.js 16 (App Router, static export)
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- GitHub Actions and GitHub Pages

## Requirements

- Node.js 22 (the repository includes an `.nvmrc`)
- npm

## Getting started

```bash
git clone https://github.com/ashutoshpalhare/ashfolio.git
cd ashfolio
npm ci
npm run dev
```

Open http://localhost:3000 to view the development site.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run build` | Build the production/static-export output |
| `npm run test:a11y` | Run Playwright and axe accessibility checks against the static export |
| `npm start` | Start the Next.js production server (for a non-static deployment) |

## Project structure

```text
.github/workflows/   GitHub Actions CI and Pages deployment
public/              Static public assets
src/app/             App Router layout, page, metadata routes and styles
src/components/      Portfolio UI
src/data/            Portfolio content and profile data
next.config.ts       Static export and GitHub Pages path configuration
```

## Quality checks

Before proposing changes, run:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Pull requests targeting `main` run the CI workflow, which installs from the lockfile and checks linting, types, and the production build.

## Deployment

The site is deployed automatically to GitHub Pages when changes are pushed to `main`. The workflow:

1. Checks out the repository and sets up Node.js 22.
2. Installs the exact dependency versions with `npm ci`.
3. Runs ESLint and TypeScript checks.
4. Builds the Next.js static export into `out/`.
5. Uploads and deploys the Pages artifact.

The Next.js configuration detects GitHub Actions and derives the project-site base path (`/ashfolio`) from the repository name. For local development, that GitHub Pages base path is not applied.

GitHub Pages must be configured to use **GitHub Actions** as its build and deployment source.

## Contact form behavior

The contact form currently prepares an email and opens the visitor's configured email application using a `mailto:` link. It does **not** submit to a server or persist messages.

## License

No license file is currently provided. Unless a license is added, the repository's contents are not granted an explicit open-source reuse license.
