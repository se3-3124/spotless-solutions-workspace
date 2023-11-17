import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import IController from '../../../../webServer/IController';
import {inject, injectable} from 'inversify';
import {AuthenticationFailure} from '../../../../services/authentication/AuthenticationResultTypes';
import {IssuedToken} from '../../../../services/authentication/ISessionTokenIssuer';

@injectable()
export default class LoginController implements IController {
  private readonly _authentication: IAuthentication;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication
  ) {
    this._authentication = authentication;
  }

  getEndpoint(): string {
    return '/api/auth/login';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const result = await this._authentication.login(
      req.body?.email,
      req.body?.password
    );
    if ((result as AuthenticationFailure).error) {
      res.status(400);
      res.json(result);

      return;
    }

    res.status(200);
    res.cookie('sst', (result as IssuedToken).token);
    res.cookie('ssr', (result as IssuedToken).refreshToken);
    res.json(result);
  }

  isDisabled(): boolean {
    return false;
  }
}
