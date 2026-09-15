import 'dotenv/config';
import { z } from 'zod';

/**
 * Environment is parsed once, at startup, and the process refuses to run
 * without what it needs. Extend this as you add configuration.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required — see .env.example'),
  API_KEY: z.string().min(1, 'API_KEY is required — see .env.example'),
  PORT: z.coerce.number().int().positive().default(3000),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(`Invalid environment:\n${issues}\n\nDid you copy .env.example to .env?`);
}

export const env = parsed.data;
export type Env = typeof env;
