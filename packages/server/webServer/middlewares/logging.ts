import ILogger from '../../logging/ILogger';
import e from 'express';

export default function logging(logger: ILogger) {
  return function (req: e.Request, res: e.Response, next: e.NextFunction) {
    const time = new Date().toISOString();
    const body =
      req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT'
        ? req.body
        : 'None';

    let format = '{0} [{1}] {2} on {3}';
    const formatParameters: (string | number | object)[] = [
      time,
      req.method,
      res.statusCode,
      req.originalUrl,
    ];

    if (body !== 'None') {
      format += ' with body: {4}';
      formatParameters.push(body);
    }

    if (res.statusCode >= 100 && res.statusCode <= 399) {
      logger.logInformation(format, ...formatParameters);
    }

    if (res.statusCode >= 400 && res.statusCode <= 499) {
      logger.logError(format, ...formatParameters);
    }

    if (res.statusCode >= 500 && res.statusCode <= 599) {
      logger.logFatal(format, ...formatParameters);
    }

    next();
  };
}
