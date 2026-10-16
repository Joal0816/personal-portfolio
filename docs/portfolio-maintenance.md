# Maintaining the portfolio

All project and certificate content lives in `lib/portfolio-data.ts`.

## Project dates and selected work

Project dates are evidence dates, not claimed completion dates. Eleven projects have a verified repository creation date or a documented showcase date; six have no date and appear last in either sort direction. Each dated project records its ISO date, label, and source. Repository timestamps were checked through GitHub on October 17, 2026. Agap AI uses the IEEE Sumpai event date already recorded on its certificate.

Use `featured: true` for the selected-work shortcuts. These open the project directly without changing the chronological order of the list. `outcome` holds a concise result supported by the existing project description, feature list, or award record. Do not add unsupported metrics.

O.I.N.K.'s source repository is private; its public demo remains available. Agap AI's former repository returns 404 and its source link is omitted. ARUGA's source link now uses `aruga-systems`. Microplastic detection links to Joseph's public `Joal0816/Mp-Detect` repository; its date provenance still records the original research repository. Generic GitHub profile links are labeled as a developer profile rather than project source code.

## Certificates and preview provenance

Startup Basics 101 is the latest certificate. The displayed September 24, 2026 date is the event date printed on the certificate; the document was issued September 25. It appears under Everything and Data & entrepreneurship, with a persistent latest-certificate spotlight.

Every JPEG under `public/certificates/previews/` is a first-page rasterization of the corresponding local PDF in `certifications`. No images were generated or invented. Image certificates use their existing scans. Regenerate PDF previews with Poppler installed:

```sh
node --experimental-strip-types scripts/generate-certificate-previews.mjs
```

The viewer displays a mobile-friendly preview and links directly to the original full-resolution PDF or scan. Original files remain the source of truth.

## Local checks

Use Node 24 and the pinned pnpm version in `package.json`. Production builds use the supported webpack builder, verified locally; Turbopack could not bind its worker port in this environment.

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm test
pnpm run build
pnpm run check:links
pnpm run check:deployment -- https://your-preview-or-production-url
```

The content check verifies dates, provenance, local assets, duplicates, and navigation anchors. The browser suite checks sorting, certificate visibility, keyboard focus, contact behavior, themes, project dialogs, and overflow from 360px phones through tablets. Link checks write `docs/link-check-results.json`. HTTP 401/403/429 and LinkedIn's 999 response mean restricted automated access, not proof of a broken link; network failures are recorded as unverified. The deployment smoke check fails on stale HTML or missing key files.

GitHub Actions verifies frozen dependency installation, content, the production build, types, and browser tests on pushes and pull requests. Run its manual trigger after deployment to check the public domain.

## Why the certificate was absent from production

The October 16 deployments of commit `9b0d979` failed before the build. Vercel reported `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`: the workspace override for `hono: 4.12.25` was missing from `pnpm-lock.yaml`. The lockfile now contains that override, pnpm is pinned to `10.34.7`, and frozen lockfile validation passes.

These changes must be deployed before the public domain shows them. A successful local check cannot certify that an older production deployment contains the new content. After publishing, run `check:deployment` against the domain and use `PORTFOLIO_BASE_URL=https://your-deployment pnpm test` to run browser tests against that deployment if needed.
