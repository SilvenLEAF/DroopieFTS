interface AccessTokenResult {
  access_token: string,
  token_type: 'bearer',
  expires_in: number,
  scope: string,
  uid: string,
  account_id: string
}

export default AccessTokenResult;