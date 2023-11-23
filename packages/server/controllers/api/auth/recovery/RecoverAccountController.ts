import ControllerBase from '../../../../webServer/ControllerBase';
import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import {inject, injectable} from 'inversify';
import IIpAddressLockout from '../../../../services/authentication/IIpAddressLockout';

@injectable()
export default class RecoverAccountController extends ControllerBase {
  private readonly _authentication: IAuthentication;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication,
    @inject<IIpAddressLockout>('IpAddressLockout') lockout: IIpAddressLockout
  ) {
    super(lockout);
    this._authentication = authentication;
  }

  getEndpoint(): string {
    return '/api/recovery/recover';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const {token, password} = req.body;
    const result = await this._authentication.resetPassword(token, password);
    if (!result) {
      res.status(400);
      res.json({error: true, message: 'Bad Request.'});

      return;
    }

    res.status(200);
    res.json({success: true});
  }

  isDisabled(): boolean {
    return false;
  }
}
