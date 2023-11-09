import ILoggerProvider from './ILoggerProvider';
import ILogger from './ILogger';
import ConsoleLogger from './providers/ConsoleLogger';
import {injectable} from 'inversify';

enum LoggingType {
  Info,
  Warning,
  Error,
  Fatal,
}

@injectable()
export default class LoggerManager implements ILogger {
  private readonly _loggers: ILoggerProvider[] = [];

  constructor() {
    this._loggers.push(new ConsoleLogger());
  }

  private _log(type: LoggingType, format: string, replacers: object[]) {
    switch (type) {
      case LoggingType.Info:
        this._loggers.forEach(logger =>
          logger.logInformation(format, ...replacers)
        );
        break;
      case LoggingType.Warning:
        this._loggers.forEach(logger =>
          logger.logWarning(format, ...replacers)
        );
        break;
      case LoggingType.Error:
        this._loggers.forEach(logger => logger.logError(format, ...replacers));
        break;
      case LoggingType.Fatal:
        this._loggers.forEach(logger => logger.logFatal(format, ...replacers));
    }
  }

  logInformation(format: string, ...replacer: object[]) {
    this._log(LoggingType.Info, format, replacer);
  }

  logError(format: string, ...replacer: object[]): void {
    this._log(LoggingType.Error, format, replacer);
  }

  logFatal(format: string, ...replacer: object[]): void {
    this._log(LoggingType.Fatal, format, replacer);
  }

  logWarning(format: string, ...replacer: object[]): void {
    this._log(LoggingType.Warning, format, replacer);
  }
}
