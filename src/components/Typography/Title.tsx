/** @format */

import { Text, TextProps } from 'react-native'

import { ComponentProps, FC } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'
import { fonts } from '../../config'

const themeKey = 'titleVariants'

export const titleVariants: Partial<BaseTheme> = {
  defaults: {
    color: 'text_color',
    fontFamily: fonts.body,
    fontSize: {
      mobile: 28,
      tablet: 32,
      desktop: 36,
    },
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
}

const StyledH1 = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>, ChuzTheme>(
  [createVariant({ themeKey, defaults: titleVariants.defaults })],
  Text
)

const StyledText = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>, ChuzTheme>(
  [createVariant({ themeKey, defaults: titleVariants.defaults })],
  Text
)

interface Props extends TextProps {
  variant?: 'defaults' | 'subtitle' | 'hidden'
}

export const Title: FC<Props> = ({ children, variant = 'defaults', ...props }) => {
  const StyledElement = variant === 'defaults' ? StyledH1 : StyledText

  if (variant === 'hidden') return null

  return (
    <StyledElement variant={variant} {...props}>
      {children}
    </StyledElement>
  )
}
