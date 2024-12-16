/** @format */

import { Image } from 'react-native'
import { useState, useEffect, FC } from 'react'

import { tenorClient } from '../tenor'
import { TenorArRange, TenorImageProps, TenorMediaFormat } from '../types'

export const TenorImage: FC<TenorImageProps> = ({
  tenorSearchOptions = {
    q: 'construction',
    ar_range: 'wide' as TenorArRange,
    limit: 1,
    media_filter: ['gif'] as TenorMediaFormat[],
    random: true,
  },
  ...props
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

  return <Image source={{ uri }} {...props} />
}
