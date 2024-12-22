/** @format */

import { ViewStyle } from 'react-native'

import { ReactNode } from 'react'

import { chuzUILight, chuzUIDark } from './theme'
import { Colors } from './config/colors'

export interface ChuzContextType {
  theme: ChuzThemes
  setTheme: (theme: ChuzThemes) => void
}

export interface ChuzProviderProps {
  children: ReactNode
}

export type BreakpointOptions = 'mobile' | 'tablet' | 'desktop'

export type SizeOptions = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

export type Breakpoints = {
  [K in BreakpointOptions]: number
}

export type Spacing = {
  [K in SizeOptions]: number
}

export type FontSizes = {
  [K in SizeOptions]: number
}

export type SelectOption = {
  value: string | number
  label: string
  style?: ViewStyle
}

export type ChartDataItem = {
  label: string
  value: number
}

export type ChartData = {
  label: string
  data: ChartDataItem[]
}

export interface RadarChartSetup {
  centerX: number
  centerY: number
  angle: number
  angleDeg: number
  max: number
  size: number
}

export type ChuzTheme =
  | ({
      colors: Colors
    } & typeof chuzUILight)
  | ({
      colors: Colors
    } & typeof chuzUIDark)

export type ChuzThemes = 'light' | 'dark'
