import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '../../pages/PrivacyPolicyPage'
import { buildHead } from '../../i18n/head'

export const Route = createFileRoute('/de/datenschutz')({
  head: () => buildHead('privacyPolicy', 'de'),
  component: PrivacyPolicyPage,
})
