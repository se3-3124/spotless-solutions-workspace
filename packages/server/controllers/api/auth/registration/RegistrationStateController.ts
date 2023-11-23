import e from 'express';
import i18next from 'i18next';
import IController from '../../../../webServer/IController';
import {injectable} from 'inversify';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';

@injectable()
export default class RegistrationStateController implements IController {
  getMethod(): HTTPMethod {
    return HTTPMethod.Get;
  }

  getEndpoint(): string {
    return '/api/auth/registration/:state';
  }

  isDisabled(): boolean {
    return false;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const {state} = req.params;

    if (state === 'failure') {
      res.status(400);
      res.json({error: true, message: i18next.t('registration_oauth_fail')});

      return;
    }

    res.status(200);
    res.json({success: true});
  }
}
