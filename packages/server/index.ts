import 'reflect-metadata';
import 'dotenv/config';
import './i18n/config';
import {Container} from 'inversify';

import ILogger from './logging/ILogger';
import LoggerManager from './logging/LoggerManager';
import IServer from './webServer/IServer';
import WebServer from './webServer/WebServer';

const container = new Container();
container.bind<ILogger>('Logger').to(LoggerManager);
container.bind<IServer>('WebServer').to(WebServer);

const server = container.get<IServer>('WebServer');
server.run();
