# zttl-web-page
Web page for the Zttl app.

Vite + React + TypeScript, routed with TanStack Router (file-based, `src/routes/`).

## Development
```sh
npm install
npm run dev      # dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve dist/
```

## Deployment
Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`
(repo Settings → Pages → Source must be "GitHub Actions"). The custom domain comes from
`public/CNAME`. After `vite build`, `scripts/prerender-shells.mjs` writes a copy of the app shell
for every localized URL (`dist/en/index.html`, `dist/de/datenschutz/index.html`, ...) with the right
`lang`, title, description, canonical and hreflang tags, so crawlers get a 200 response and correct
metadata, and generates `dist/sitemap.xml`. `index.html` is also copied to `404.html` so unknown URLs
and the language-less `/` and `/privacy-policy` still load the app (which redirects them).
`public/privacy-policy.html` redirects the legacy `/privacy-policy.html` URL to `/privacy-policy`.

## URLs
Every page lives under a language prefix, with a localized slug where useful:

| Page | English | German |
| --- | --- | --- |
| Home | `/en` | `/de` |
| Privacy policy | `/en/privacy-policy` | `/de/datenschutz` |

`src/i18n/paths.ts` is the single list of these paths (used by the routes, the language switcher,
the head tags and the build script). Routes live in `src/routes/en/` and `src/routes/de/`; page
bodies are shared in `src/pages/`. To add a page, add it to `PAGES`, add `meta.<page>` strings to
both locale files and add a route file per language.

## Content and i18n
The privacy policy is plain Markdown, one file per language: `src/content/privacy-policy.<lng>.md`.
Short UI strings live in `src/i18n/locales/<lng>.json`. To add a language, add both files and
register the JSON in `src/i18n/index.ts` (`resources`).

On `/en` and `/de` the URL decides the language and saves it (localStorage `i18nextLng`). The
language-less `/` redirects to the saved choice, then the browser / device language. Regional codes
(`de-AT`) map to the base language; unsupported languages fall back to English. The language
switcher navigates to the same page in the other language.

The **German privacy policy is the legally binding version**; the English one is a courtesy
translation. Keep both files in sync (same section numbering) whenever either one changes.
