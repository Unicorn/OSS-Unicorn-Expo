/** @format */

import { Animated, Insets, ViewProps } from 'react-native'

import { FC, useEffect, useRef } from 'react'

import { useTheme } from '@shopify/restyle'
import Svg, { Path } from 'react-native-svg'

import { isNativeDriver } from '../../helpers'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props extends ViewProps {
  color?: string
  size?: number
  animate?: boolean
  repeat?: boolean
  duration?: number
}

export const LoadingIcon: FC<Props> = ({ animate = true, repeat = true, duration = 2000, size = 24, color, ...props }) => {
  const { colors } = useTheme()
  const pathLength = animate ? 500 : 0
  const dash = useRef(new Animated.Value(pathLength)).current

  useEffect(() => {
    if (!animate) return

    const animation = () => {
      Animated.timing(dash, {
        toValue: 0,
        duration,
        useNativeDriver: isNativeDriver(),
      }).start(({ finished }) => {
        if (!finished || !repeat) return

        Animated.timing(dash, {
          toValue: pathLength,
          duration,
          useNativeDriver: isNativeDriver(),
        }).start(animation)
      })
    }
    animation()
  }, [])

  return (
    <Svg
      width={size}
      height={size}
      viewBox="-2 0 94 40"
      fill="none"
      {...(props as Omit<ViewProps, 'hitSlop'> & { hitSlop?: number | Insets })}
    >
      <AnimatedPath
        stroke={color ?? colors.text_color}
        strokeLinecap="round"
        strokeWidth={5}
        strokeDashoffset={dash}
        strokeDasharray={pathLength}
        d="M34.2151,5.87141 C26.4026,-1.94109 13.6841,-1.94109 5.8711,5.87141 C2.0859,9.65261 0,14.68781 0,20.03941 C0,25.39101 2.0859,30.42641 5.8711,34.21141 C9.6563,37.99661 14.6875,40.08251 20.0431,40.08251 C25.3947,40.08251 30.4301,37.99661 34.2151,34.21141 L59.0391,9.38741 L59.17582,9.2585 C65.12112,3.3132 74.79682,3.3132 80.74182,9.2585 C83.62072,12.1413 85.20662,15.9694 85.20662,20.0395 C85.20662,24.1098 83.62072,27.9418 80.74182,30.8205 C77.86292,33.6994 74.03092,35.2853 69.96082,35.2853 C65.88662,35.2853 62.05852,33.6994 59.17982,30.8205 L53.50792,25.1682 C52.57042,24.2307 51.05482,24.2307 50.11732,25.1682 C49.17982,26.1057 49.17982,27.6213 50.11732,28.5627 L56.18372,34.6057 L56.195438,34.6057 C59.929838,38.1409 64.797038,40.08251 69.961438,40.08251 C75.316938,40.08251 80.348438,37.9964 84.133438,34.2112 C87.914638,30.43 90.000638,25.3948 90.000638,20.0392 C90.000638,14.6837 87.914738,9.6522 84.129538,5.8672 C80.348338,2.086 75.313138,0 69.961538,0 C64.965438,0 60.246738,1.8164 56.609538,5.0898 L56.582194,5.066362 L30.824194,30.824362 C27.941394,33.703262 24.113294,35.289162 20.043194,35.289162 C15.968994,35.289162 12.140894,33.703262 9.262194,30.824362 C6.383294,27.945462 4.797394,24.113462 4.797394,20.039362 C4.797394,15.965162 6.383294,12.137062 9.262194,9.258362 C15.207494,3.313062 24.883194,3.313062 30.828194,9.258362 L36.542994,14.981062 C37.480494,15.914652 38.996094,15.914652 39.933594,14.981062 C40.871094,14.043562 40.871094,12.527962 39.933594,11.590462 L34.2151,5.87141 Z"
      />
    </Svg>
  )
}
