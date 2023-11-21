import 'reflect-metadata';
import 'dotenv/config';
import Authentication from '../services/authentication/Authentication';
import AbstractValidator from '../validator/AbstractValidator';
import Database from './mocks/Database';
import LoggerMock from './mocks/LoggerMock';
import {UserRegistrationData} from '../services/authentication/UserRegistrationData';
import SessionMock from './mocks/SessionMock';

describe('Authentication tests', () => {
  it('Registers the user', async () => {
    const data: UserRegistrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe4@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const db = new Database();
    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      db,
      new SessionMock()
    );
    const result = await fixture.register(data);

    // Test if the user is registered
    const user = await db.getDatabase().user.findFirst({
      where: {
        email: data.email,
      },
    });

    expect(result).toStrictEqual({success: true});
    expect(user?.first_name).toEqual(data.firstName);
    expect(user?.last_name).toEqual(data.lastName);
    expect(user?.email).toEqual(data.email);
    expect(user?.phone_number).toEqual(data.phoneNumber);
    expect(user?.accepted_terms_of_service).toEqual(data.tos);
  });

  it('Fail to register when first name is not defined', async () => {
    const data: UserRegistrationData = {
      firstName: '',
      lastName: 'Doe',
      email: 'johndoe5@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
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
      email: 'johndoe6@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
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
      new LoggerMock(),
      new Database(),
      new SessionMock()
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
      email: 'johndoe7@example.com',
      password: 'johndoe',
      phoneNumber: '+639111111111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
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
      email: 'johndoe8@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '1111',
      tos: true,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
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
      email: 'johndoe9@example.com',
      password: 'j0Hn!D0e',
      phoneNumber: '+639111111111',
      tos: false,
    };

    const fixture = new Authentication(
      new AbstractValidator(),
      new LoggerMock(),
      new Database(),
      new SessionMock()
    );
    const result = await fixture.register(data);

    expect(result).toStrictEqual({
      error: true,
      messages: ['The tos must be accepted.'],
    });
  });
});
