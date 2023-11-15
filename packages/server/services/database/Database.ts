import IDatabase from './IDatabase';
import {injectable} from 'inversify';
import {PrismaClient} from '@prisma/client';

@injectable()
export default class Database implements IDatabase {
  getDatabase(): PrismaClient {
    return new PrismaClient();
  }
}
