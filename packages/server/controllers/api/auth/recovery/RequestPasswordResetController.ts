import ControllerBase from '../../../../webServer/ControllerBase';
import e from 'express';
import {HTTPMethod} from '../../../../webServer/HTTPMethod';
import IAuthentication from '../../../../services/authentication/IAuthentication';
import {inject, injectable} from 'inversify';
import IIpAddressLockout from '../../../../services/authentication/IIpAddressLockout';
import IMailer from '../../../../services/mailer/IMailer';

@injectable()
export default class RequestPasswordResetController extends ControllerBase {
  private readonly _authentication: IAuthentication;
  private readonly _mailer: IMailer;

  constructor(
    @inject<IAuthentication>('AuthenticationService')
    authentication: IAuthentication,
    @inject<IIpAddressLockout>('IpAddressLockout') lockout: IIpAddressLockout,
    @inject<IMailer>('Mailer') mailer: IMailer
  ) {
    super(lockout);
    this._authentication = authentication;
    this._mailer = mailer;
  }

  getEndpoint(): string {
    return '/api/recovery/request';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Post;
  }

  async handler(req: e.Request, res: e.Response): Promise<void> {
    const {email} = req.body;
    const result = await this._authentication.requestForResetPassword(email);
    if (!result) {
      res.status(400);
      res.json({error: true, message: 'Bad Request.'});

      return;
    }

    // Send password reset email to target user
    await this._mailer.sendMail({
      subject: 'Account Recovery',
      to: email,
      html: `
        <p>
          <a href="${process.env.GUI_HOSTNAME}/recovery/change?token=${result}">
                Click here to recover your account
            </a>
        </p>
      `,
    });

    res.status(200);
    res.json({success: true});
  }

  isDisabled(): boolean {
    return false;
  }
}
