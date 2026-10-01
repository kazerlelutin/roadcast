import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./roadcast.schema";

export function createRoadcastDatabase(url = process.env.DATABASE_URL) {
  if (!url) throw new Error("DATABASE_URL est requis pour accéder à Roadcast");
  return drizzle(postgres(url, { max: 5 }), { schema });
}
