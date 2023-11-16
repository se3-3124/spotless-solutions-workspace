import IDatabase from '../../services/database/IDatabase';
import {injectable} from 'inversify';
// eslint-disable-next-line node/no-unpublished-import
import {mockDeep} from 'jest-mock-extended';
import {PrismaClient} from '@prisma/client';

@injectable()
export default class PrismaClientMock implements IDatabase {
  getDatabase(): PrismaClient {
    return mockDeep<PrismaClient>();
  }
}
