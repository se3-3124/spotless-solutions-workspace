import {AccountBindingType, Role} from '@prisma/client';
import i18next from 'i18next';
import IDatabase from '../../../database/IDatabase';
import ILogger from '../../../../logging/ILogger';
import {inject, injectable} from 'inversify';
import IOAuth2Authentication from '../IOAuth2Authentication';
import {IOAuth2Provider} from '../IOAuth2Provider';
import {
  ISessionTokenIssuer,
  IssuedToken,
  TokenIssuerError,
} from '../../ISessionTokenIssuer';

@injectable()
export default class GoogleOAuth2Authentication
  implements IOAuth2Authentication
{
  private readonly _auth: IOAuth2Provider;
  private readonly _context: IDatabase;
  private readonly _logger: ILogger;
  private readonly _sessionIssuer: ISessionTokenIssuer;

  constructor(
    @inject<IOAuth2Provider>('GoogleOAuth2Provider') auth: IOAuth2Provider,
    @inject<IDatabase>('Database') context: IDatabase,
    @inject<ILogger>('Logger') logger: ILogger,
    @inject<ISessionTokenIssuer>('SessionTokenIssuer')
    sessionIssuer: ISessionTokenIssuer
  ) {
    this._auth = auth;
    this._context = context;
    this._logger = logger;
    this._sessionIssuer = sessionIssuer;
  }

  async login(token: string): Promise<IssuedToken | null> {
    const userInformation = await this._auth.getAccountInformation(token);

    // Fail registration when it is returned false.
    if (userInformation === null) {
      return null;
    }

    const db = this._context.getDatabase();

    // Lookup for the account Id with the email.
    const user = await db.user.findFirst({
      where: {
        email: userInformation.email as string,
        role: Role.USER,
      },
      include: {
        credential: {
          include: {
            account_bindings: {
              where: {
                type: AccountBindingType.GOOGLE,
                account_id: userInformation.id as string,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const session = await this._sessionIssuer.sign(user.id, user.email);
    if ((session as TokenIssuerError).error) {
      return null;
    }

    return session as IssuedToken;
  }
  async register(token: string): Promise<{id: number} | null> {
    const userInformation = await this._auth.getAccountInformation(token);

    // Fail registration when it is returned false.
    if (userInformation === null) {
      return null;
    }

    const hasExistingEmail = await this._context.getDatabase().user.findFirst({
      where: {
        email: userInformation.email as string,
      },
    });

    // Do not register when the email is already registered.
    if (hasExistingEmail !== null) {
      return null;
    }

    const db = this._context.getDatabase();

    // Register user
    try {
      const user = await db.user.create({
        include: {
          credential: {
            include: {
              account_bindings: true,
            },
          },
        },
        data: {
          first_name: userInformation.firstName as string,
          last_name: userInformation.lastName as string,
          email: userInformation.email as string,
          email_validated: true,
          role: Role.USER,
          phone_number: 'unset',
          credential: {
            create: {
              account_bindings: {
                create: {
                  type: AccountBindingType.GOOGLE,
                  account_id: userInformation.id as string,
                },
              },
            },
          },
        },
      });

      return {id: user.id};
    } catch (e: unknown) {
      const exception = e as Error;
      if (exception.stack) {
        this._logger.logFatal(i18next.t('db_store_fatal'), exception.stack);
      } else {
        this._logger.logFatal(i18next.t('db_store_fatal'), exception);
      }
    }

    return null;
  }
}
