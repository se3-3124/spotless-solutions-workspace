/* eslint-disable */
import ILogger from '../../logging/ILogger';
import {injectable} from 'inversify';

@injectable()
export default class LoggerMock implements ILogger {
  logError(format: string, ...replacer: (string | number | object)[]): void {
  }
  logFatal(format: string, ...replacer: (string | number | object)[]): void {
  }
  logInformation(
    format: string,
    ...replacer: (string | number | object)[]
  ): void {}
  logWarning(format: string, ...replacer: (string | number | object)[]): void {
  }
}
