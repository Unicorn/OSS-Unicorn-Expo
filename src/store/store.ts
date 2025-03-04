import AsyncStorage from '@react-native-async-storage/async-storage'

// Define keys as constants for consistent naming and easy refactoring
export enum STORE {
  locale = 'locale',
  theme = 'theme',
}

const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(`expo_unicorn_${key}`, JSON.stringify(value))
  } catch (e) {
    console.error('Error decoding Storage.setItem()', e)
  }
}

const getItem = async <T>(key: string, defaultValue?: T | null): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(`expo_unicorn_${key}`)

    if (!value) return defaultValue || null

    return JSON.parse(value) as T
  } catch (e) {
    console.error('Error decoding Storage.getItem()', e)
    return null
  }
}

const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`expo_unicorn_${key}`)
  } catch (e) {
    console.error('Error processing Storage.removeItem()', e)
  }
}

export { setItem, getItem, removeItem }
