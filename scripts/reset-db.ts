import { db } from "../src/db/db";
import { sql } from "drizzle-orm";


async function reset() {
  console.log('Wiping public schema...');

  await db.execute(sql`DROP SCHEMA public CASCADE;`);

  await db.execute(sql`CREATE SCHEMA public;`);

  console.log('Database reset to blank state!');
}

reset()
.then(() => process.exit(0))
.catch((err) => {
  console.error(`Failed to reset db: `, err);
  process.exit(1);
})