/** @format */

import type { TOptionsBase } from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSegments } from 'expo-router'

import { STORE, getItem, setItem } from '../store/store'
import { getLocales } from 'expo-localization'
import i18next from 'i18next'

type $Dictionary<T = unknown> = { [key: string]: T }
type TranslationOptions = TOptionsBase & $Dictionary

interface LocaleTranslateProps {
  children: ReactNode
  endpoint?: string
}

interface LocaleContextType {
  locale: string | null
  setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextType>({ locale: null } as LocaleContextType)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within an LocaleProvider')
  }
  return context
}

// Utility to construct locale keys for routes
export function makeLocaleRouteKey(segments: string[], endpoint: string): string {
  return `router.${segments.join('.')}.${endpoint}`
}

// Hook to get a localized string for route-specific endpoints
export function useRoutesLocale(): (endpoint: string, options?: TranslationOptions) => string {
  const segments = useSegments()
  const { t } = useTranslation()

  return (endpoint: string, options?: TranslationOptions) => t(makeLocaleRouteKey(segments, endpoint), options)
}

export function LocaleTranslate({ endpoint, children }: LocaleTranslateProps) {
  const segments = useSegments()
  const { locale } = useLocale()
  const key = endpoint ? makeLocaleRouteKey(segments, endpoint) : ''

  return <Trans i18nKey={key}>{locale === 'dev' ? key : children}</Trans>
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string | null>(null)

  const updateLocale = async (locale: string) => {
    await setItem(STORE.locale, locale)
    i18next.changeLanguage(locale)
    setLocale(locale)
  }

  useEffect(() => {
    if (locale) return
    const loadLocales = async () => {
      const storedLocale = await getItem(STORE.locale)
      if (storedLocale) {
        setLocale(storedLocale as string)
      } else {
        const locales = getLocales()
        const locale = locales[0]?.languageTag ?? 'en' ?? 'en'
        setLocale(locale)
      }
    }
    loadLocales()
  }, [locale])

  return (
    <LocaleContext.Provider
      value={{
        setLocale: async (locale: string) => await updateLocale(locale),
        locale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}
