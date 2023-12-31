import http from 'http';
import https from 'https';
import express, {Express} from 'express';
import {inject, injectable, multiInject} from 'inversify';
import IServer from './IServer';
import type ILogger from '../logging/ILogger';
import logging from './middlewares/logging';
import IController from './IController';
import {HTTPMethod} from './HTTPMethod';
import i18next from 'i18next';
import cookieParser from 'cookie-parser';

@injectable()
export default class WebServer implements IServer {
  private readonly _logger: ILogger;
  private readonly _controllers: IController[];
  private readonly _expressApplication: Express;

  constructor(
    @inject('Logger') logger: ILogger,
    @multiInject('Controller') controllers: IController[]
  ) {
    this._logger = logger;
    this._controllers = controllers;
    this._expressApplication = express();

    // Setup logger
    this._expressApplication.use(express.json());
    this._expressApplication.use(cookieParser());
    this._expressApplication.use(logging(this._logger));
  }

  /**
   * Maps the controllers to express routes
   * @private
   */
  private _mapControllers() {
    for (const controller of this._controllers) {
      const args = [
        // Endpoint path
        controller.getEndpoint(),

        // Middleware Function
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // When middleware on controller doesn't configured, then just proceed.
          if (!controller.middleware) return next();
          await controller.middleware(req, res, next);
        },

        // Actual route handler
        async (req: express.Request, res: express.Response) => {
          try {
            await controller.handler(req, res);
          } catch (e) {
            this._logger.logError(
              i18next.t('webserver_failure'),
              (e as Error).stack!
            );

            res.status(500);
            res.end();
          }
        },
      ] as const;

      switch (controller.getMethod()) {
        case HTTPMethod.Get:
          this._expressApplication.get(...args);
          break;
        case HTTPMethod.Head:
          this._expressApplication.head(...args);
          break;
        case HTTPMethod.Post:
          this._expressApplication.post(...args);
          break;
        case HTTPMethod.Put:
          this._expressApplication.put(...args);
          break;
        case HTTPMethod.Delete:
          this._expressApplication.delete(...args);
          break;
        case HTTPMethod.Connect:
          this._expressApplication.connect(...args);
          break;
        case HTTPMethod.Options:
          this._expressApplication.options(...args);
          break;
        case HTTPMethod.Trace:
          this._expressApplication.trace(...args);
          break;
        case HTTPMethod.Patch:
          this._expressApplication.patch(...args);
          break;
      }
    }
  }

  /**
   * Starts https server
   * @param {string} key Base64 encoded key
   * @param {string} cert Base64 encoded certificate
   * @private
   */
  private _startHttpsServer(key: string, cert: string) {
    const httpsPort = process.env.HTTPS_PORT || 443;
    try {
      const certificateConfig = {
        key: Buffer.from(key, 'base64'),
        cert: Buffer.from(cert, 'base64'),
      };

      const server = https.createServer(
        certificateConfig,
        this._expressApplication
      );

      server.listen(httpsPort, () => {
        this._logger.logInformation(
          i18next.t('http_listening'),
          'https',
          httpsPort
        );
      });
    } catch (e) {
      this._logger.logFatal(i18next.t('error_generic_start_failure'));

      const exception = e as unknown as Error;
      if (exception.stack !== undefined) {
        this._logger.logFatal(i18next.t('error_stack_trace'), exception.stack);
      }
    }
  }

  /**
   * Starts HTTP server
   * @private
   */
  private _startHttpServer() {
    const httpPort = process.env.HTTP_PORT || 80;
    try {
      const server = http.createServer(this._expressApplication);
      server.listen(httpPort, () => {
        this._logger.logInformation(
          i18next.t('http_listening'),
          'http',
          httpPort
        );
      });
    } catch (e) {
      this._logger.logFatal(i18next.t('error_generic_start_failure'));

      const exception = e as unknown as Error;
      if (exception.stack !== undefined) {
        this._logger.logFatal(i18next.t('error_stack_trace'), exception.stack);
      }
    }
  }

  run(): void {
    this._logger.logInformation(i18next.t('http_starting'));

    const hasHttpsCertConfigured =
      process.env.HTTPS_CERT && process.env.HTTPS_KEY;

    this._mapControllers();

    if (hasHttpsCertConfigured) {
      const key = process.env.HTTPS_KEY as string;
      const cert = process.env.HTTPS_CERT as string;
      return this._startHttpsServer(key, cert);
    }

    this._startHttpServer();
  }
}
