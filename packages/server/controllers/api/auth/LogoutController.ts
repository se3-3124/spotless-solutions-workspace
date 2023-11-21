import e from 'express';
import {HTTPMethod} from '../../../webServer/HTTPMethod';
import IController from '../../../webServer/IController';
import {injectable} from 'inversify';

@injectable()
export default class LogoutController implements IController {
  getEndpoint(): string {
    return '/api/auth/logout';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    res.clearCookie('ssr');
    res.clearCookie('sst');
    res.redirect('/');
  }

  isDisabled(): boolean {
    return false;
  }
}
