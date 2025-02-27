import { createContext, useState, useContext, useEffect, useMemo } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'

import { chuzUILight, chuzUIDark } from '../theme'
import type { ChuzThemes, ChuzContextType, ChuzProviderProps } from '../types'
import { STORE, getItem, setItem } from './store'
import i18next from 'i18next'

import 'intl-pluralrules'

export const ChuzContext = createContext<ChuzContextType>({
  theme: 'light',
  locale: 'dev',
  setTheme: () => null,
  setLocale: () => null,
} as ChuzContextType)

export const ChuzProvider = ({ children, translations }: ChuzProviderProps) => {
  const [theme, setTheme] = useState<ChuzThemes>('light')
  const [locale, setLocale] = useState<string>('dev')
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

  useEffect(() => {
    const loadSettings = async () => {
      const [storedTheme, storedLocale] = await Promise.all([getItem<ChuzThemes | null>(STORE.theme), getItem<string>(STORE.locale)])

      if (storedTheme) setTheme(storedTheme)
      if (storedLocale) {
        setLocale(storedLocale)
      } else {
        const locales = getLocales()
        setLocale(locales[0]?.languageTag ?? 'dev')
      }
    }

    loadSettings()
  }, [])

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources: translations,
        lng: locale,
        interpolation: { escapeValue: false },
      })
      .catch(console.error)
  }, [locale, translations])

  return (
    <ChuzContext.Provider value={{ theme, locale, setTheme: setThemeHandler, setLocale: setLocaleHandler }}>
      <ThemeProvider theme={restyle}>{children}</ThemeProvider>
    </ChuzContext.Provider>
  )
}

// Hook to use the theme context
export const useChuzContext = () => useContext(ChuzContext)
