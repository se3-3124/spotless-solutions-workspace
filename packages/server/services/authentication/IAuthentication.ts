import {UserRegistrationData} from './UserRegistrationData';
import {
  AuthenticationFailure,
  RegistrationSuccess,
} from './AuthenticationResultTypes';
import {IssuedToken} from './ISessionTokenIssuer';

export default interface IAuthentication {
  /**
   * Login the user
   * @param email
   * @param password
   */
  login(
    email: string,
    password: string
  ): Promise<IssuedToken | AuthenticationFailure>;

  /**
   * Register user account into database.
   * @param data
   */
  register(
    data: UserRegistrationData
  ): Promise<RegistrationSuccess | AuthenticationFailure>;

  /**
   * Request for password reset
   * @param {string} email
   */
  requestForResetPassword(email: string): Promise<string | null>;

  /**
   * Validate whether the password reset token is valid
   * @param token
   */
  validatePasswordResetToken(token: string): Promise<boolean>;

  /**
   * Reset password
   * @param {string} token
   * @param {string} newPassword
   */
  resetPassword(token: string, newPassword: string): Promise<boolean>;
}
