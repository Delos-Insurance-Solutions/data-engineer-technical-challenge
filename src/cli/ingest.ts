/**
 * Deliverable 1.  pnpm ingest <partner> <file>
 *
 * Example: pnpm ingest partner-a fixtures/partner-a-batch-1.json
 *
 * This is a stub. Everything below the argument check is yours.
 */
import { env } from '../config/env';

async function main(): Promise<void> {
  const [partner, file] = process.argv.slice(2);

  if (!partner || !file) {
    console.error('usage: pnpm ingest <partner> <file>');
    console.error('   eg: pnpm ingest partner-a fixtures/partner-a-batch-1.json');
    process.exit(2);
  }

  void env;

  console.error(`ingest: not implemented.`);
  console.error(`  partner : ${partner}`);
  console.error(`  file    : ${file}`);
  console.error(`Implement this in src/cli/ingest.ts.`);
  process.exit(1);
}

void main();
