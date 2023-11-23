export type ValidatorResult = {
  passed: boolean;
  errors?: string[];
};

export default interface IAbstractValidator {
  validate<T>(data: T, schema: {[key in keyof T]: string}): ValidatorResult;
}
