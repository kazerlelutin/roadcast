import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL est requis pour démarrer Roadcast.");
}

const client = postgres(databaseUrl, { max: 1 });
const database = drizzle(client);

try {
  await client`select pg_advisory_lock(hashtext('roadcast:migrations'))`;
  await migrate(database, { migrationsFolder: "./drizzle" });
} finally {
  await client`select pg_advisory_unlock(hashtext('roadcast:migrations'))`.catch(() => undefined);
  await client.end();
}
