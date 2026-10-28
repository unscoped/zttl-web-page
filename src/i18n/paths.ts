export const LANGS = ['en'] as const
export type Lang = (typeof LANGS)[number]

export const SITE_URL = 'https://www.zttl.app'

// Every page lives under a language prefix, with a localized slug where it makes sense for SEO.
export const PAGES = {
  home: { en: '/en' },
  privacyPolicy: { en: '/en/privacy-policy' },
} as const

export type PageKey = keyof typeof PAGES
export type PagePath = (typeof PAGES)[PageKey][Lang]

// Maps any language tag (de-AT, en-GB, undefined, ...) to a supported language.
export function toLang(lng: string | undefined): Lang {
  const base = lng?.split('-')[0]
  return LANGS.find((lang) => lang === base) ?? 'en'
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
