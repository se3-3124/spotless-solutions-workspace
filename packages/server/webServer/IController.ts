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
   * Flag when the controller is disabled for access
   */
  isDisabled(): boolean;

  /**
   * Handler for the current controller
   * @param {express.Request} req Request object
   * @param {express.Response} res Response object
   */
  handler(req: express.Request, res: express.Response): void;
}
