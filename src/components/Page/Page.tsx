import { StyleSheet, ScrollView, View, ViewProps, ScrollViewProps } from 'react-native'
import { ReactNode } from 'react'
import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'pageVariants'

export const pageVariants: Partial<BaseTheme> = {
  defaults: {
    backgroundColor: 'page_background',
    flex: 1,
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ViewProps, ChuzTheme>(
  [createVariant({ themeKey, defaults: pageVariants.defaults })],
  View
)

interface Props extends ViewProps {
  children: ReactNode
  scrollProps?: ScrollViewProps
}

export function Page({ children, scrollProps, ...props }: Props) {
  return (
    <Styled {...props}>
      <ScrollView {...scrollProps}>{children}</ScrollView>
    </Styled>
  )
}

export const pageStyles = StyleSheet.create({})
