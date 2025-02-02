/** @format */

import { View } from 'react-native'

import { ComponentProps, FC } from 'react'

import { BaseTheme, VariantProps, border, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'cardVariants'

export const cardVariants: Partial<BaseTheme> = {
  defaults: {
    backgroundColor: 'surface',
    borderRadius: 'm',
    gap: 'xs',
    marginVertical: 'xs',
    padding: 'xs',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
}

interface Props {}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: cardVariants.defaults })],
  View
)

export const Card: FC<Props> = () => {
  return <Styled />
}
