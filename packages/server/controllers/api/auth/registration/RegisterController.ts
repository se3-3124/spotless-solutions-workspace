import ControllerBase from '../../../../webServer/ControllerBase';
import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import {inject, injectable} from 'inversify';
import {AuthenticationFailure} from '../../../../services/authentication/AuthenticationResultTypes';
import IIpAddressLockout from '../../../../services/authentication/IIpAddressLockout';

@injectable()
export default class RegisterController extends ControllerBase {
  private readonly _authentication: IAuthentication;
  private readonly _lockout: IIpAddressLockout;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication,
    @inject<IIpAddressLockout>('IpAddressLockout') lockout: IIpAddressLockout
  ) {
    super(lockout);
    this._authentication = authentication;
    this._lockout = lockout;
  }

  getEndpoint(): string {
    return '/api/auth/registration';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const result = await this._authentication.register(req.body);
    if ((result as AuthenticationFailure).error) {
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
