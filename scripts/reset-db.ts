import { db } from "@/db/db";
import { sql } from "drizzle-orm";


async function reset() {
  await db.execute(sql`DROP TABLE IF EXISTS sessions, accounts, users, verification_tokens, monitors,checks, incidents CASCADE`);

  await db.execute(sql`DROP TYPE IF EXISTS auth_role, monitor_type, monitor_status, check_status, incident_status CASCADE`);

  console.log('Tables and types dropped');

}

reset()
.then(() => process.exit(0))
.catch((err) => {
  console.error(`Failed to reset db: `, err);
  process.exit(1);
})