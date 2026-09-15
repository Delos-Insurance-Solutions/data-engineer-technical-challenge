import { Module } from '@nestjs/common';
import { AgentsModule } from './agents/agents.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, AgentsModule],
})
export class AppModule {}
