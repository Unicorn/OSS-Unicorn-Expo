/** @format */

import { ComponentProps, FC, Fragment } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from '@shopify/restyle'
import { NavIcon } from './NavIcon'
import { NavText } from './NavText'
import { ChuzTheme, PressableButton, PressableButtonProps, PressableState } from '../../types'

const themeKey = 'navItemVariants'

export const navItemVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 's',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof PressableButton>, ChuzTheme>(
  [createVariant({ themeKey, defaults: navItemVariants.defaults })],
  PressableButton
)

interface Props extends PressableButtonProps {
  active?: boolean
  label: string
  icon?: keyof typeof MaterialIcons.glyphMap
  showLabel?: boolean
  showIcon?: boolean
}

export const NavItem: FC<Props> = ({ active, icon, label, showIcon, showLabel, ...props }) => {
  const renderChildren = ({ pressed, hovered }: PressableState) => {
    return (
      <Fragment>
        {showIcon && icon && <NavIcon name={icon} variant={active ? 'active' : hovered ? 'hovered' : 'defaults'} />}
        {showLabel && <NavText label={label} variant={active ? 'active' : hovered ? 'hovered' : 'defaults'} />}
      </Fragment>
    )
  }

  return <Styled {...props}>{renderChildren}</Styled>
}
