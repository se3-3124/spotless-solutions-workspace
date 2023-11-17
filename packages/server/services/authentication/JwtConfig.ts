import {inject, injectable} from 'inversify';
import ILogger from '../../logging/ILogger';
import i18next from 'i18next';
import * as crypto from 'crypto';

@injectable()
export default class JwtConfig {
  private readonly _logger: ILogger;
  private readonly _secret: string;
  private readonly _expires = '30m';
  private readonly _algorithm = 'HS256';
  private readonly _notBefore = '2s';

  constructor(@inject<ILogger>('Logger') logger: ILogger) {
    this._logger = logger;

    // Get the JWT token from the environment variable
    const token = process.env.JSONWEBTOKEN_SECRET;
    if (!token) {
      this._logger.logFatal(i18next.t('jsonwebtoken_unset'));
      throw new Error(i18next.t('jsonwebtoken_unset'));
    }

    this._secret = crypto
      .createHash('sha256')
      .update(token, 'utf-8')
      .digest('hex');
  }

  getSecret() {
    return this._secret;
  }

  getSigningConfig() {
    return {
      expiresIn: this._expires,
      notBefore: this._notBefore,
      algorithm: this._algorithm,
    };
  }
}
