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
import IController from './webServer/IController';
import OAuth2RequestController from './controllers/oauth2/google/OAuth2RequestController';
import OAuth2CallbackController from './controllers/oauth2/google/OAuth2CallbackController';
import Database from './services/database/Database';
import IDatabase from './services/database/IDatabase';
import IOAuth2Authentication from './services/authentication/oauth2/IOAuth2Authentication';
import GoogleOAuth2Authentication from './services/authentication/oauth2/google/GoogleOAuth2Authentication';
import LoginOAuthStateController from './controllers/api/auth/login/LoginOAuthStateController';
import RegistrationStateController from './controllers/api/auth/registration/RegistrationStateController';

const container = new Container();
container.bind<ILogger>('Logger').to(LoggerManager);
container.bind<IServer>('WebServer').to(WebServer);

// OAuth2 Services
container
  .bind<IOAuth2Provider>('GoogleOAuth2Provider')
  .to(GoogleOAuth2Provider);
container
  .bind<IOAuth2Authentication>('GoogleOAuth2Authentication')
  .to(GoogleOAuth2Authentication);

// Services
container.bind<IDatabase>('Database').to(Database);
container.bind<IAuthentication>('AuthenticationService').to(Authentication);

// Controller
container.bind<IController>('Controller').to(OAuth2RequestController);
container.bind<IController>('Controller').to(OAuth2CallbackController);
container.bind<IController>('Controller').to(LoginOAuthStateController);
container.bind<IController>('Controlller').to(RegistrationStateController);

const server = container.get<IServer>('WebServer');
server.run();
