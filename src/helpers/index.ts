import { Platform } from 'react-native'
import { isEqual } from 'lodash'

export const itemInArray = <T>(item: T, items: T[]): boolean => {
  return items.findIndex(s => isEqual(s, item)) !== -1
}

export const toggleItemInArray = <T>(item: T, items: T[]): T[] => {
  const found = items.findIndex(s => isEqual(s, item))

  if (found !== -1) {
    return items.filter((_, index) => index !== found)
  } else {
    return [...items, item]
  }
}

export const isNativeDriver = () => {
  return Platform.OS !== 'web'
}

export const aspectRatio = (
  originalWidth: number,
  originalHeight: number,
  options: { preferredWidth?: number; preferredHeight?: number }
) => {
  const aspectRatio = originalWidth / originalHeight

  // Default dimensions to the original if no preferences are provided
  let calculatedWidth = originalWidth
  let calculatedHeight = originalHeight

  const { preferredWidth, preferredHeight } = options

  // If only preferredWidth is provided
  if (preferredWidth && !preferredHeight) {
    calculatedHeight = preferredWidth / aspectRatio
    calculatedWidth = preferredWidth // Ensuring the width is set as per the preference
  }

  // If only preferredHeight is provided
  if (preferredHeight && !preferredWidth) {
    calculatedWidth = preferredHeight * aspectRatio
    calculatedHeight = preferredHeight // Ensuring the height is set as per the preference
  }

  // If both are provided, validate that they maintain the aspect ratio
  if (preferredWidth && preferredHeight) {
    // Optionally handle the case where both dimensions do not maintain the aspect ratio
    // For simplicity, let's assume preferredWidth takes precedence if both are given
    calculatedHeight = preferredWidth / aspectRatio
    calculatedWidth = preferredWidth
  }

  return {
    calculatedWidth: Math.round(calculatedWidth),
    calculatedHeight: Math.round(calculatedHeight),
  }
}
