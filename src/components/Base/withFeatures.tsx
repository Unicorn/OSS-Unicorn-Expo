/** @format */

import { ComponentType, FC } from 'react'
import { ViewProps, ViewStyle, Platform } from 'react-native'
import { useTheme } from '@shopify/restyle'

import { spacing } from '../../config'
import { SizeOptions } from '../../types'

export interface FeatureProps extends ViewProps {
  radius?: SizeOptions
  elevation?: SizeOptions
  style?: ViewStyle
}

export const withFeatures = <P extends object>(Component: ComponentType<P>): FC<P & FeatureProps> => {
  return ({ style, elevation, radius, ...props }: FeatureProps) => {
    const { colors } = useTheme()
    const enhancedStyle: ViewStyle = {
      borderRadius: radius ? spacing[radius] : 0,
      ...(elevation &&
        Platform.select({
          ios: {
            shadowColor: colors.shadow_color,
            shadowOpacity: 0.2,
            shadowRadius: spacing[elevation],
          },
          web: {
            boxShadow: `0 0 ${spacing[elevation]}px ${colors.shadow_color}33`,
          },
        })),
      ...((style ?? {}) as ViewStyle),
    }

    return <Component style={enhancedStyle} {...(props as P)} />
  }
}
