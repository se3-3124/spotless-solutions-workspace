export type IssuedToken = {
  token: string;
  refreshToken: string;
};

export type TokenIssuerError = {
  error: boolean;
  message: string;
};

export type TokenValid = {
  valid: boolean;
};

export interface ISessionTokenIssuer {
  /**
   * Sign a JWT token
   * @param userId
   * @param email
   */
  sign(userId: number, email: string): Promise<IssuedToken | TokenIssuerError>;

  /**
   * Verify a JWT token
   * @param token
   */
  verify(token: string): TokenValid | TokenIssuerError;

  /**
   * Refresh a session token
   * @param token
   * @param refreshToken
   */
  refresh(
    token: string,
    refreshToken: string
  ): Promise<IssuedToken | TokenIssuerError>;
}
