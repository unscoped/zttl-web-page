import { createFileRoute, redirect } from '@tanstack/react-router'
import i18n from '../i18n'
import { PAGES, toLang } from '../i18n/paths'

// "/" has no content of its own: send visitors to their saved or browser language.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: PAGES.home[toLang(i18n.resolvedLanguage)], replace: true })
  },
})
