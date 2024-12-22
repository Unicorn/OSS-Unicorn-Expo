/** @format */

import { Platform } from 'react-native'

import { getItemAsync, setItemAsync } from 'expo-secure-store'

const createTokenCache = () => {
  return {
    getToken: (key: string) => {
      return getItemAsync(key)
    },
    saveToken: (key: string, token: string) => {
      return setItemAsync(key, token)
    },
  }
}

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined
