import { Link } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { getPrivacyPolicy } from '../content'
import { PAGES } from '../i18n/paths'

export function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation()
  const isBinding = i18n.resolvedLanguage === 'de'

  return (
    <>
      {!isBinding && (
        <p className="translation-notice" lang="en" role="note">
          {t('language.translationNotice')}{' '}
          <Link to={PAGES.privacyPolicy.de} className="link-button" lang="de" hrefLang="de">
            {t('language.switchToGerman', { lng: 'de' })}
          </Link>
        </p>
      )}
      <Markdown>{getPrivacyPolicy(i18n.resolvedLanguage)}</Markdown>
    </>
  )
}
