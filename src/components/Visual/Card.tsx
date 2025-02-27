import { View, ViewStyle } from 'react-native'

import { ComponentProps, ReactNode } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'
import { withFeatures } from '../Base'

const themeKey = 'cardVariants'

export type CardVariants = 'defaults' | 'inline'

export const cardVariants: Partial<BaseTheme> = {
  defaults: {
    backgroundColor: '#000',
    borderRadius: 50,
    gap: 'xs',
    marginVertical: 'xs',
    padding: 'xs',
  },
  inline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

interface Props {
  variant?: CardVariants
  children: ReactNode
  style?: ViewStyle
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey })],
  View
)

export const CardBase = ({ variant = 'defaults', children }: Props) => {
  return <Styled variant={variant}>{children}</Styled>
}

export const Card = withFeatures(CardBase)
