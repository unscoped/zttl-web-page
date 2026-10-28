import { createFileRoute } from '@tanstack/react-router'
import { LanguageLayout } from '../../components/LanguageLayout'
import i18n from '../../i18n'

export const Route = createFileRoute('/de')({
  beforeLoad: () => i18n.changeLanguage('de'),
  component: LanguageLayout,
})
