import e from 'express';
import {AuthenticationFailure} from '../../../../services/authentication/AuthenticationResultTypes';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import IController from '../../../../webServer/IController';
import IIpAddressLockout from '../../../../services/authentication/IIpAddressLockout';
import {inject, injectable} from 'inversify';
import {Ipware} from '@fullerstack/nax-ipware';
import {IssuedToken} from '../../../../services/authentication/ISessionTokenIssuer';

@injectable()
export default class LoginController implements IController {
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
    return '/api/auth/login';
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

    const result = await this._authentication.login(
      req.body?.email,
      req.body?.password
    );
    if ((result as AuthenticationFailure).error) {
      res.status(400);
      res.json(result);

      // Increment counter.
      await this._lockout.increment(ip!.ip);

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
