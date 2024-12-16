/** @format */

import type { TCountryCode, TLanguageCode } from 'countries-list'
import { ViewStyle, StyleProp, ImageProps } from 'react-native'
import { ReactNode } from 'react'

export type TenorMediaFormat =
  | 'tinywebm'
  | 'mediumgif'
  | 'gifpreview'
  | 'nanowebm'
  | 'tinymp4'
  | 'mp4'
  | 'nanomp4'
  | 'tinygifpreview'
  | 'gif'
  | 'webm'
  | 'nanogifpreview'
  | 'loopedmp4'
  | 'nanogif'
  | 'tinygif'

export type TenorArRange = 'all' | 'wide' | 'standard'

export interface TenorMediaFormats extends Record<TenorMediaFormat, TenorMedia> {}

export interface TenorResult {
  id: string
  title: string
  media_formats: TenorMediaFormats
}

export interface TenorResponse {
  results: TenorResult[]
}

export type TenorSearchFilter = 'sticker' | 'static' | '-static'

export interface TenorSearchOptions {
  q: string
  search_filter?: TenorSearchFilter[]
  country?: TCountryCode
  locale?: TLanguageCode
  content_filter?: 'off' | 'low' | 'medium' | 'high'
  media_filter?: TenorMediaFormat[]
  ar_range?: TenorArRange
  random?: boolean
  limit?: number
  pos?: number | string
}

export interface TenorMedia {
  url: string
  duration: number
  preview: string
  dims: [number, number]
  size: number
}

export interface TenorImageProps extends ImageProps {
  tenorSearchOptions?: TenorSearchOptions
}

export interface TenorBackgroundImageProps {
  containerStyle?: StyleProp<ViewStyle>
  children?: ReactNode
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  tenorSearchOptions?: TenorSearchOptions
}
