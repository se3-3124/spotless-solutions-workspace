import e from 'express';
import {HTTPMethod} from './HTTPMethod';
import IController from './IController';
import IIpAddressLockout from '../services/authentication/IIpAddressLockout';
import {Ipware} from '@fullerstack/nax-ipware';
import {injectable} from 'inversify';

@injectable()
export default abstract class ControllerBase implements IController {
  private readonly _ipLockout: IIpAddressLockout;

  constructor(ipLockout: IIpAddressLockout) {
    this._ipLockout = ipLockout;
  }

  async middleware(
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
  ): Promise<void> {
    const ip = new Ipware().getClientIP(req);

    const isBlocked = await this._ipLockout.isBlocked(ip!.ip);
    if (isBlocked) {
      res.status(429);
      res.json({error: true, message: 'Too many requests.'});

      return;
    }

    next();
  }

  abstract getMethod(): HTTPMethod;
  abstract getEndpoint(): string;
  abstract handler(req: e.Request, res: e.Response): void | Promise<void>;
}
