import {PrismaClient} from '@prisma/client';
import IDatabase from '../../services/database/IDatabase';

export default class Database implements IDatabase {
  getDatabase() {
    return new PrismaClient();
  }
}
