import 'reflect-metadata';
import HelloWorld from '../services/hello-world/HelloWorld';
import {Container} from 'inversify';
import IHelloWorld from '../services/hello-world/IHelloWorld';

describe('Example', () => {
  const container = new Container();
  container.bind<IHelloWorld>('HelloWorldFixture').to(HelloWorld);

  it('should return hello world string', () => {
    const fixture = container.get<IHelloWorld>('HelloWorldFixture');

    expect(fixture.run()).toBe('hello world');
  });
});
