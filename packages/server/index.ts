import 'reflect-metadata';
import 'dotenv/config';
import './i18n/config';
import {Container} from 'inversify';

import ILogger from './logging/ILogger';
import LoggerManager from './logging/LoggerManager';
import IServer from './webServer/IServer';
import WebServer from './webServer/WebServer';
import IController from './webServer/IController';
import HelloWorldController from './controllers/api/HelloWorldController';
import HelloWorld from './services/hello-world/HelloWorld';
import IHelloWorld from './services/hello-world/IHelloWorld';

const container = new Container();
container.bind<ILogger>('Logger').to(LoggerManager);
container.bind<IServer>('WebServer').to(WebServer);

// Services
container.bind<IHelloWorld>('HelloWorldService').to(HelloWorld);

// Controllers
container.bind<IController>('Controller').to(HelloWorldController);

const server = container.get<IServer>('WebServer');
server.run();
