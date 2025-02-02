/** @format */

import { Text, TextProps } from 'react-native'

import { ComponentProps, FC } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'headerVariants'

export const headerVariants: Partial<BaseTheme> = {
  defaults: {
    color: 'text_color',
  },
  h2: {
    fontSize: {
      mobile: 24,
      tablet: 28,
      desktop: 32,
    },
    fontWeight: 'normal',
  },
  h3: {
    fontSize: {
      mobile: 16,
      tablet: 18,
      desktop: 20,
    },
    fontWeight: 'normal',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>, ChuzTheme>(
  [createVariant({ themeKey, defaults: headerVariants.defaults })],
  Text
)

interface Props extends TextProps {
  variant?: 'defaults' | 'h2' | 'h3'
}

export const Header: FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>
}
