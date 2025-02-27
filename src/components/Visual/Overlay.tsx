import { View } from 'react-native'

import { ComponentProps } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'overlayVariants'

export const overlayVariants: Partial<BaseTheme> = {
  defaults: {
    backgroundColor: 'overlay_background',
    bottom: 0,
    height: '100%',
    left: 0,
    opacity: 0.8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: overlayVariants.defaults })],
  View
)

export const Overlay = () => {
  return <Styled />
}
