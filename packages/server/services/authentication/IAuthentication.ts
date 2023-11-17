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
}
