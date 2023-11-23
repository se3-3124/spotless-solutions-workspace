import e from 'express';
import {HTTPMethod} from '../../../webServer/HTTPMethod';
import {inject, injectable} from 'inversify';
import ProtectedController from '../../../webServer/ProtectedController';
import {ISessionTokenIssuer} from '../../../services/authentication/ISessionTokenIssuer';

@injectable()
export default class CheckAuthController extends ProtectedController {
  constructor(
    @inject<ISessionTokenIssuer>('SessionTokenIssuer')
    sessionTokenIssuer: ISessionTokenIssuer
  ) {
    super(sessionTokenIssuer);
  }

  getEndpoint(): string {
    return '/api/auth/check';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Get;
  }

  handler(req: e.Request, res: e.Response): void {
    res.status(200);
    res.json({success: true});
  }

  isDisabled(): boolean {
    return false;
  }
}
