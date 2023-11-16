import {UserRegistrationData} from './UserRegistrationData';
import {
  RegistrationFailure,
  RegistrationSuccess,
} from './AuthenticationResultTypes';

export default interface IAuthentication {
  /**
   * Register user account into database.
   * @param data
   */
  register(
    data: UserRegistrationData
  ): Promise<RegistrationSuccess | RegistrationFailure>;
}
