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
`public/CNAME`. The build copies `index.html` to `404.html` so deep links work on Pages, and
`public/privacy-policy.html` redirects the legacy `/privacy-policy.html` URL to `/privacy-policy`.
