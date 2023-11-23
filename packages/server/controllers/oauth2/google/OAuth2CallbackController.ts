import e from 'express';
import {HTTPMethod} from '../../../webServer/HTTPMethod';
import i18next from 'i18next';
import IController from '../../../webServer/IController';
import {inject, injectable} from 'inversify';
import IOAuth2Authentication from '../../../services/authentication/oauth2/IOAuth2Authentication';

@injectable()
export default class OAuth2CallbackController implements IController {
  private readonly _authentication: IOAuth2Authentication;

  constructor(
    @inject<IOAuth2Authentication>('GoogleOAuth2Authentication')
    authentication: IOAuth2Authentication
  ) {
    this._authentication = authentication;
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Get;
  }

  getEndpoint(): string {
    return '/oauth2/google/oauth2callback';
  }

  isDisabled(): boolean {
    return false;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const {code, state} = req.query;

    if (!code) {
      res.status(500);
      res.json({error: true, message: i18next.t('generic_400')});

      return;
    }

    const hostname = process.env.GUI_HOSTNAME;
    if (state === 'registration_state') {
      const registration = await this._authentication.register(code as string);

      if (!registration) {
        return res.redirect(`${hostname}/auth/google/register/failure`);
      }

      return res.redirect(`${hostname}/auth/google/register/success`);
    }

    const login = await this._authentication.login(code as string);
    if (!login) {
      return res.redirect(`${hostname}/auth/google/failure`);
    }

    // Set these to cookies
    res.cookie('sst', login.token);
    res.cookie('ssr', login.refreshToken);
    return res.redirect(`${hostname}/auth/google/success`);
  }
}
