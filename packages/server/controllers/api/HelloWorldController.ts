import {inject, injectable} from 'inversify';
import IController from '../../webServer/IController';
import {HTTPMethod} from '../../webServer/HTTPMethod';
import e from 'express';
import IHelloWorld from '../../services/hello-world/IHelloWorld';

@injectable()
export default class HelloWorldController implements IController {
  private readonly _service: IHelloWorld;

  constructor(@inject<IHelloWorld>('HelloWorldService') service: IHelloWorld) {
    this._service = service;
  }

  getEndpoint(): string {
    return '/api/hello-world';
  }

  getMethod(): HTTPMethod {
    return HTTPMethod.Get;
  }

  handler(req: e.Request, res: e.Response): void {
    res.status(200);
    res.json({
      text: this._service.run(),
    });
  }

  isDisabled(): boolean {
    return false;
  }
}
