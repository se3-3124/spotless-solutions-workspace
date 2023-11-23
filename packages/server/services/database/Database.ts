import IDatabase from './IDatabase';
import {injectable} from 'inversify';
import {PrismaClient} from '@prisma/client';

@injectable()
export default class Database implements IDatabase {
  private readonly _database: PrismaClient = new PrismaClient();

  getDatabase(): PrismaClient {
    return this._database;
  }
}
