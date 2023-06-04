import axios, { AxiosInstance } from 'axios'
import * as AxiosLogger from 'axios-logger'

import config from './config'

let BASE_URL

// For initial testing, use a request catcher instead of making
// requests to the actual API
if (config.env === 'testing') {
  BASE_URL = 'https://node-sfmc.requestcatcher.com/'
} else {
  BASE_URL = `https://${config.baseUri}.rest.marketingcloudapis.com/`
}

interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  rest_instance_url: string
  soap_instance_url: string
  scope: string
  error?: string
  error_description?: string
  error_uri?: string
}

/**
 * Implements an Axios instance that automatically
 * refreshes tokens whenever necessary.
 */
let accessToken: string | null = null
let expiresAt: number = 0

let rest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'User-Agent': 'node-sfmc' },
})

// Add a request interceptor that checks if token is set or if expiresAt is in the past
if (config.env === 'production' || config.env === 'development') {
  rest.interceptors.request.use(async (config) => {
    if (!accessToken || expiresAt < Date.now()) {
      let response = await authenticate()
      accessToken = response['access_token']
      expiresAt = response['expires_in']
    }

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  })
}

// Use verbose logging when during development or testing
if (config.env === 'development' || config.env === 'testing') {
  rest.interceptors.response.use(AxiosLogger.responseLogger)
}

/** Authenticate with the REST API, returning a JWT */
let authenticate = async () => {
  const response = await axios.post(
    `https://${config.baseUri}.auth.marketingcloudapis.com/v2/token`,
    {
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }
  )

  return response.data as TokenResponse
}

export default rest
