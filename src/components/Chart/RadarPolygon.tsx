import { FC, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedProps, withSpring } from 'react-native-reanimated'
import { Polygon } from 'react-native-svg'

import { ChartDataItem, RadarChartSetup } from '../../types'

interface Props {
  dimensions: RadarChartSetup
  fill: string
  stroke: string
  data: ChartDataItem[]
}

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)

export const RadarPolygon = ({ dimensions, fill, stroke, data }: Props) => {
  const animatedValue = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => {
    // Calculate the points of each axis based on the animated value
    const animatedPoints = data.map(({ value }, i) => {
      const adjustedPoint = (value / dimensions.max) * animatedValue.value * dimensions.size
      const x = dimensions.centerX + adjustedPoint * Math.cos(dimensions.angle * i - Math.PI / 2)
      const y = dimensions.centerY + adjustedPoint * Math.sin(dimensions.angle * i - Math.PI / 2)
      return `${x},${y}`
    })

    return {
      points: animatedPoints.join(' '),
    }
  })

  useEffect(() => {
    animatedValue.value = withSpring(1)
  }, [])

  return <AnimatedPolygon animatedProps={animatedProps} fill={fill} stroke={stroke} strokeWidth="2" />
}
