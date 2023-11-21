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
}
