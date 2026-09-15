import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// The driver adapter is passed to the PrismaClient constructor (see
// src/prisma/prisma.service.ts). This file only configures the CLI.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    path: 'prisma/migrations',
  },
});
