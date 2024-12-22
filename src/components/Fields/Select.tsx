/** @format */

import { createRestyleComponent, VariantProps, createVariant, BaseTheme, useTheme } from '@shopify/restyle'
import { useState, useRef, FC, ComponentProps, ReactNode, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Animated, Pressable } from 'react-native'

import { ChuzTheme, SelectOption } from '../../types'
import { Button } from '../../components/Button'
import { FeatureProps, withFeatures } from '../Base'
import { spacing } from '../../config'
import { isNativeDriver } from '../../helpers'

const themeKey = 'selectVariants'

const stubbedOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

export const selectVariants: Partial<BaseTheme> = {
  defaults: {
    position: 'relative',
    zIndex: 900,
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: selectVariants.defaults })],
  View
)

interface Props extends FeatureProps {
  variant?: 'defaults' | 'menu'
  label?: ReactNode
  labelType?: 'plain' | 'button'
  options?: SelectOption[]
  selected?: string | number | SelectOption
  onSelect?: (option: SelectOption) => void
  disabled?: boolean
  defaultValue?: string
}

export const SelectBase: FC<Props> = ({
  variant,
  label,
  labelType = 'button',
  style = { borderRadius: 0 },
  options = stubbedOptions,
  selected,
  onSelect,
  disabled,
  defaultValue,
  ...props
}) => {
  const _selected = typeof selected === 'object' ? selected : options.filter(o => o.value === selected)[0]

  const { colors } = useTheme()
  const [opened, setOpened] = useState(false)
  const [selectedOption, setSelectedOption] = useState(_selected ?? options[0])
  const animation = useRef(new Animated.Value(0)).current

  const toggleDropdown = () => {
    if (opened) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: isNativeDriver(),
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: isNativeDriver(),
      }).start()
    }
    setOpened(!opened)
  }

  const selectHandler = (option: SelectOption) => {
    setSelectedOption(option)
    onSelect && onSelect(option)
    toggleDropdown()
  }

  const renderLabel = () => {
    const C = labelType === 'plain' ? Pressable : Button
    return (
      <C onPress={toggleDropdown} active={opened}>
        {label ? label : selected ? (_selected?.label ?? selectedOption?.label ?? '') : (selectedOption?.label ?? '')}
      </C>
    )
  }

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.filter(o => o.label === defaultValue)[0]
      if (defaultOption) {
        setSelectedOption(defaultOption)
      }
    }
  }, [defaultValue])

  return (
    <Styled {...props} style={disabled && selectStyles.disabled}>
      {renderLabel()}

      {opened && !disabled && (
        <Animated.View
          style={[
            style,
            selectStyles.list,
            {
              backgroundColor: colors.field_select_menu_background,
              opacity: animation,
              marginTop: variant === 'menu' ? 0 : spacing.s,
              minWidth: 200,
            },
          ]}
        >
          <ScrollView style={{ borderRadius: style.borderRadius, minWidth: 200 }}>
            {options.map((item, index) => (
              <Button
                key={index}
                active={selectedOption === item}
                variant="select"
                style={{ paddingVertical: variant === 'menu' ? spacing.s : undefined }}
                onPress={() => selectHandler(item)}
              >
                {item.label}
              </Button>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </Styled>
  )
}

export const Select = withFeatures(SelectBase)

export const selectStyles = StyleSheet.create({
  list: {
    left: 0,
    position: 'absolute',
    right: 0,
    maxHeight: 200,
    top: '100%',
    zIndex: 999,
  },
  disabled: {
    opacity: 0.5,
  },
})
