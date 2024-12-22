/** @format */

import { View, ViewStyle } from 'react-native'

import { ComponentProps, FC, Fragment, useEffect, useState } from 'react'

import { BaseTheme, VariantProps, createRestyleComponent, createVariant, useTheme } from '@shopify/restyle'

import { ChuzTheme, SelectOption, SizeOptions } from '../../types'
import { FeatureProps, withFeatures } from '../Base'
import { Button, ButtonProps, ButtonTypes, ButtonVariants } from '../Button'
import { itemInArray, toggleItemInArray } from '../../helpers'
import { randomUUID } from 'expo-crypto'

const themeKey = 'buttonGroupVariants'

export const buttonGroupVariants: Partial<BaseTheme> = {
  defaults: {},
  segmented: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: buttonGroupVariants.defaults })],
  View
)

interface Props extends FeatureProps {
  variant?: 'defaults' | 'segmented'
  radius?: SizeOptions
  elevation?: SizeOptions
  buttons?: ButtonProps[] | SelectOption[]
  buttonVariant?: ButtonVariants
  buttonType?: ButtonTypes
  selected?: SelectOption[]
  divider?: boolean
  onSelect?: (option: SelectOption) => void
  onChange?: (options: SelectOption[]) => void
}

export const ButtonGroupBase: FC<Props> = ({ buttons, buttonVariant, buttonType, selected, onSelect, onChange, divider, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(selected ?? [])
  const { colors } = useTheme()

  const selectHandler = (option: SelectOption) => {
    setSelectedOptions(prev => toggleItemInArray(option, prev))

    onSelect && onSelect(option)
  }

  useEffect(() => {
    onChange && onChange(selectedOptions)
  }, [selectedOptions])

  return (
    <Styled {...props}>
      {buttons &&
        buttons.map((b, i) => {
          let s = { ...b.style, borderLeftWidth: 2, borderRightWidth: 2, borderRadius: 0 }
          const active = itemInArray(b, selectedOptions)

          if (i === 0) {
            s['borderRightWidth'] = buttons.length > 2 ? 0 : 1
            s['borderTopLeftRadius'] = 5
            s['borderBottomLeftRadius'] = 5
          }

          if (i === buttons.length - 1) {
            s['borderLeftWidth'] = buttons.length > 2 ? 0 : 1
            s['borderTopRightRadius'] = 5
            s['borderBottomRightRadius'] = 5
          }

          return (
            <Fragment key={randomUUID()}>
              <Button
                variant={buttonVariant}
                type={buttonType}
                active={active}
                style={s}
                onPress={() => selectHandler(b as SelectOption)}
              />

              {(divider || !buttonVariant) && i < buttons.length - 1 && (
                <View style={{ width: 2, backgroundColor: colors.segmentDividerColor }} />
              )}
            </Fragment>
          )
        })}
    </Styled>
  )
}

export const ButtonGroup = withFeatures(ButtonGroupBase)
