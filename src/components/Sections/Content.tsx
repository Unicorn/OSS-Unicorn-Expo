import { View } from 'react-native'

import { ComponentProps } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { breakpoints } from '../../config'
import { ChuzTheme, SizeOptions } from '../../types'
import { FeatureProps, withFeatures } from '../Base'

const themeKey = 'contentVariants'

export const contentVariants: Partial<BaseTheme> = {
  defaults: {
    alignSelf: 'center',
    backgroundColor: 'page_background',
    paddingVertical: 'xl',
    paddingHorizontal: 'l',
    minWidth: 300,
    maxWidth: breakpoints.desktop,
    width: '100%',
  },
  minimal: {
    paddingVertical: 'xs',
    paddingHorizontal: 'l',
  },
  surface: {
    backgroundColor: 'surface',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: contentVariants.defaults })],
  View
)

interface Props extends FeatureProps {
  variant?: 'defaults' | 'surface' | 'minimal'
  radius?: SizeOptions
  elevation?: SizeOptions
}

export const ContentBase = ({ children, ...props }: Props) => {
  return <Styled {...props}>{children}</Styled>
}

export const Content = withFeatures(ContentBase)
