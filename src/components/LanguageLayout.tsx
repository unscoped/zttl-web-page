import { Outlet } from '@tanstack/react-router'
import { LanguageSwitcher } from './LanguageSwitcher'

export function LanguageLayout() {
  return (
    <>
      <LanguageSwitcher />
      <Outlet />
    </>
  )
}
