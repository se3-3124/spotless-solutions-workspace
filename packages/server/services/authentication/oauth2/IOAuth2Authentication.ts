import {IssuedToken} from '../ISessionTokenIssuer';

export default interface IOAuth2Authentication {
  /**
   * Login using OAuth2
   * @param {string} token Token for retrieving information
   */
  login(token: string): Promise<IssuedToken | null>;

  /**
   * Register using OAuth2
   * @param {string} token Token for retrieving information
   */
  register(token: string): Promise<{id: number} | null>;
}
