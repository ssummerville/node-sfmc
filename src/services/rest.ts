import axios, { AxiosInstance } from 'axios'
import * as AxiosLogger from 'axios-logger'

import config from './config'

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
  baseURL: `https://${config.baseUri}.rest.marketingcloudapis.com/`,
})

// Add a request interceptor that checks if token is set or if expiresAt is in the past
rest.interceptors.request.use(async (config) => {
  if (!accessToken || expiresAt < Date.now()) {
    let response = await authenticate()
    accessToken = response['access_token']
    expiresAt = response['expires_in']
  }

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

if (config.env === 'development') {
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
