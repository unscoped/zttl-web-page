import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../pages/PrivacyPolicyPage'
import { buildHead } from '../../i18n/head'

export const Route = createFileRoute('/en/privacy-policy')({
  head: () => buildHead('privacyPolicy', 'en'),
  component: PrivacyPolicyPage,
})
