import { ComponentProps } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'

import { ChuzTheme } from '../../types'

const themeKey = 'navIconVariants'

export const navIconVariants: Partial<BaseTheme> = {
  defaults: {
    color: 'navItem_normal',
    fontSize: 24,
  },
  active: {
    color: 'navItem_active',
  },
  hovered: {
    color: 'navItem_hovered',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof MaterialIcons>, ChuzTheme>(
  [createVariant({ themeKey, defaults: navIconVariants.defaults })],
  MaterialIcons
)

interface Props extends IconProps<keyof typeof MaterialIcons.glyphMap> {
  variant?: 'defaults' | 'hovered' | 'active'
}

export const NavIcon = (props: Props) => {
  return <Styled {...props} />
}
