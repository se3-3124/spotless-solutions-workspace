import ILoggerProvider from '../ILoggerProvider';
import chalk from 'chalk';

export default class ConsoleLogger implements ILoggerProvider {
  private _stringify(object: string | number | object): string {
    if (object === null) {
      return 'null';
    }

    if (object === undefined) {
      return 'undefined';
    }

    if (typeof object === 'number') {
      return Number(object).toString();
    }

    if (typeof object === 'object') {
      return JSON.stringify(object);
    }

    return `${object}`;
  }

  private _formatter(
    format: string,
    replacer: (string | number | object)[]
  ): string {
    let message = format;

    for (let i = 0; i < replacer.length; i++) {
      message = message.replace(
        new RegExp(`\\{${i}\\}`),
        this._stringify(replacer[i])
      );
    }

    return message;
  }

  logError(format: string, ...replacer: (string | number | object)[]): void {
    console.log(chalk.red(`[ERROR] ${this._formatter(format, replacer)}`));
  }

  logFatal(format: string, ...replacer: (string | number | object)[]): void {
    console.log(chalk.bold.red(`[FATAL] ${this._formatter(format, replacer)}`));
  }

  logInformation(
    format: string,
    ...replacer: (string | number | object)[]
  ): void {
    console.log(chalk.blue(`[INFO] ${this._formatter(format, replacer)}`));
  }

  logWarning(format: string, ...replacer: (string | number | object)[]): void {
    console.log(chalk.yellow(`[FATAL] ${this._formatter(format, replacer)}`));
  }
}
