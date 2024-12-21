/** @format */

import { useState, useRef, FC, useEffect, useMemo, ReactNode, ComponentProps } from 'react'
import { View, Text, StyleSheet, PanResponder, ViewProps } from 'react-native'
import { createRestyleComponent, VariantProps, createVariant, BaseTheme } from '@shopify/restyle'
import { ChuzTheme } from '../../types'

const themeKey = 'sliderVariants'

export const sliderVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: 'stretch',
    backgroundColor: 'fieldAccent_normal',
    borderRadius: 20,
    marginVertical: 'xs',
    position: 'relative',
    height: 40,
    overflow: 'hidden',
    width: '100%',
  },
}

const Styled = createRestyleComponent<VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>, ChuzTheme>(
  [createVariant({ themeKey, defaults: sliderVariants.defaults })],
  View
)

interface Props extends ViewProps {
  variant?: 'defaults'
  initialValue: number
  label?: ReactNode
  handler: (v: number) => void
  step?: number
  disabled?: boolean
}

export const Slider: FC<Props> = ({ variant, initialValue = 0, label, handler, step = 10, disabled = false, ...props }) => {
  // Note: we may consider moving 'value' out of the component
  // if it makes sense to have it managed by the parent component (ie: controlled component)
  const [isPanning, setIsPanning] = useState(false)
  const [value, setValue] = useState(initialValue)
  const sliderRef = useRef<View>(null)

  useEffect(() => {
    if (handler && !isPanning && value !== initialValue) {
      handler(value)
    }
  }, [value, isPanning])

  function calculateSnapValue(sliderLocation: number) {
    return Math.round(sliderLocation / step) * step
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: e => {
          handleSetSliderValue({ x: e.nativeEvent.locationX })
          setIsPanning(true)
        },
        onPanResponderMove: e => handleSetSliderValue({ x: e.nativeEvent.locationX }),
        onPanResponderRelease: e => {
          handleSetSliderValue({ x: e.nativeEvent.locationX, snap: true, isDone: true })
        },
        onPanResponderTerminationRequest: () => true,
      }),
    [setValue, disabled]
  )

  type setSliderValueOptions = { x: number; snap?: boolean; isDone?: boolean }

  const handleSetSliderValue = ({ x, snap = false, isDone }: setSliderValueOptions) => {
    if (!sliderRef.current || disabled) return

    sliderRef.current.measure((fx, fy, width, height, px, py) => {
      const newValue = Math.max(0, Math.min(100, (x / width) * 100))
      const finalValue = snap ? calculateSnapValue(newValue) : newValue
      setValue(finalValue) // not snapping during drag to preserve smoothness

      // we'll make this operation as done at the very end
      // so that we can prevent the handler from being called multiple times
      if (isDone) {
        setIsPanning(false)
      }
    })
  }

  const renderLabel = () => {
    if (typeof label === 'string') return <Text style={styles.label}>{label}</Text>

    return label
  }

  return (
    <View ref={sliderRef} {...panResponder.panHandlers}>
      <View style={styles.meta}>
        {label && renderLabel()}
        <Text>{value.toFixed(0)}%</Text>
      </View>
      <Styled>
        <View style={[styles.fill, { width: `${value}%`, backgroundColor: `hsl(171, ${50 + 0.3 * value}%, ${30 + 0.1 * value}%)` }]} />
      </Styled>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    height: 300,
    borderRadius: 20,
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
})
