import 'reflect-metadata';
import 'dotenv/config';
import './i18n/config';
import {Container} from 'inversify';

import ILogger from './logging/ILogger';
import LoggerManager from './logging/LoggerManager';
import IServer from './webServer/IServer';
import WebServer from './webServer/WebServer';
import GoogleOAuth2Provider from './services/authentication/oauth2/google/GoogleOAuth2Provider';
import {IOAuth2Provider} from './services/authentication/oauth2/IOAuth2Provider';
import Authentication from './services/authentication/Authentication';
import IAuthentication from './services/authentication/IAuthentication';

const container = new Container();
container.bind<ILogger>('Logger').to(LoggerManager);
container.bind<IServer>('WebServer').to(WebServer);

// Services
container
  .bind<IOAuth2Provider>('GoogleOAuth2Provider')
  .to(GoogleOAuth2Provider)
  .inTransientScope();
container.bind<IAuthentication>('AuthenticationService').to(Authentication);

const server = container.get<IServer>('WebServer');
server.run();
