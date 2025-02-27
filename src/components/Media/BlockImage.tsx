import { Image, ImageProps } from 'react-native'

import { ComponentProps } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'
import { responsiveDimensions } from '../../hooks/useResponsive'

const themeKey = 'blockImageVariants'

export const blockImageVariants: Partial<BaseTheme> = {
  defaults: {
    borderWidth: 2,
    flex: 1,
    maxHeight: responsiveDimensions().height,
    height: '100%',
    width: '100%',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Image>, ChuzTheme>(
  [createVariant({ themeKey, defaults: blockImageVariants.defaults })],
  Image
)

interface Props extends ImageProps {
  variant?: 'defaults'
}

export const BlockImage = ({ ...props }: Props) => {
  return <Styled {...props} />
}
