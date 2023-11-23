import e from 'express';
import {HTTPMethod} from './HTTPMethod';
import IController from './IController';
import {
  ISessionTokenIssuer,
  IssuedToken,
  TokenIssuerError,
} from '../services/authentication/ISessionTokenIssuer';

export default abstract class ProtectedController implements IController {
  private readonly _session: ISessionTokenIssuer;

  constructor(session: ISessionTokenIssuer) {
    this._session = session;
  }

  async middleware(
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
  ): Promise<void> {
    // Check incoming cookies.
    const {sst, ssr} = req.cookies;

    const isValid = await this._session.verify(sst);
    if (!isValid) {
      res.status(401);
      res.json({error: true, message: 'Session expired.'});

      return;
    }

    // Attempt to refresh if possible
    const refreshStatus = await this._session.refresh(sst, ssr);
    if ((refreshStatus as TokenIssuerError).error) {
      res.status(401);
      res.json({error: true, message: 'Session expired.'});

      return;
    }

    res.cookie('sst', (refreshStatus as IssuedToken).token);
    res.cookie('ssr', (refreshStatus as IssuedToken).refreshToken);

    next();
  }

  abstract getMethod(): HTTPMethod;
  abstract getEndpoint(): string;
  abstract handler(req: e.Request, res: e.Response): void | Promise<void>;
}
