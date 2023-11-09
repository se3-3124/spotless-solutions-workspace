import IHelloWorld from './IHelloWorld';
import {injectable} from 'inversify';

@injectable()
export default class HelloWorld implements IHelloWorld {
  run() {
    return 'hello world';
  }
}
