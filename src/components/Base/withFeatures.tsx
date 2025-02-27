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

export function withFeatures<P extends object>(Component: (props: P) => JSX.Element) {
  return function WithFeatures(props: P & FeatureProps) {
    const { style, elevation, radius, ...rest } = props
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

    return <Component {...(rest as P)} style={enhancedStyle} />
  }
}
