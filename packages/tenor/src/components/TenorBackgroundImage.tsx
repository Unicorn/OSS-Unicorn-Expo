/** @format */

import { ImageBackground, View } from 'react-native'
import { useState, useEffect, FC } from 'react'

import { tenorClient } from '../tenor'
import { TenorArRange, TenorBackgroundImageProps, TenorMediaFormat } from '../types'

export const TenorBackgroundImage: FC<TenorBackgroundImageProps> = ({
  containerStyle,
  children,
  overlay,
  overlayStyle = {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },
  contentStyle = {
    padding: 15,
    width: '100%',
  },
  tenorSearchOptions = {
    q: 'construction',
    ar_range: 'wide' as TenorArRange,
    limit: 1,
    media_filter: ['gif'] as TenorMediaFormat[],
    random: true,
  },
}) => {
  const [uri, setUri] = useState<string | undefined>()

  useEffect(() => {
    tenorClient()
      .search(tenorSearchOptions)
      .then(gifs => {
        if (gifs && gifs.length > 0) {
          setUri(gifs[0])
        } else {
          console.warn('No GIFs found.')
        }
      })
      .catch(error => console.error('Failed to load GIFs:', error))
  }, [])

  return (
    <ImageBackground source={{ uri }} style={containerStyle}>
      {overlay && <View style={overlayStyle}></View>}
      <View style={contentStyle}>{children}</View>
    </ImageBackground>
  )
}
