/** @format */

import { PressableProps, PressableStateCallbackType, StyleProp, View, ViewStyle } from 'react-native'

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

// Adding in because even though hovered state exists in RN, it's not typed properly
export interface PressableState extends PressableStateCallbackType {
  pressed: boolean
  hovered: boolean
}

export interface PressableButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode) | undefined

  style?: StyleProp<ViewStyle> | ((state: PressableState) => StyleProp<ViewStyle>) | undefined
}

export declare const PressableButton: React.ForwardRefExoticComponent<PressableButtonProps & React.RefAttributes<View>>

export type ChuzTheme =
  | ({
      colors: Colors
    } & typeof chuzUILight)
  | ({
      colors: Colors
    } & typeof chuzUIDark)

export type ChuzThemes = 'light' | 'dark'
