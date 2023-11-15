import {PrismaClient} from '@prisma/client';

export default interface IDatabase {
  getDatabase(): PrismaClient;
}
