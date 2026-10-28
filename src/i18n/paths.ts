// No imports on purpose: scripts/prerender-shells.mjs loads this file directly with Node.

export const LANGS = ['en', 'de'] as const
export type Lang = (typeof LANGS)[number]

export const SITE_URL = 'https://www.zttl.app'

// Every page lives under a language prefix, with a localized slug where it makes sense for SEO.
export const PAGES = {
  home: { en: '/en', de: '/de' },
  privacyPolicy: { en: '/en/privacy-policy', de: '/de/datenschutz' },
} as const

export type PageKey = keyof typeof PAGES
export type PagePath = (typeof PAGES)[PageKey][Lang]

// Maps any language tag (de-AT, en-GB, undefined, ...) to a supported language.
export function toLang(lng: string | undefined): Lang {
  const base = lng?.split('-')[0]
  return LANGS.find((lang) => lang === base) ?? 'en'
}

// The equivalent of `pathname` in another language; falls back to that language's homepage.
export function getAlternatePath(pathname: string, lng: Lang): PagePath {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  for (const paths of Object.values(PAGES)) {
    if (Object.values<string>(paths).includes(normalized)) return paths[lng]
  }
  return PAGES.home[lng]
}

export function getCanonicalUrl(page: PageKey, lng: Lang): string {
  return SITE_URL + PAGES[page][lng]
}

// hreflang alternates for a page, including x-default (English).
export function getAlternates(page: PageKey): { hreflang: string; href: string }[] {
  return [
    ...LANGS.map((lng) => ({ hreflang: lng, href: getCanonicalUrl(page, lng) })),
    { hreflang: 'x-default', href: getCanonicalUrl(page, 'en') },
  ]
}
