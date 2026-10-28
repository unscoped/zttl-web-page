import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PAGES, toLang } from '../i18n/paths'

export function NotFound() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <p>{t('notFound.message')}</p>
      <p>
        <Link to={PAGES.home[toLang(i18n.resolvedLanguage)]}>{t('notFound.back')}</Link>
      </p>
    </>
  )
}
