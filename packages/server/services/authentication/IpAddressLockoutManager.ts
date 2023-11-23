import i18next from 'i18next';
import IIpAddressLockout from './IIpAddressLockout';
import {inject, injectable} from 'inversify';
import ILogger from '../../logging/ILogger';
import IDatabase from '../database/IDatabase';

@injectable()
export default class IpAddressLockoutManager implements IIpAddressLockout {
  private readonly _logger: ILogger;
  private readonly _context: IDatabase;

  constructor(
    @inject<ILogger>('Logger') logger: ILogger,
    @inject<IDatabase>('Database') context: IDatabase
  ) {
    this._logger = logger;
    this._context = context;
  }

  async increment(ipAddress: string): Promise<void> {
    try {
      const db = this._context.getDatabase();

      const lockoutData = await db.ipAddressLockoutTable.findFirst({
        where: {
          ip_address: ipAddress,
        },
      });

      // When IP Address is not on the table yet.
      if (!lockoutData) {
        await db.ipAddressLockoutTable.create({
          data: {
            ip_address: ipAddress,
            attempts: 1,
          },
        });

        return;
      }

      // When the attempts are about to be reached the threshold, set the next
      // attempt.
      if ((lockoutData.attempts + 1) % 6 === 0) {
        await db.ipAddressLockoutTable.update({
          where: {
            id: lockoutData.id,
          },
          data: {
            attempts: lockoutData.attempts + 1,
            next_attempt: new Date(Date.now() + 60_000),
          },
        });

        return;
      }

      // Check if the current IP is already reach the threshold
      if (
        lockoutData.attempts % 6 === 0 &&
        lockoutData.next_attempt!.getTime() < Date.now()
      ) {
        return;
      }

      await db.ipAddressLockoutTable.update({
        where: {
          id: lockoutData.id,
        },
        data: {
          attempts: lockoutData.attempts + 1,
        },
      });
    } catch (e) {
      const exception = e as Error;
      this._logger.logError(
        i18next.t('lockout_unable_to_increment'),
        exception.stack!
      );
    }
  }

  async isBlocked(ipAddress: string): Promise<boolean> {
    const db = this._context.getDatabase();
    const lockoutData = await db.ipAddressLockoutTable.findFirst({
      where: {
        ip_address: ipAddress,
      },
    });

    if (!lockoutData) {
      return false;
    }

    return (
      lockoutData.attempts % 6 === 0 &&
      lockoutData.next_attempt!.getTime() < Date.now()
    );
  }
}
