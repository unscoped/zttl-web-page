import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'
const THEMES: readonly Theme[] = ['light', 'dark', 'system']

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    return stored && THEMES.includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
      root.style.colorScheme = ''
    } else {
      root.dataset.theme = theme
      root.style.colorScheme = theme
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage can be blocked; the choice still applies for this visit.
    }
  }, [theme])

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
