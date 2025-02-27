import { Text, TextProps } from 'react-native'

import { ComponentProps } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'strongVariants'

export const strongVariants: Partial<BaseTheme> = {
  defaults: {
    fontWeight: 'bold',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>, ChuzTheme>(
  [createVariant({ themeKey, defaults: strongVariants.defaults })],
  Text
)

interface Props extends TextProps {
  variant?: 'defaults'
}

export const Strong = ({ children, ...props }: Props) => {
  return <Styled {...props}>{children}</Styled>
}
