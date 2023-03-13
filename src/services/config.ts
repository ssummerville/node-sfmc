/**
 * Simple configuration service that reads environment variables.
 */

let availableKeys: string[] = [
  'NODE_ENV',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'BASE_URI',
]

let get = (key: string) => {
  // Ensure that only certain environment variables are checked
  if (!availableKeys.includes(key)) {
    throw new Error(`Invalid key: ${key}`)
  }

  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  // Force the type to be string as we thrown an exception
  // if it's not allowed or missing
  return process.env[key] as string
}

let config = {
  env: get('NODE_ENV'),
  clientId: get('CLIENT_ID'),
  clientSecret: get('CLIENT_SECRET'),
  baseUri: get('BASE_URI'),
}

export default config
