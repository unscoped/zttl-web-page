import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getAlternatePath, toLang } from '../i18n/paths'

// Each language is labelled in its own language so it stays readable whatever is active.
const LANGUAGES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
] as const

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <div className="language-switcher">
      <svg
        className="language-switcher__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>
      <select
        aria-label={t('language.label')}
        value={toLang(i18n.resolvedLanguage)}
        onChange={(event) => void navigate({ to: getAlternatePath(pathname, toLang(event.target.value)) })}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code} lang={code}>
            {label}
          </option>
        ))}
      </select>
      <svg
        className="language-switcher__icon language-switcher__icon--end"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
