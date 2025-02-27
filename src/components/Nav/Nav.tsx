import { StyleSheet, View, ViewProps, Platform, ViewStyle } from 'react-native'

import { ComponentProps, ReactNode } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant, useTheme } from '@shopify/restyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { breakpoints, spacing } from '../../config'
import { ChuzTheme, SizeOptions } from '../../types'

const themeKey = 'navVariants'

export const navVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: 'center',
    backgroundColor: 'nav_background',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 'l',
    paddingVertical: 's',
    position: 'relative',
    width: '100%',
  },
  sub: {
    backgroundColor: 'subnav_background',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: navVariants.defaults })],
  View
)

interface Props extends ViewProps {
  children: ReactNode
  variant?: 'defaults' | 'sub'
  elevation?: SizeOptions
}

export const Nav = ({ variant, elevation, style, children }: Props) => {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()
  let styles = (style ?? {}) as ViewStyle

  styles = {
    ...styles,
    ...(elevation &&
      Platform.select({
        ios: {
          shadowColor: colors.shadow_color,
          shadowOpacity: 0.2,
          shadowRadius: spacing[elevation],
        },
        web: {
          boxShadow: `0 0 ${spacing[elevation]}px ${colors.shadow_color}`,
        },
      })),
  }

  return (
    <Styled variant={variant} style={styles}>
      <View style={[navStyles.navContainer, { paddingTop: insets.top }]}>{children}</View>
    </Styled>
  )
}

export const navStyles = StyleSheet.create({
  navContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    maxWidth: breakpoints.desktop,
    width: '100%',
  },
})
