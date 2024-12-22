/** @format */

import { Linking } from 'react-native'

import { ComponentProps, FC, useState, ReactNode } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'
import { Href, Link } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'

import { ChuzTheme } from '../../types'

const themeKey = 'aVariants'

export const aVariants: Partial<BaseTheme> = {
  defaults: {
    color: 'link_color',
    position: 'relative',
    zIndex: 10,
  },
  hovered: {
    color: 'link_hover',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Link>, ChuzTheme>(
  [createVariant({ themeKey, defaults: aVariants.defaults })],
  Link
)

interface Props extends LinkProps {
  variant?: 'defaults' | 'hovered'
  href: Href
}

export const A: FC<Props> = ({ children, href, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  const hoverHandler = () => setIsHovered(true)
  const leaveHandler = () => setIsHovered(false)

  const handlePress = () => {
    Linking.canOpenURL(href as string)
      .then(supported => {
        if (supported) {
          Linking.openURL(href as string)
        } else {
          console.error("Don't know how to open this URL: " + href)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  return (
    <Styled
      href={href}
      variant={isHovered ? 'hovered' : 'defaults'}
      onPressIn={hoverHandler}
      onPressOut={leaveHandler}
      onPress={handlePress}
      {...props}
    >
      {children as ReactNode}
    </Styled>
  )
}
