import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, Text, TextStyle, ViewStyle } from 'react-native'

import { ComponentProps, ComponentType, Fragment, ReactNode } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import { BaseTheme, VariantProps, createRestyleComponent, createVariant, useTheme } from '@shopify/restyle'

import { ChuzTheme, SizeOptions } from '../../types'
import { spacing, fontSizes } from '../../config'
import { LoadingIcon } from '../Icons/LoadingIcon'
import { FeatureProps, withFeatures } from '../Base'

const themeKey = 'buttonVariants'

export type ButtonVariants = 'defaults' | 'outlined' | 'select'

export type ButtonTypes = 'primary' | 'secondary' | 'neutral' | 'select' | 'green' | 'red'

export const buttonVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 'xs',
    justifyContent: 'center',
  },
  outlined: {},
  select: {
    borderRadius: 0,
    justifyContent: 'flex-start',
    width: '100%',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Pressable>, ChuzTheme>(
  [createVariant({ themeKey })],
  Pressable
)

export interface ButtonProps extends Partial<PressableProps> {
  variant?: ButtonVariants
  type?: ButtonTypes
  size?: SizeOptions
  active?: boolean
  loading?: boolean
  icon?: keyof typeof MaterialIcons.glyphMap
  label?: ReactNode
  showIcon?: boolean
  showLabel?: boolean
  style?: ViewStyle
  value?: string | number
}

export const ButtonBase = ({
  variant = 'defaults',
  type = 'neutral',
  size = 'm',
  active,
  loading,
  icon,
  label,
  children,
  showIcon = true,
  showLabel = true,
  style,
  ...props
}: ButtonProps) => {
  const { colors } = useTheme<ChuzTheme>()

  const getColorForState = (t: 'background' | 'text' | 'border', state: PressableStateCallbackType): string => {
    const v = variant ?? 'default'

    if (active) return colors[`button_${v}_${type}_${t}_active`] as string
    if (state.pressed) return colors[`button_${v}_${type}_${t}_hover`] as string

    return colors[`button_${v}_${type}_${t}_normal`] as string
  }

  const buttonStyle = (state: PressableStateCallbackType): ViewStyle => {
    const sx: ViewStyle = style ?? {}
    const s: ViewStyle = {
      borderColor: getColorForState('border', state),
      backgroundColor: getColorForState('background', state),
    }

    switch (size) {
      case 'xxs':
        s.paddingHorizontal = spacing.xs
        s.paddingVertical = spacing.xxs
        break
      case 'xs':
        s.paddingHorizontal = spacing.s
        s.paddingVertical = spacing.xxs
        break
      case 's':
        s.paddingHorizontal = spacing.m
        s.paddingVertical = spacing.xs
        break
      case 'm':
        s.paddingHorizontal = spacing.l
        s.paddingVertical = spacing.s
        break
      case 'l':
        s.paddingHorizontal = spacing.xl
        s.paddingVertical = spacing.s
        break
      case 'xl':
        s.paddingHorizontal = spacing.xl
        s.paddingVertical = spacing.s
        break
      case 'xxl':
        s.paddingHorizontal = spacing.xxl
        s.paddingVertical = spacing.s
        break
      default:
        s.paddingHorizontal = spacing.m
        s.paddingVertical = spacing.xs
        break
    }

    s.shadowOffset = { width: 0, height: 2 }
    s.shadowOpacity = 0.1
    s.shadowRadius = 2

    return { ...s, ...sx }
  }

  const buildTextStyle = (state: PressableStateCallbackType): StyleProp<TextStyle> => {
    const s: TextStyle = { color: getColorForState('text', state) }

    s.fontSize = fontSizes[size] as number

    return s
  }

  const renderLabel = (state: PressableStateCallbackType): ReactNode | null => {
    if (!showLabel) return null

    if (label || typeof children === 'string')
      return (
        <Text numberOfLines={1} style={buildTextStyle(state)}>
          {label ?? (children as string).toString()}
        </Text>
      )

    return children as ReactNode
  }

  return (
    <Styled
      {...props}
      variant={variant}
      style={buttonStyle}
      children={state => {
        return (
          <Fragment>
            {loading && <LoadingIcon style={{ marginRight: spacing[size] }} />}
            {icon && showIcon && <MaterialIcons name={icon} style={{ fontSize: fontSizes[size] as number }} size={spacing[size]} />}
            {renderLabel(state)}
          </Fragment>
        )
      }}
    ></Styled>
  )
}

export const Button = withFeatures(ButtonBase)
