import { desc } from "drizzle-orm";
import { query } from "@solidjs/router";
import { createRoadcastDatabase } from "./database.ctrl";
import { roadcasts } from "./roadcast.schema";

export const listRoadcasts = query(async () => {
  "use server";
  if (!process.env.DATABASE_URL) return [];
  try {
    const database = createRoadcastDatabase();
    const results = await database.select({ slug: roadcasts.slug, title: roadcasts.title, lastActivityAt: roadcasts.lastActivityAt }).from(roadcasts).orderBy(desc(roadcasts.lastActivityAt)).limit(12);
    return results.map((roadcast) => ({ ...roadcast, lastActivityAt: roadcast.lastActivityAt?.toISOString() ?? null }));
  } catch {
    // L'accueil reste disponible lors du premier démarrage ou si PostgreSQL est indisponible.
    return [];
  }
}, "roadcast.list");
