import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import policy from '../content/privacy-policy.en.md?raw'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return <Markdown>{policy}</Markdown>
}
