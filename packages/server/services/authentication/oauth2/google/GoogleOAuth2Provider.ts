import i18next from 'i18next';
import {google} from 'googleapis';
import ILogger from '../../../../logging/ILogger';
import {inject, injectable} from 'inversify';
import {IOAuth2Provider} from '../IOAuth2Provider';
import {OAuth2Client} from 'google-auth-library';
import {ServiceAccountInformation} from '../ServiceAccountInformation';
import {ServiceType} from '../ServiceType';

@injectable()
export default class GoogleOAuth2Provider implements IOAuth2Provider {
  private readonly _logger: ILogger;

  constructor(@inject<ILogger>('Logger') logger: ILogger) {
    this._logger = logger;
  }

  private _createOAuth2Client() {
    const hostname = process.env.CLIENT_HOSTNAME ?? '';
    const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    // Fail when one of the environment variables is not setup.
    if (!hostname || !clientId || !clientSecret) {
      const logParam = {hostname, clientId, clientSecret};
      this._logger.logError(
        i18next.t('google_oauth_client_create_fail'),
        logParam
      );
      return null;
    }

    const callbackUrl = `${hostname}/oauth2/google/oauth2callback`;
    return new OAuth2Client(clientId, clientSecret, callbackUrl);
  }

  generateAuthorizationUri(state?: string): string | null {
    const oAuth2Client = this._createOAuth2Client();
    if (oAuth2Client === null) {
      return null;
    }

    return oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      state,
    });
  }

  async getAccountInformation(
    token: string
  ): Promise<ServiceAccountInformation | null> {
    const oAuth2Client = this._createOAuth2Client();
    if (oAuth2Client === null) {
      return null;
    }

    const response = await oAuth2Client.getToken(token);
    oAuth2Client.setCredentials(response.tokens);

    // Set google
    google.options({auth: oAuth2Client});

    // Set our OAuth2Client as auth on the current instance.
    const oauth2 = google.oauth2('v2');
    const userData = await oauth2.userinfo.get({});

    return {
      id: userData.data.id,
      firstName: userData.data.given_name,
      lastName: userData.data.family_name,
      email: userData.data.email,
    };
  }

  getServiceType(): ServiceType {
    return ServiceType.Google;
  }
}
