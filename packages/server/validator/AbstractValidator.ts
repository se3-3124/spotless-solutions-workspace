import IAbstractValidator, {ValidatorResult} from './IAbstractValidator';
import {injectable} from 'inversify';
import Validator from 'validatorjs';

@injectable()
export default class AbstractValidator implements IAbstractValidator {
  constructor() {
    // Set custom validators here
    Validator.register(
      'password_complexity',
      value => {
        if (typeof value !== 'string') {
          return false;
        }

        if (value.length < 8) return false;

        const rules: RegExp[] = [/[A-Z]/, /[a-z]/, /\w/, /\d/];

        let passing = true;
        for (const rule of rules) {
          passing = passing && rule.test(value);
        }

        return passing;
      },
      "The password doesn't pass the required complexity"
    );

    Validator.register(
      'phone_number',
      value => {
        if (typeof value !== 'string') {
          return false;
        }

        return /(\+63|0)(\d{2,4}-?\d{3,4}-?\d{4})/.test(value);
      },
      'Invalid phone number'
    );
  }

  private _flatten(data: {[key: string]: string[]}): string[] {
    const strings = [];
    for (const key of Object.keys(data)) {
      strings.push(...data[key]);
    }

    return strings;
  }

  validate<T>(data: T, schema: {[key in keyof T]: string}): ValidatorResult {
    const validator = new Validator(data, schema);

    return {
      passed: validator.passes() ?? false,
      errors: validator.passes()
        ? undefined
        : this._flatten(validator.errors.all()),
    };
  }
}
