import i18next from 'i18next';
import {inject, injectable} from 'inversify';
import IMailer, {MailConfig} from './IMailer';
import nodemailer from 'nodemailer';
import ILogger from '../../logging/ILogger';

import SMTPTransport from 'nodemailer/lib/smtp-transport';

type SMTPConfig = {
  host: string;
  port: number;
  email: string;
  password: string;
};

@injectable()
export default class SMTPMailer implements IMailer {
  private readonly _logger: ILogger;
  private readonly _config: SMTPConfig;

  constructor(@inject<ILogger>('Logger') logger: ILogger) {
    this._logger = logger;
    this._config = this._getAndValidateEmailConfig();
  }

  /**
   * Validates configuration from environment variables
   * @private
   */
  private _getAndValidateEmailConfig(): SMTPConfig {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const email = process.env.SMTP_EMAIL;
    const password = process.env.SMTP_PASSWORD;

    if (!host || !port || !email || !password) {
      this._logger.logError(
        i18next.t('email_not_configured'),
        host as string,
        port as string,
        email as string,
        password as string
      );

      throw new Error('Email is misconfigured! See the logs.');
    }

    const smtpPort = Number(port);
    if (isNaN(smtpPort) || smtpPort > 65536 || smtpPort < 0) {
      this._logger.logError(i18next.t('email_port_misconfigured'), port);

      throw new Error('Email is misconfigured! See the logs.');
    }

    return {
      host,
      port: smtpPort,
      email,
      password,
    };
  }

  async sendMail(config: MailConfig): Promise<boolean> {
    const transport = nodemailer.createTransport(
      {
        host: this._config.host,
        port: this._config.port,
        secure: true,
        auth: {
          user: this._config.email,
          pass: this._config.password,
        },
      } as SMTPTransport.Options,
      {
        from: process.env.GOOGLE_APP_EMAIL,
      }
    );

    const status = await transport.sendMail({
      to: config.to,
      subject: config.subject,
      html: config.html,
    });

    if (status.accepted) {
      this._logger.logInformation(
        i18next.t('email_sent_accepted'),
        status.response
      );

      return true;
    }

    if (status.rejected) {
      this._logger.logError(i18next.t('email_sent_rejected'), status.response);
    }

    return false;
  }
}
