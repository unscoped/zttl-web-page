import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import en from './locales/en.json'

export const resources = {
  en: { translation: en },
  de: { translation: de },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(resources),
    // Map regional codes (de-AT, de-CH, en-GB, ...) to their base language.
    nonExplicitSupportedLngs: true,
    detection: {
      // Only used to pick a language for "/"; on /en and /de the URL decides and is saved here.
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng
}
syncHtmlLang(i18n.resolvedLanguage ?? 'en')
i18n.on('languageChanged', syncHtmlLang)

export default i18n
