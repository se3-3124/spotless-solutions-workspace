import 'reflect-metadata';
import AbstractValidator from '../validator/AbstractValidator';

describe('AbstractValidator tests', () => {
  it('Passes the validator with correct values', () => {
    type SampleObject = {
      email: string;
      password: string;
      phoneNumber: string;
    };

    const schema = {
      email: 'required|string',
      password: 'required|min:8|password_complexity',
      phoneNumber: 'required|phone_number',
    };

    const data: SampleObject = {
      email: 'email@example.com',
      password: 'h3lL0w0rLd!',
      phoneNumber: '09111111111',
    };

    // Fixture
    const validator = new AbstractValidator();
    const result = validator.validate<SampleObject>(data, schema);

    expect(result.passed).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('Fails the validator when password does not meet the criteria', () => {
    type SampleObject = {
      email: string;
      password: string;
      phoneNumber: string;
    };

    const schema = {
      email: 'required|string',
      password: 'required|min:8|password_complexity',
      phoneNumber: 'required|phone_number',
    };

    const data: SampleObject = {
      email: 'email@example.com',
      password: 'helloworld',
      phoneNumber: '09111111111',
    };

    // Fixture
    const validator = new AbstractValidator();
    const result = validator.validate<SampleObject>(data, schema);

    expect(result.passed).toBe(false);
    expect(result.errors).toStrictEqual([
      "The password doesn't pass the required complexity",
    ]);
  });

  it('Fails the validator when phone number not passes the criteria', () => {
    type SampleObject = {
      email: string;
      password: string;
      phoneNumber: string;
    };

    const schema = {
      email: 'required|string',
      password: 'required|min:8|password_complexity',
      phoneNumber: 'required|phone_number',
    };

    const data: SampleObject = {
      email: 'email@example.com',
      password: 'h3lL0w0rLd!',
      phoneNumber: '222',
    };

    // Fixture
    const validator = new AbstractValidator();
    const result = validator.validate<SampleObject>(data, schema);

    expect(result.passed).toBe(false);
    expect(result.errors).toStrictEqual(['Invalid phone number']);
  });
});
