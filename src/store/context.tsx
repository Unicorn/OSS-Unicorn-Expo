import { createContext, useState, useContext, useEffect, useMemo } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'

import { chuzUILight, chuzUIDark } from '../theme'
import type { ChuzThemes, ChuzContextType, ChuzProviderProps } from '../types'
import { STORE, getItem, setItem } from './store'
import i18next from 'i18next'

export const ChuzContext = createContext<ChuzContextType>({
  theme: 'light',
  locale: 'dev',
  initialLocale: 'dev',
  initialTheme: 'light',
  setTheme: () => null,
  setLocale: () => null,
} as ChuzContextType)

export const ChuzProvider = ({ children, initialLocale = 'dev', initialTheme = 'light', translations }: ChuzProviderProps) => {
  const [theme, setTheme] = useState<ChuzThemes>(initialTheme)
  const [locale, setLocale] = useState<string>(initialLocale)
  const restyle = useMemo(() => (theme === 'dark' ? chuzUIDark : chuzUILight), [theme])

  const setThemeHandler = (t: ChuzThemes) => {
    setItem(STORE.theme, t).then(() => setTheme(t))
  }

  const setLocaleHandler = async (locale: string) => {
    setItem(STORE.locale, locale).then(() => {
      i18next.changeLanguage(locale)
      setLocale(locale)
    })
  }

  // Run once when the component is mounted, load settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      const [storedTheme, storedLocale] = await Promise.all([getItem<ChuzThemes | null>(STORE.theme), getItem<string | null>(STORE.locale)])

      if (storedTheme) setTheme(storedTheme)
      if (storedLocale) {
        setLocale(storedLocale)
      } else {
        const locales = getLocales()
        setLocale(locales[0]?.languageTag ?? 'dev')
      }

      i18n
        .use(initReactI18next)
        .init({
          resources: translations,
          lng: locale,
          interpolation: { escapeValue: false },
        })
        .catch(console.error)
    }

    loadSettings()
  }, [])

  // Run when the theme or locale changes
  useEffect(() => {
    setItem(STORE.theme, theme).then(() => setTheme(theme))
    setItem(STORE.locale, locale).then(() => setLocale(locale))
  }, [theme, locale])

  return (
    <ChuzContext.Provider value={{ theme, locale, setTheme: setThemeHandler, setLocale: setLocaleHandler }}>
      <ThemeProvider theme={restyle}>{children}</ThemeProvider>
    </ChuzContext.Provider>
  )
}

// Hook to use the theme context
export const useChuzContext = () => useContext(ChuzContext)
