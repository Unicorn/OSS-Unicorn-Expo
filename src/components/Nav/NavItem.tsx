/** @format */

import { ComponentProps, FC, Fragment } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'
import { NavIcon } from './NavIcon'
import { NavText } from './NavText'
import { ChuzTheme } from '../../types'
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native'

const themeKey = 'navItemVariants'

export const navItemVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 's',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Pressable>, ChuzTheme>(
  [createVariant({ themeKey, defaults: navItemVariants.defaults })],
  Pressable
)

interface Props extends PressableProps {
  active?: boolean
  label: string
  icon?: keyof typeof MaterialIcons.glyphMap
  showLabel?: boolean
  showIcon?: boolean
}

export const NavItem: FC<Props> = ({ active, icon, label, showIcon, showLabel, ...props }) => {
  const renderChildren = ({ pressed }: PressableStateCallbackType) => {
    return (
      <Fragment>
        {showIcon && icon && <NavIcon name={icon} variant={active ? 'active' : pressed ? 'hovered' : 'defaults'} />}
        {showLabel && <NavText label={label} variant={active ? 'active' : pressed ? 'hovered' : 'defaults'} />}
      </Fragment>
    )
  }

  return <Styled {...props}>{renderChildren}</Styled>
}
