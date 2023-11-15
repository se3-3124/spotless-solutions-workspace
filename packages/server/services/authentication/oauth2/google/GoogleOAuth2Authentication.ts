import {AccountBindingType, Role} from '@prisma/client';
import IDatabase from '../../../database/IDatabase';
import {inject, injectable} from 'inversify';
import IOAuth2Authentication from '../IOAuth2Authentication';
import {IOAuth2Provider} from '../IOAuth2Provider';

@injectable()
export default class GoogleOAuth2Authentication
  implements IOAuth2Authentication
{
  private readonly _auth: IOAuth2Provider;
  private readonly _context: IDatabase;

  constructor(
    @inject<IOAuth2Provider>('GoogleOAuth2Provider') auth: IOAuth2Provider,
    @inject<IDatabase>('Database') context: IDatabase
  ) {
    this._auth = auth;
    this._context = context;
  }

  async login(token: string): Promise<{id: number} | null> {
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

    return {id: user.id};
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
  }
}
