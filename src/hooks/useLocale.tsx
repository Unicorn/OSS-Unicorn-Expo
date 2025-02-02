/** @format */

import type { TOptionsBase } from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import { ReactNode } from 'react'
import { useSegments } from 'expo-router'

import { useChuzContext } from '../store'

type $Dictionary<T = unknown> = { [key: string]: T }
type TranslationOptions = TOptionsBase & $Dictionary

interface LocaleTranslateProps {
  children: ReactNode
  endpoint?: string
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
  const { locale } = useChuzContext()
  const key = endpoint ? makeLocaleRouteKey(segments, endpoint) : ''

  return <Trans i18nKey={key}>{locale === 'dev' ? key : children}</Trans>
}
