import {ServiceType} from './ServiceType';
import {ServiceAccountInformation} from './ServiceAccountInformation';

export interface IOAuth2Provider {
  /**
   * Gets the Service type of the provider
   */
  getServiceType(): ServiceType;

  /**
   * Generates Authorization URI to get the user tokens.
   * @return {string | null} Returns URI. It only returns null when generation fails.
   */
  generateAuthorizationUri(state?: string): string | null;

  /**
   * Gets the Account details from the provider.
   * @param {string} token Authorization token
   */
  getAccountInformation(
    token: string
  ): Promise<ServiceAccountInformation | null>;
}
