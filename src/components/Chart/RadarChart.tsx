import { View, StyleSheet, Text, Platform, useWindowDimensions } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { Svg, G, Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg'
import { randomUUID } from 'expo-crypto'

import { ChartData, ChartDataItem, ChuzTheme, RadarChartSetup } from '../../types'
import { RadarPolygon } from './RadarPolygon'

const stubbedSets = [
  {
    label: 'Hard Skills',
    data: [
      { label: 'Wood Framing', value: 72 },
      { label: 'Form Work', value: 94 },
      { label: 'Metal Framing', value: 41 },
      { label: 'Load Bearing', value: 64 },
      { label: 'Floor Systems', value: 24 },
    ],
  },
  {
    label: 'Soft Skills',
    data: [
      { label: 'Communication', value: 12 },
      { label: 'Punctuality', value: 54 },
      { label: 'Reliability', value: 99 },
      { label: 'Work Ethic', value: 74 },
      { label: 'Management', value: 35 },
    ],
  },
  {
    label: 'Test',
    data: [
      { label: 'Item 1', value: 93 },
      { label: 'Item 2', value: 34 },
      { label: 'Item 3', value: 15 },
      { label: 'Item 4', value: 36 },
      { label: 'Item 5', value: 92 },
    ],
  },
]

interface Props {
  numberOfAxes?: number
  axisWidth?: number
  axisLength?: number
  size?: number
  height?: number
  width?: number
  sets: ChartData[]
  showSets?: number[]
  labelHeight?: number
  labelWidth?: number
  labelSpacing?: number
  dynamicSpacing?: true
}

export const RadarChart = ({
  numberOfAxes,
  sets = stubbedSets,
  showSets = [0, 1, 2],
  axisWidth = 150,
  axisLength = 1,
  size = 150,
  height,
  width,
  labelHeight = 20,
  labelWidth = 80,
  labelSpacing = 20,
  dynamicSpacing = true,
}: Props) => {
  const { colors } = useTheme<ChuzTheme>()

  if (!sets || sets.length === 0 || sets[0] === undefined) {
    return null
  }

  if (sets && showSets.some(index => index >= sets.length)) {
    console.error('Invalid index in showSets. Ensure indices are within the bounds of the sets array.')
    return (
      <View style={styles.container}>
        <Text>Cannot Display Data</Text>
      </View>
    )
  }

  const responsive = dynamicSpacing && Platform.OS === 'web'
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  const xSpacing = responsive && screenWidth > size ? (screenWidth / size / 2) * labelSpacing : labelSpacing
  const ySpacing = responsive && screenHeight > size ? (screenHeight / size / 3) * labelSpacing : labelSpacing
  const axes = numberOfAxes ?? sets[0].data.length // number of axis on the radar chart

  const calculated: RadarChartSetup = {
    centerX: (width ?? screenWidth) / 2,
    centerY: (height ?? 500) / 2,
    angle: (2 * Math.PI) / axes,
    angleDeg: 360 / axes,
    max: 100,
    size,
  }

  const renderAxis = (data: ChartDataItem[]) =>
    data.map((d, i) => (
      <G key={i}>
        <Circle
          cx={calculated.centerX}
          cy={calculated.centerY}
          r={(axisWidth / axes) * (i + 1)}
          stroke={colors.chart_radar_levels}
          strokeWidth="0.5"
          fill="none"
        />
        <Rect
          width={axisLength}
          height={axisWidth}
          fill="url(#gradient)"
          transform={`translate(${calculated.centerX}, ${calculated.centerY}) rotate(${180 + calculated.angleDeg * i}, ${axisLength / 2}, ${axisLength / 2})`}
        />
      </G>
    ))

  const renderLabels = (data: ChartDataItem[], set: number, index: number) => (
    <View key={set} style={styles.labelsContainer}>
      {data.map(({ label }, i) => {
        const x = calculated.centerX + size * Math.cos(calculated.angle * i - Math.PI / 2)
        const y = calculated.centerY + size * Math.sin(calculated.angle * i - Math.PI / 2)
        let left = x - labelWidth / 2
        let top = y + index * labelHeight

        if (y < calculated.centerY && x !== calculated.centerX) top -= labelHeight / 2
        if (y < calculated.centerY && x === calculated.centerX) top -= ySpacing + labelHeight / 2
        if (y > calculated.centerY) top += ySpacing
        if (x < calculated.centerX) left -= xSpacing
        if (x > calculated.centerX) left += xSpacing

        return (
          <View key={i} style={[styles.labelContainer, { left, top }]}>
            <Text style={[styles.label, { color: colors[`chart_radar_set${set + 1}_label`] }]} numberOfLines={2}>
              {label}
            </Text>
          </View>
        )
      })}
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.radarContainer}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="gradient" gradientTransform="rotate(90)">
              <Stop offset="0%" stopColor={colors.chart_radar_axis_start} />
              <Stop offset="100%" stopColor={colors.chart_radar_axis_end} />
            </LinearGradient>
          </Defs>

          {renderAxis(sets[0].data)}

          {showSets.map(
            s =>
              sets[s] && (
                <RadarPolygon
                  key={randomUUID()}
                  dimensions={calculated}
                  fill={colors[`chart_radar_set${s + 1}_fill`] as string}
                  stroke={colors[`chart_radar_set${s + 1}_outline`] as string}
                  data={sets[s].data}
                />
              )
          )}
        </Svg>
      </View>

      {showSets.map((s, i) => sets[s] && renderLabels(sets[s].data, s, i))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
    width: '100%',
  },
  radarContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  labelsContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
