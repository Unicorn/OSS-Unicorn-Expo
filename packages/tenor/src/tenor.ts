/** @format */

import { TenorSearchOptions, TenorResponse } from './types'

const API_BASE = 'https://tenor.googleapis.com/v2'

export class TenorClient {
  private static instance: TenorClient
  private apiKey: string
  private clientKey: string

  private constructor(apiKey: string, clientKey: string) {
    this.apiKey = apiKey
    this.clientKey = clientKey
  }

  public static getInstance(apiKey?: string, clientKey?: string): TenorClient {
    if (!TenorClient.instance) {
      if (!apiKey || !clientKey) {
        throw new Error('API key and Client key must be provided for the first instance creation.')
      }
      TenorClient.instance = new TenorClient(apiKey, clientKey)
    }
    return TenorClient.instance
  }

  private appendParams(params: URLSearchParams, key: string, value?: string[] | string) {
    if (value !== undefined && value !== null) {
      params.append(key, Array.isArray(value) ? value.join(',') : value.toString())
    }
  }

  public async search(options: TenorSearchOptions): Promise<string[] | null> {
    const params = new URLSearchParams({ q: options.q, key: this.apiKey, client_key: this.clientKey })
    Object.entries(options).forEach(([key, value]) => {
      if (key !== 'q') {
        this.appendParams(params, key, value)
      }
    })

    const endpoint = `${API_BASE}/search?${params.toString()}`

    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: TenorResponse = await response.json()
      return data.results.map(result => result.media_formats.gif.url)
    } catch (error) {
      console.error('Error fetching GIFs:', error)
      return null
    }
  }
}

let cachedInstance = null

export const configureTenorClient = (apiKey: string) => {
  if (!apiKey) {
    throw new Error('An API key must be provided to configure TenorClient.')
  }

  // Create the singleton instance
  cachedInstance = TenorClient.getInstance(apiKey, 'elevate')
}

export const tenorClient = (): TenorClient => {
  if (!cachedInstance) {
    throw new Error('TenorClient has not been configured. Call `configureTenorClient` first.')
  }
  return cachedInstance
}
