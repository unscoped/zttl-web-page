// Runs after `vite build`. GitHub Pages only serves real files with a 200 status, so give every
// localized page its own copy of the app shell with the right <html lang>, <title>, description,
// canonical and hreflang tags already in the HTML, and write the sitemap from the same page list.
// The body is still rendered client-side. Static head tags carry `data-prerender` so the app can
// swap them for the router-managed ones once it has loaded (see src/routes/__root.tsx).
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LANGS, PAGES, SITE_URL, getAlternates, getCanonicalUrl } from '../src/i18n/paths.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const shell = await readFile(join(dist, 'index.html'), 'utf8')
const locales = Object.fromEntries(
  await Promise.all(
    LANGS.map(async (lng) => [
      lng,
      JSON.parse(await readFile(join(root, 'src/i18n/locales', `${lng}.json`), 'utf8')),
    ]),
  ),
)

for (const [page, paths] of Object.entries(PAGES)) {
  for (const lng of LANGS) {
    const { title, description } = locales[lng].meta[page]
    const head = [
      `<title data-prerender>${escapeHtml(title)}</title>`,
      `<meta data-prerender name="description" content="${escapeHtml(description)}">`,
      `<link data-prerender rel="canonical" href="${getCanonicalUrl(page, lng)}">`,
      ...getAlternates(page).map(
        ({ hreflang, href }) => `<link data-prerender rel="alternate" hreflang="${hreflang}" href="${href}">`,
      ),
    ].join('\n    ')

    const html = shell
      .replace('<html lang="en">', `<html lang="${lng}">`)
      .replace('<title data-prerender>zttl</title>', head)
    if (!html.includes('data-prerender rel="canonical"')) throw new Error(`Could not prerender ${paths[lng]}`)

    const file = join(dist, paths[lng], 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
  }
}

const urls = Object.keys(PAGES)
  .flatMap((page) => LANGS.map((lng) => ({ page, lng })))
  .map(({ page, lng }) => {
    const alternates = getAlternates(page)
      .map(({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
      .join('\n')
    return `  <url>\n    <loc>${getCanonicalUrl(page, lng)}</loc>\n${alternates}\n  </url>`
  })
  .join('\n')

await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)
