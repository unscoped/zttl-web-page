import { createFileRoute, redirect } from '@tanstack/react-router'
import i18n from '../i18n'
import { PAGES, toLang } from '../i18n/paths'

// Legacy language-less URL (also the target of public/privacy-policy.html).
export const Route = createFileRoute('/privacy-policy')({
  beforeLoad: () => {
    throw redirect({ to: PAGES.privacyPolicy[toLang(i18n.resolvedLanguage)], replace: true })
  },
})
