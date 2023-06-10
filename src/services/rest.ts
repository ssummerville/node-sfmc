import axios, { AxiosInstance } from 'axios'
import * as AxiosLogger from 'axios-logger'

import type { TokenResponse } from '../types/TokenResponse'

import config from './config'

// Set up the base URL variable for the Axios instance
let BASE_URL: string

// For initial testing, use a request catcher instead of making
// requests to the actual API
if (config.env === 'testing') {
  BASE_URL = 'https://node-sfmc.requestcatcher.com/'
} else {
  BASE_URL = `https://${config.baseUri}.rest.marketingcloudapis.com/`
}

let accessToken: string | null = null
let expiresAt: number = 0
let TWO_MINUTES_IN_MS: number = 120000

/**
 * Implements an Axios instance that automatically
 * refreshes access tokens whenever necessary.
 */
let rest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'User-Agent': 'node-sfmc' },
  timeout: TWO_MINUTES_IN_MS,
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

// Implement best practices as outlined in:
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/rate-limiting-best-practices.html

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
