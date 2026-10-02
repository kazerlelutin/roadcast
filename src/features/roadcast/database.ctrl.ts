import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./roadcast.schema";

let client: ReturnType<typeof postgres> | undefined;
let connectedUrl: string | undefined;

export function createRoadcastDatabase(url = process.env.DATABASE_URL) {
  if (!url) throw new Error("DATABASE_URL est requis pour accéder à Roadcast");
  if (!client || connectedUrl !== url) {
    client = postgres(url, { max: 5 });
    connectedUrl = url;
  }
  return drizzle(client, { schema });
}
