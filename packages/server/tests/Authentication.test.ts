import 'reflect-metadata';
import IDatabase from '../services/database/IDatabase';
import {UserRegistrationData} from '../services/authentication/UserRegistrationData';
import {PrismaClient} from '@prisma/client';
// eslint-disable-next-line node/no-unpublished-import
import {mockDeep} from 'jest-mock-extended';
import ILogger from '../logging/ILogger';
import Authentication from '../services/authentication/Authentication';
import AbstractValidator from '../validator/AbstractValidator';

describe('Authentication tests', () => {
  class MockDatabase implements IDatabase {
    getDatabase(): PrismaClient {
      return mockDeep<PrismaClient>();
    }
  }

  class MockLogger implements ILogger {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private _doNothing(d: string, r: (string | number | object)[]) {}

    logError(format: string, ...replacer: (string | number | object)[]): void {
      this._doNothing(format, replacer);
    }
    logFatal(format: string, ...replacer: (string | number | object)[]): void {
      this._doNothing(format, replacer);
    }
    logInformation(
      format: string,
      ...replacer: (string | number | object)[]
    ): void {
      this._doNothing(format, replacer);
    }
    logWarning(
      format: string,
      ...replacer: (string | number | object)[]
    ): void {
      this._doNothing(format, replacer);
    }
  }

  it('Registers the user', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({success: true});
  });

  it('Fail to register when first name is not defined', async () => {
    const data: UserRegistrationData = {
      firstName: '',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['The firstName field is required.'],
    });
  });

  it('Fail to register when last name is not defined', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: '',
      email: 'johndoe@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['The lastName field is required.'],
    });
  });

  it('Fail to register when email is not correct', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['The email format is invalid.'],
    });
  });

  it('Fail to register when password is not up to standards', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'johndoe',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ["The password doesn't pass the required complexity"],
    });
  });

  it('Fail to register when phone number is invalid', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '1111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['Invalid phone number'],
    });
  });

  it('Fail to register when agreement is not true', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: false,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new MockLogger(),
      new MockDatabase()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['The tos must be accepted.'],
    });
  });
});
