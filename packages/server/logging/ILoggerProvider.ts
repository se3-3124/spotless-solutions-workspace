export default interface ILoggerProvider {
  logInformation(
    format: string,
    ...replacer: (string | number | object)[]
  ): void;
  logWarning(format: string, ...replacer: (string | number | object)[]): void;
  logError(format: string, ...replacer: (string | number | object)[]): void;
  logFatal(format: string, ...replacer: (string | number | object)[]): void;
}
