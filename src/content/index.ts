const policies = import.meta.glob<string>('./privacy-policy.*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Keyed by the language code in the filename, e.g. privacy-policy.en.md -> en
const privacyPolicies: Record<string, string> = Object.fromEntries(
  Object.entries(policies).map(([path, text]) => [
    path.match(/privacy-policy\.(.+)\.md$/)![1],
    text,
  ]),
)

export function getPrivacyPolicy(lng: string | undefined): string {
  return privacyPolicies[lng?.split('-')[0] ?? ''] ?? privacyPolicies.en
}
