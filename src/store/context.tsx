import { createContext, useState, useContext, useEffect, useMemo } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'

import { chuzUILight, chuzUIDark } from '../theme'
import type { ChuzThemes, ChuzContextType, ChuzProviderProps } from '../types'
import { STORE, getItem, setItem } from './store'

export const ChuzContext = createContext<ChuzContextType>({
  theme: 'light',
  locale: 'en-US',
  setTheme: () => null,
  setLocale: () => null,
} as ChuzContextType)

export const ChuzProvider = ({ children, translations }: ChuzProviderProps) => {
  const [theme, setTheme] = useState<ChuzThemes>('light')
  const [locale, setLocale] = useState<string>('en-US')
  const restyle = useMemo(() => (theme === 'dark' ? chuzUIDark : chuzUILight), [theme])

  // Initialize i18n with current locale
  const initializeI18n = async (locale: string) => {
    await i18n.use(initReactI18next).init({
      resources: translations,
      lng: locale,
      interpolation: { escapeValue: false },
    })
  }

  const setThemeHandler = async (newTheme: ChuzThemes) => {
    await setItem(STORE.theme, newTheme)
    setTheme(newTheme)
  }

  const setLocaleHandler = async (newLocale: string) => {
    await setItem(STORE.locale, newLocale)
    await i18n.changeLanguage(newLocale)
    setLocale(newLocale)
  }

  // Initial load of settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      const [storedTheme, storedLocale] = await Promise.all([getItem<ChuzThemes | null>(STORE.theme), getItem<string | null>(STORE.locale)])

      // Determine and set initial theme
      const initialTheme = storedTheme || 'light'
      if (!storedTheme) {
        await setItem(STORE.theme, initialTheme)
      }
      setTheme(initialTheme)

      // Determine and set initial locale
      let initialLocale = storedLocale
      if (!initialLocale) {
        const locales = getLocales()
        initialLocale = locales[0]?.languageTag ?? 'en-US'
        await setItem(STORE.locale, initialLocale)
      }

      // Initialize i18n and set locale
      await initializeI18n(initialLocale)
      setLocale(initialLocale)
    }

    loadSettings()
  }, [translations])

  // Reinitialize i18n when locale changes
  useEffect(() => {
    initializeI18n(locale)
  }, [locale, translations])

  return (
    <ChuzContext.Provider value={{ theme, locale, setTheme: setThemeHandler, setLocale: setLocaleHandler }}>
      <ThemeProvider theme={restyle}>{children}</ThemeProvider>
    </ChuzContext.Provider>
  )
}

// Hook to use the theme context
export const useChuzContext = () => useContext(ChuzContext)
