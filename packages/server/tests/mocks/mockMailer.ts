// eslint-disable-next-line node/no-unpublished-import
import {mockDeep} from 'jest-mock-extended';
import IMailer from '../../services/mailer/IMailer';

export function mockMailer() {
  return mockDeep<IMailer>();
}
