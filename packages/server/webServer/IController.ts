import type express from 'express';
import {HTTPMethod} from './HTTPMethod';

export default interface IController {
  /**
   * Gets the configured HTTP Method
   */
  getMethod(): HTTPMethod;

  /**
   * Gets the registered endpoint for this controller
   */
  getEndpoint(): string;

  /**
   * Add middleware into your controller.
   */
  middleware?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void | Promise<void>;

  /**
   * Handler for the current controller
   * @param {express.Request} req Request object
   * @param {express.Response} res Response object
   */
  handler(req: express.Request, res: express.Response): void | Promise<void>;
}
