/** @format */

import { Dimensions, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { useEffect, useState } from 'react'

import { breakpoints } from '../config'

type BasicStyle = ViewStyle | TextStyle | ImageStyle
type Style = BasicStyle | string | number
type ResponsiveValue<T> = T | { m?: T; t?: T; d?: T }

interface ResponsiveStyle {
  [key: string]: ResponsiveValue<Style | ResponsiveStyle | string>
}

type ResponsiveStyles<T> = {
  [P in keyof T]: T[P] extends ResponsiveValue<infer U> ? U : T[P] extends ResponsiveStyle ? ResponsiveStyles<T[P]> : T[P]
}

function isResponsiveStyle<T>(style: ResponsiveValue<T>): style is { m?: T; t?: T; d?: T } {
  return style !== null && typeof style === 'object' && ('m' in style || 't' in style || 'd' in style)
}

function resolveResponsiveStyle<T>(style: ResponsiveValue<T>, width: number): T {
  if (!isResponsiveStyle(style)) return style
  // Resolve the final non-object value for React Native components
  const resolvedStyle =
    width <= breakpoints.tablet
      ? (style.m ?? style.t ?? style.d)
      : width >= breakpoints.tablet && width <= breakpoints.tablet
        ? (style.t ?? style.d ?? style.m)
        : (style.d ?? style.t ?? style.m)
  return (resolvedStyle ?? style) as T // Ensure there is a fallback to the default style if no breakpoints are defined
}

function processStyles(styles: ResponsiveStyle, width: number): ResponsiveStyle {
  const processedStyles: ResponsiveStyle = {}
  Object.keys(styles).forEach(key => {
    const value = styles[key]
    if (isResponsiveStyle(value)) {
      processedStyles[key] = resolveResponsiveStyle(value, width)
    } else if (typeof value === 'object' && value !== null) {
      processedStyles[key] = processStyles(value as ResponsiveStyle, width) // Recursive call
    } else {
      if (value !== undefined) {
        processedStyles[key] = value
      }
    }
  })
  return processedStyles
}

export function responsiveDimensions(view?: 'window' | 'screen') {
  let dimensions = Dimensions.get(view ?? 'window')

  const onChange = ({ window }: { window: { width: number; height: number } }) => {
    dimensions = { ...dimensions, ...window }
  }

  Dimensions.addEventListener('change', onChange)

  return dimensions
}

export function responsiveValue<T>(style: ResponsiveValue<T>, width?: number) {
  let w = width ?? Dimensions.get('window').width
  let s = resolveResponsiveStyle(style, w)

  const onChange = ({ window }: { window: { width: number; height: number } }) => {
    w = window.width
    s = resolveResponsiveStyle(style, w)
  }

  Dimensions.addEventListener('change', onChange)

  return s
}

export function useResponsiveValue() {
  const [width, setWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setWidth(window.width)
    }

    const observer = Dimensions.addEventListener('change', onChange)

    return () => observer.remove()
  }, [])

  function styleResolver<T>(style: ResponsiveValue<T>): T {
    return resolveResponsiveStyle<T>(style, width)
  }

  return styleResolver
}

export function useResponsiveStyles<T extends ResponsiveStyle>(styles: T): ResponsiveStyles<T> {
  const [width, setWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number } }) => {
      setWidth(window.width)
    }
    const subscription = Dimensions.addEventListener('change', onChange)

    return () => subscription.remove()
  }, [])

  return StyleSheet.create(processStyles(styles, width)) as ResponsiveStyles<T>
}
