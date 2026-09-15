import { describe, expect, it } from 'vitest';
import { HealthService } from './health.service';
import type { PrismaService } from '../prisma/prisma.service';

const prismaThat = (behaviour: () => Promise<unknown>) =>
  ({ $queryRaw: behaviour } as unknown as PrismaService);

describe('HealthService', () => {
  it('reports the database up when the query succeeds', async () => {
    const service = new HealthService(prismaThat(async () => [{ '?column?': 1 }]));
    await expect(service.check()).resolves.toEqual({ status: 'ok', database: 'up' });
  });

  it('reports degraded rather than throwing when the query fails', async () => {
    const service = new HealthService(prismaThat(async () => { throw new Error('no connection'); }));
    await expect(service.check()).resolves.toEqual({ status: 'degraded', database: 'down' });
  });
});
