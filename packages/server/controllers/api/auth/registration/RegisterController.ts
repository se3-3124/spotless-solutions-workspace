import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import IController from '../../../../webServer/IController';
import {inject, injectable} from 'inversify';
import {AuthenticationFailure} from '../../../../services/authentication/AuthenticationResultTypes';
import {Ipware} from '@fullerstack/nax-ipware';
import IIpAddressLockout from '../../../../services/authentication/IIpAddressLockout';

@injectable()
export default class RegisterController implements IController {
  private readonly _authentication: IAuthentication;
  private readonly _lockout: IIpAddressLockout;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication,
    @inject<IIpAddressLockout>('IpAddressLockout') lockout: IIpAddressLockout
  ) {
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
    const ip = new Ipware().getClientIP(req);

    const isBlocked = await this._lockout.isBlocked(ip!.ip);
    if (isBlocked) {
      res.status(429);
      res.json({error: true, message: 'Too many requests.'});

      return;
    }

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
