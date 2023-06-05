export interface TokenResponse {
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
