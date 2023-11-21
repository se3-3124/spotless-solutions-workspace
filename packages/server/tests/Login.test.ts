import 'reflect-metadata';
import 'dotenv/config';
import Database from './mocks/Database';
import {Role} from '@prisma/client';
import Authentication from '../services/authentication/Authentication';
import AbstractValidator from '../validator/AbstractValidator';
import LoggerMock from './mocks/LoggerMock';
import SessionMock from './mocks/SessionMock';
import {IssuedToken} from '../services/authentication/ISessionTokenIssuer';
import {AuthenticationFailure} from '../services/authentication/AuthenticationResultTypes';

describe('Login tests', () => {
  beforeAll(async () => {
    const db = new Database();

    const salt = '0s47b9yQHML29PbrrEwSWHAal6XrSOp1pj7SrhWcVHk=';
    // Its just: l3emA0-eKsDeE
    const passwordHash =
      '4fe5c39d3fc3a259d05526a49819af5eff023e4e523c14d242c5bd814fcba595';

    await db.getDatabase().user.create({
      include: {
        credential: true,
      },
      data: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'xd.doe@email.com',
        email_validated: true,
        role: Role.USER,
        phone_number: '+639111111199',
        accepted_terms_of_service: true,
        credential: {
          create: {
            password_hash: `${salt}:${passwordHash}`,
          },
        },
      },
    });
  });

  it('Login the user with proper email and password', async () => {
    const email = 'xd.doe@email.com';
    const password = 'l3emA0-eKsDeE';

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
    );

    const run = await fixture.login(email, password);

    expect((run as AuthenticationFailure).messages).toBeUndefined();
    expect((run as AuthenticationFailure).error).toBeUndefined();
    expect((run as IssuedToken).token).toBeTruthy();
    expect((run as IssuedToken).refreshToken).toBeTruthy();
  });

  it('Should not login the user with wrong password', async () => {
    const email = 'xd.doe@email.com';
    const password = 'l4emA0-eKsDeE';

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
    );

    const run = await fixture.login(email, password);

    expect((run as AuthenticationFailure).error).toBe(true);
    expect((run as AuthenticationFailure).messages).toStrictEqual([
      'Unauthorized',
    ]);
  });
});
