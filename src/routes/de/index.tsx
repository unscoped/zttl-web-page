import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../../pages/HomePage'
import { buildHead } from '../../i18n/head'

export const Route = createFileRoute('/de/')({
  head: () => buildHead('home', 'de'),
  component: HomePage,
})
