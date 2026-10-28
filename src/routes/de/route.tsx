import { createFileRoute } from '@tanstack/react-router'
import i18n from '../../i18n'

export const Route = createFileRoute('/de')({
  beforeLoad: () => i18n.changeLanguage('de'),
})
