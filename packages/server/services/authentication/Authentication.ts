import * as crypto from 'crypto';
import i18next from 'i18next';
import IAuthentication from './IAuthentication';
import IAbstractValidator from '../../validator/IAbstractValidator';
import IDatabase from '../database/IDatabase';
import {inject, injectable} from 'inversify';
import ILogger from '../../logging/ILogger';
import {
  RegistrationFailure,
  RegistrationSuccess,
} from './AuthenticationResultTypes';
import {Role} from '@prisma/client';
import {
  UserRegistrationData,
  UserRegistrationDataSchema,
} from './UserRegistrationData';

@injectable()
export default class Authentication implements IAuthentication {
  private readonly _validator: IAbstractValidator;
  private readonly _logger: ILogger;
  private readonly _context: IDatabase;

  constructor(
    @inject<IAbstractValidator>('AbstractValidator')
    validator: IAbstractValidator,
    @inject<ILogger>('Logger') logger: ILogger,
    @inject<IDatabase>('Database') context: IDatabase
  ) {
    this._validator = validator;
    this._logger = logger;
    this._context = context;
  }

  async register(
    data: UserRegistrationData
  ): Promise<RegistrationSuccess | RegistrationFailure> {
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

      const hash = crypto
        .createHash('sha256')
        .update(data.password)
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
              password_hash: hash,
            },
          },
        },
      });

      return {success: true};
    } catch (e) {
      // Log the data
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
