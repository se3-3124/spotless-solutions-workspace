import * as crypto from 'crypto';
import i18next from 'i18next';
import IAuthentication from './IAuthentication';
import IAbstractValidator from '../../validator/IAbstractValidator';
import IDatabase from '../database/IDatabase';
import {inject, injectable} from 'inversify';
import ILogger from '../../logging/ILogger';
import {
  AuthenticationFailure,
  RegistrationSuccess,
} from './AuthenticationResultTypes';
import {Role} from '@prisma/client';
import {
  UserRegistrationData,
  UserRegistrationDataSchema,
} from './UserRegistrationData';
import {
  ISessionTokenIssuer,
  IssuedToken,
  TokenIssuerError,
} from './ISessionTokenIssuer';

@injectable()
export default class Authentication implements IAuthentication {
  private readonly _validator: IAbstractValidator;
  private readonly _logger: ILogger;
  private readonly _context: IDatabase;
  private readonly _session: ISessionTokenIssuer;

  constructor(
    @inject<IAbstractValidator>('AbstractValidator')
    validator: IAbstractValidator,
    @inject<ILogger>('Logger') logger: ILogger,
    @inject<IDatabase>('Database') context: IDatabase,
    @inject<ISessionTokenIssuer>('SessionTokenIssuer')
    session: ISessionTokenIssuer
  ) {
    this._validator = validator;
    this._logger = logger;
    this._context = context;
    this._session = session;
  }

  async login(
    email: string,
    password: string
  ): Promise<IssuedToken | AuthenticationFailure> {
    const validate = this._validator.validate<{
      email: string;
      password: string;
    }>(
      {
        email,
        password,
      },
      {
        email: 'required|email',
        password: 'required|min:8|password_complexity',
      }
    );

    if (!validate.passed) {
      return {
        error: true,
        messages: validate.errors!,
      };
    }

    try {
      const db = this._context.getDatabase();

      const user = await db.user.findFirst({
        include: {
          credential: true,
        },
        where: {
          email,
        },
      });

      if (user === null) {
        return {
          error: true,
          messages: ['Unauthorized'],
        };
      }

      if (!user.credential.password_hash) {
        return {
          error: true,
          messages: ['Unauthorized'],
        };
      }

      const [salt, userPasswordHash] = user.credential.password_hash.split(':');
      const passwordHash = crypto
        .createHash('sha256')
        .update(salt + password)
        .digest('hex');

      // Use crypto timingSafeEqual to prevent any timinx g attacks
      if (
        !crypto.timingSafeEqual(
          Buffer.from(userPasswordHash, 'hex'),
          Buffer.from(passwordHash, 'hex')
        )
      ) {
        return {
          error: true,
          messages: ['Unauthorized'],
        };
      }

      const session = await this._session.sign(user.id, user.email);
      if ((session as TokenIssuerError).error) {
        return {
          error: true,
          messages: [(session as TokenIssuerError).message],
        };
      }

      return session as IssuedToken;
    } catch (e) {
      console.error(e);
      const exception = e as Error;
      if (exception.stack) {
        this._logger.logError(i18next.t('login_failure'), exception.stack);
      } else {
        this._logger.logError(i18next.t('login_failure'), exception);
      }
    }

    return {
      error: true,
      messages: ['Unauthorized'],
    };
  }

  async register(
    data: UserRegistrationData
  ): Promise<RegistrationSuccess | AuthenticationFailure> {
    // Validate if the registration data received is ok
    const validate = this._validator.validate<UserRegistrationData>(
      data,
      UserRegistrationDataSchema
    );

    if (!validate.passed) {
      return {
        error: true,
        messages: validate.errors!,
      };
    }

    try {
      const db = this._context.getDatabase();

      const hasExistingAccount = await db.user.findFirst({
        where: {
          OR: [
            {
              email: data.email,
            },
            {
              phone_number: data.phoneNumber,
            },
          ],
        },
      });

      if (hasExistingAccount) {
        return {
          error: true,
          messages: ['Account already existed.'],
        };
      }

      // Create a random 32 length salt as base64
      const salt = crypto.randomBytes(32).toString('base64');

      const hash = crypto
        .createHash('sha256')
        .update(salt + data.password)
        .digest('hex');

      await db.user.create({
        include: {
          credential: true,
        },
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          email_validated: false,
          role: Role.USER,
          phone_number: data.phoneNumber,
          accepted_terms_of_service: data.tos,
          credential: {
            create: {
              password_hash: salt + ':' + hash,
            },
          },
        },
      });

      return {success: true};
    } catch (e) {
      // Log the data
      console.error(e);
      const exception = e as Error;
      if (!exception.stack) {
        this._logger.logFatal(
          i18next.t('registration_store_failure'),
          exception
        );
      } else {
        this._logger.logFatal(
          i18next.t('registration_store_failure'),
          exception.stack
        );
      }

      return {
        error: true,
        messages: ['Unknown server error'],
      };
    }
  }

  async requestForResetPassword(email: string): Promise<string | null> {
    const validator = this._validator.validate<{email: string}>(
      {
        email,
      },
      {
        email: 'required|email',
      }
    );

    if (!validator.passed) {
      return null;
    }

    const db = this._context.getDatabase();

    // Look for the user first.
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      this._logger.logWarning(
        i18next.t('no_email_found_requesting_reset'),
        email
      );
      return null;
    }

    // Generate password reset
    const passwordResetToken = crypto.randomBytes(64).toString('base64');

    await db.issuedResetTokens.create({
      data: {
        consumed: false,
        token: passwordResetToken,
        expires: new Date(Date.now() + 1800000),
        user_id: user.id,
      },
    });

    return passwordResetToken;
  }

  async validatePasswordResetToken(token: string): Promise<boolean> {
    const db = this._context.getDatabase();

    const issuedToken = await db.issuedResetTokens.findFirst({
      where: {
        token: token,
      },
    });

    if (!issuedToken) {
      this._logger.logWarning(
        i18next.t('invalid_token_request_password_reset'),
        token
      );
      return false;
    }

    // Check token whether if its consumed and still before the expiration
    // time
    return issuedToken.consumed && issuedToken.expires.getDate() < Date.now();
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const db = this._context.getDatabase();

    try {
      const issuedToken = await db.issuedResetTokens.findFirst({
        where: {
          token: token,
        },
      });

      if (!issuedToken) {
        this._logger.logWarning(
          i18next.t('invalid_token_request_password_reset'),
          token
        );
        return false;
      }

      if (issuedToken.consumed && issuedToken.expires.getDate() < Date.now()) {
        return false;
      }

      // Update password
      const salt = crypto.randomBytes(32).toString('base64');

      const hash = crypto
        .createHash('sha256')
        .update(salt + newPassword)
        .digest('hex');

      await db.user.update({
        where: {
          id: issuedToken.user_id,
        },
        include: {
          credential: true,
        },
        data: {
          credential: {
            update: {
              password_hash: hash,
            },
          },
        },
      });

      return true;
    } catch (e) {
      const exception = e as Error;
      this._logger.logError(
        i18next.t('password_update_fail'),
        exception.stack!
      );
    }

    return false;
  }
}
