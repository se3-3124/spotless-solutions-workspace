import {mockDeep} from 'jest-mock-extended';
import ILogger from '../../logging/ILogger';

export function mockLogging() {
  return mockDeep<ILogger>();
}
