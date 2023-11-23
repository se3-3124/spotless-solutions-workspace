import 'reflect-metadata';
import Database from './mocks/Database';
import {Role} from '@prisma/client';
import Authentication from '../services/authentication/Authentication';
import AbstractValidator from '../validator/AbstractValidator';
import {mockLogging} from './mocks/mockLogging';
import {mockSession} from './mocks/mockSession';

const db = new Database();
const logger = mockLogging();
const session = mockSession();

describe('Password reset tests', () => {
  beforeAll(async () => {
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
        email: 'anotherxd.doe@email.com',
        email_validated: true,
        role: Role.USER,
        phone_number: '+639111111999',
        accepted_terms_of_service: true,
        credential: {
          create: {
            password_hash: `${salt}:${passwordHash}`,
          },
        },
      },
    });
  });

  it('Returns the token for password reset', async () => {
    const email = 'anotherxd.doe@email.com';

    const fixture = new Authentication(
      new AbstractValidator(),
      logger,
      db,
      session
    );

    const result = await fixture.requestForResetPassword(email);
    expect(result).not.toBeNull();
  });

  it('Will fail to request token when email not found in database', async () => {
    const email = 'leemao.xd@email.com';

    const fixture = new Authentication(
      new AbstractValidator(),
      logger,
      db,
      session
    );

    const result = await fixture.requestForResetPassword(email);
    expect(result).toBeNull();
  });

  it('Allows me to reset the password', async () => {
    const email = 'anotherxd.doe@email.com';
    const salt = '0s47b9yQHML29PbrrEwSWHAal6XrSOp1pj7SrhWcVHk=';
    const passwordHash =
      '4fe5c39d3fc3a259d05526a49819af5eff023e4e523c14d242c5bd814fcba595';

    const fixture = new Authentication(
      new AbstractValidator(),
      logger,
      db,
      session
    );

    const request = await fixture.requestForResetPassword(email);
    const result = await fixture.resetPassword(
      request as string,
      'h3lL0-w0rLD!'
    );

    expect(request).not.toBeNull();
    expect(result).toBe(true);

    const context = await db.getDatabase().user.findFirst({
      include: {
        credential: true,
      },
      where: {
        email,
      },
    });

    expect(context?.credential.password_hash).not.toBe(
      `${salt}:${passwordHash}`
    );
  });
});
