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
import AbstractValidator from './validator/AbstractValidator';
import IAbstractValidator from './validator/IAbstractValidator';
import RegisterController from './controllers/api/auth/registration/RegisterController';
import JwtConfig from './services/authentication/JwtConfig';
import SessionTokenIssuer from './services/authentication/SessionTokenIssuer';
import {ISessionTokenIssuer} from './services/authentication/ISessionTokenIssuer';
import LoginController from './controllers/api/auth/login/LoginController';
import LogoutController from './controllers/api/auth/LogoutController';
import IIpAddressLockout from './services/authentication/IIpAddressLockout';
import IpAddressLockoutManager from './services/authentication/IpAddressLockoutManager';
import SMTPMailer from './services/mailer/SMTPMailer';
import IMailer from './services/mailer/IMailer';
import RecoverAccountController from './controllers/api/auth/recovery/RecoverAccountController';
import RequestPasswordResetController from './controllers/api/auth/recovery/RequestPasswordResetController';
import ValidateRecoveryToken from './controllers/api/auth/recovery/ValidateRecoveryToken';

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
container.bind<IDatabase>('Database').to(Database).inSingletonScope();
container.bind<JwtConfig>('jwtConfig').to(JwtConfig).inSingletonScope();
container
  .bind<ISessionTokenIssuer>('SessionTokenIssuer')
  .to(SessionTokenIssuer);
container.bind<IAuthentication>('AuthenticationService').to(Authentication);
container
  .bind<IAbstractValidator>('AbstractValidator')
  .to(AbstractValidator)
  .inSingletonScope();
container
  .bind<IIpAddressLockout>('IpAddressLockout')
  .to(IpAddressLockoutManager);
container.bind<IMailer>('Mailer').to(SMTPMailer);

// Controller
container.bind<IController>('Controller').to(RegisterController);
container.bind<IController>('Controller').to(LoginController);
container.bind<IController>('Controller').to(OAuth2RequestController);
container.bind<IController>('Controller').to(OAuth2CallbackController);
container.bind<IController>('Controller').to(LoginOAuthStateController);
container.bind<IController>('Controller').to(RegistrationStateController);
container.bind<IController>('Controller').to(LogoutController);
container.bind<IController>('Controller').to(RecoverAccountController);
container.bind<IController>('Controller').to(RequestPasswordResetController);
container.bind<IController>('Controller').to(ValidateRecoveryToken);

const server = container.get<IServer>('WebServer');
server.run();
