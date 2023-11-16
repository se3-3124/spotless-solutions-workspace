import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import IController from '../../../../webServer/IController';
import {inject, injectable} from 'inversify';
import {RegistrationFailure} from '../../../../services/authentication/AuthenticationResultTypes';

@injectable()
export default class RegisterController implements IController {
  private readonly _authentication: IAuthentication;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication
  ) {
    this._authentication = authentication;
  }

  getEndpoint(): string {
    return '/api/auth/registration';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const result = await this._authentication.register(req.body);
    if ((result as RegistrationFailure).error) {
      res.status(400);
      res.json(result);

      return;
    }

    res.status(200);
    res.json(result);
  }

  isDisabled(): boolean {
    return false;
  }
}
