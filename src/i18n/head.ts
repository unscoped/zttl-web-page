import i18n from 'i18next'
import { getAlternates, getCanonicalUrl, type Lang, type PageKey } from './paths'

// Route `head` option: title, description, canonical and hreflang alternates for a page.
export function buildHead(page: PageKey, lng: Lang) {
  const t = i18n.getFixedT(lng)
  return {
    meta: [
      { title: t(`meta.${page}.title`) },
      { name: 'description', content: t(`meta.${page}.description`) },
    ],
    links: [
      { rel: 'canonical', href: getCanonicalUrl(page, lng) },
      ...getAlternates(page).map(({ hreflang, href }) => ({ rel: 'alternate', hrefLang: hreflang, href })),
    ],
  }
}
