import { BaseTheme, useTheme } from '@shopify/restyle'
import { useState, FC, ComponentProps } from 'react'
import { View, Pressable, Animated, StyleSheet, ViewProps } from 'react-native'
import { isNativeDriver } from '../../helpers'

export const toggleVariants: Partial<BaseTheme> = {
  defaults: {
    borderWidth: 1,
  },
}

export const Toggle = () => {
  const { colors } = useTheme()
  const [isToggled, setIsToggled] = useState(false)
  const [animate] = useState(new Animated.Value(0))

  const toggleSwitch = () => {
    const finalValue = isToggled ? 0 : 1
    setIsToggled(!isToggled)
    Animated.timing(animate, {
      toValue: finalValue,
      duration: 200,
      useNativeDriver: isNativeDriver(),
    }).start()
  }

  const circleTransform = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  })

  return (
    <View>
      <Pressable
        onPress={toggleSwitch}
        style={[
          styles.switchContainer,
          {
            backgroundColor: isToggled ? colors.fieldAccent_focused : colors.fieldAccent_normal,
          },
        ]}
      >
        <Animated.View style={[styles.switch, { transform: [{ translateX: circleTransform }] }]} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
  switch: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
})
