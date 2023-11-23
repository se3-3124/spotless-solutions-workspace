import e from 'express';
import {HTTPMethod} from '../../../webServer/HTTPMethod';
import i18next from 'i18next';
import IController from '../../../webServer/IController';
import {inject, injectable} from 'inversify';
import {IOAuth2Provider} from '../../../services/authentication/oauth2/IOAuth2Provider';

@injectable()
export default class OAuth2RequestController implements IController {
  private readonly _googleOAuth2Service: IOAuth2Provider;

  constructor(
    @inject<IOAuth2Provider>('GoogleOAuth2Provider')
    googleOAuth2Service: IOAuth2Provider
  ) {
    this._googleOAuth2Service = googleOAuth2Service;
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Get;
  }

  getEndpoint(): string {
    return '/oauth2/google/oauth2request';
  }

  isDisabled(): boolean {
    return false;
  }

  handler(req: e.Request, res: e.Response): void | Promise<void> {
    const {state} = req.query;
    const uri = this._googleOAuth2Service.generateAuthorizationUri(
      state as string
    );

    if (uri === null) {
      res.status(500);
      res.json({error: true, message: i18next.t('generic_500')});

      return;
    }

    res.redirect(uri);
  }
}
