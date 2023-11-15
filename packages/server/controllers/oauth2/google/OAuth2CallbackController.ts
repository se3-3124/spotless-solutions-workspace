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

    if (state === 'registration_state') {
      const registration = await this._authentication.register(code as string);

      if (!registration) {
        return res.redirect('/api/auth/registration/failure');
      }

      return res.redirect(
        `/api/auth/registration/success?id=${registration.id}`
      );
    }

    const login = await this._authentication.login(code as string);
    if (!login) {
      return res.redirect('/api/auth/login/failure');
    }

    return res.redirect(`/api/auth/login/success?id=${login.id}`);
  }
}
