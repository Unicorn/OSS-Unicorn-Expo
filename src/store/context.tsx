/** @format */

import { createContext, FC, useState, useContext, useEffect } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'

import { chuzUILight, chuzUIDark } from '../theme'
import type { ChuzTheme, ChuzThemes, ChuzContextType, ChuzProviderProps } from '../types'
import { STORE, getItem, setItem } from './store'
import i18next from 'i18next'

export const ChuzContext = createContext<ChuzContextType>({
  theme: 'light',
  locale: 'dev',
  setTheme: () => null,
  setLocale: () => null,
} as ChuzContextType)

export const ChuzProvider: FC<ChuzProviderProps> = ({ children, translations }) => {
  const [theme, setTheme] = useState<ChuzThemes>('light')
  const [locale, setLocale] = useState<string>('dev')

  let restyle: ChuzTheme

  const setThemeHandler = (t: ChuzThemes) => {
    setItem(STORE.theme, t)
    setTheme(t)
  }

  const setLocaleHandler = async (locale: string) => {
    setItem(STORE.locale, locale)
    i18next.changeLanguage(locale)
    setLocale(locale)
  }

  useEffect(() => {
    const getThemeFromStore = async () => {
      const t = await getItem<ChuzThemes | null>(STORE.theme)
      t && setThemeHandler(t)
    }

    const getLocaleFromStore = async () => {
      const storedLocale = await getItem<string>(STORE.locale)
      if (storedLocale) {
        setLocale(storedLocale)
      } else {
        const locales = getLocales()
        const locale = (locales[0]?.languageTag ?? 'dev' ?? 'dev') as string
        setLocale(locale)
      }
    }

    getLocaleFromStore()
    getThemeFromStore()
  }, [])

  useEffect(() => {
    ;(async () => {
      await i18n.use(initReactI18next).init({
        resources: translations,
        lng: locale,
        interpolation: {
          // React escapes by default
          escapeValue: false,
        },
      })
    })().catch(console.error)
  }, [locale])

  switch (theme) {
    case 'light':
      restyle = chuzUILight
      break
    case 'dark':
      restyle = chuzUIDark
      break
    default:
      restyle = chuzUILight
      break
  }

  return (
    <ChuzContext.Provider value={{ theme, locale, setTheme: setThemeHandler, setLocale: setLocaleHandler }}>
      <ThemeProvider theme={restyle}>{children}</ThemeProvider>
    </ChuzContext.Provider>
  )
}

// Hook to use the theme context
export const useChuzContext = () => useContext(ChuzContext)
