/** @format */

import { StyleSheet, ScrollView, View, ViewProps, ScrollViewProps, NativeMethods } from 'react-native'

import { ComponentProps, forwardRef, ReactNode } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'pageVariants'

export const pageVariants: Partial<BaseTheme> = {
  defaults: {
    backgroundColor: 'page_background',
    flex: 1,
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: pageVariants.defaults })],
  View
)

interface Props extends ViewProps {
  children: ReactNode
  scrollProps?: ScrollViewProps
}

export const Page = forwardRef<ScrollView & NativeMethods, Props>(({ children, scrollProps, ...props }, ref) => {
  return (
    <Styled {...props}>
      <ScrollView {...scrollProps} ref={ref}>
        {children}
      </ScrollView>
    </Styled>
  )
})

export const pageStyles = StyleSheet.create({})
