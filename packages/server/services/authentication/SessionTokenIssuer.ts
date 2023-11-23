import i18next from 'i18next';
import IDatabase from '../database/IDatabase';
import ILogger from '../../logging/ILogger';
import {inject, injectable} from 'inversify';
import {
  ISessionTokenIssuer,
  IssuedToken,
  TokenIssuerError,
  TokenValid,
} from './ISessionTokenIssuer';
import jwt, {SignOptions} from 'jsonwebtoken';
import JwtConfig from './JwtConfig';
import {v4} from 'uuid';

@injectable()
export default class SessionTokenIssuer implements ISessionTokenIssuer {
  private readonly _config: JwtConfig;
  private readonly _context: IDatabase;
  private readonly _logger: ILogger;

  constructor(
    @inject<JwtConfig>('jwtConfig') config: JwtConfig,
    @inject<IDatabase>('Database') context: IDatabase,
    @inject<ILogger>('Logger') logger: ILogger
  ) {
    this._config = config;
    this._context = context;
    this._logger = logger;
  }

  async sign(
    userId: number,
    email: string
  ): Promise<IssuedToken | TokenIssuerError> {
    const refreshToken = v4();

    const token = jwt.sign(
      {
        userId,
        email,
      },
      this._config.getSecret(),
      this._config.getSigningConfig() as SignOptions
    );

    try {
      const db = this._context.getDatabase();
      await db.tokenIssued.create({
        data: {
          expires: new Date(Date.now() + 30 * 60 * 1000),
          refresh_token: refreshToken,
          user_id: userId,
          consumed: false,
        },
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (e: unknown) {
      const exception = e as Error;
      if (exception.stack) {
        this._logger.logError(i18next.t('failed_sign_jwt'), exception.stack);
      } else {
        this._logger.logError(i18next.t('failed_sign_jwt'), exception);
      }

      return {
        error: true,
        message: i18next.t('generic_500'),
      };
    }
  }

  async refresh(
    token: string,
    refreshToken: string
  ): Promise<IssuedToken | TokenIssuerError> {
    try {
      const db = this._context.getDatabase();
      const valid = jwt.verify(
        token,
        this._config.getSecret(),
        this._config.getSigningConfig() as SignOptions
      ) as {userId: number; email: string};

      const tokenInContext = await db.tokenIssued.findFirst({
        where: {
          user_id: valid.userId,
          refresh_token: refreshToken,
        },
      });

      // When token doesn't exist or already consumed.
      if (tokenInContext === null || tokenInContext?.consumed) {
        return {
          error: true,
          message: 'Invalid request',
        };
      }

      // Modify token to be invalid.
      await db.tokenIssued.update({
        where: {
          id: tokenInContext.id,
        },
        data: {
          consumed: true,
        },
      });

      return await this.sign(valid.userId, valid.email);
    } catch (e: unknown) {
      const exception = e as Error;
      if (exception.stack) {
        this._logger.logError(i18next.t('failed_resign_jwt'), exception.stack);
      } else {
        this._logger.logError(i18next.t('failed_resign_jwt'), exception);
      }

      return {
        error: true,
        message: i18next.t('generic_500'),
      };
    }
  }

  verify(token: string): TokenValid | TokenIssuerError {
    try {
      jwt.verify(
        token,
        this._config.getSecret(),
        this._config.getSigningConfig() as SignOptions
      );

      return {valid: true};
    } catch (e) {
      const exception = e as Error;
      if (exception.stack) {
        this._logger.logError(i18next.t('invalid_jwt'), exception.stack);
      } else {
        this._logger.logError(i18next.t('invalid_jwt'), exception);
      }

      return {
        error: true,
        message: i18next.t('generic_500'),
      };
    }
  }
}
