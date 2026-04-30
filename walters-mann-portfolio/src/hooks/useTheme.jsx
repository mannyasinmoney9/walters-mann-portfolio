import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'wm-theme'

const THEME_COLORS = {
  dark: '#08111f',
  light: '#f5efe3',
}

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Ignore localStorage errors and fall back to the design default.
  }

  return 'dark'
}

function applyTheme(theme) {
  const root = document.documentElement
  const metaTheme = document.querySelector('meta[name="theme-color"]')

  root.dataset.theme = theme
  root.style.colorScheme = theme
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  document.body.dataset.theme = theme

  if (metaTheme) {
    metaTheme.setAttribute('content', THEME_COLORS[theme])
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore localStorage errors and keep the in-memory theme.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
