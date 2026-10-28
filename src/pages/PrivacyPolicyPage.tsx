import Markdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { getPrivacyPolicy } from '../content'

export function PrivacyPolicyPage() {
  const { i18n } = useTranslation()
  return <Markdown>{getPrivacyPolicy(i18n.resolvedLanguage)}</Markdown>
}
