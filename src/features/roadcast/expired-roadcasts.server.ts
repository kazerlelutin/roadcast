import { and, eq, lt, sql } from "drizzle-orm";
import { planLimits } from "../billing/plan.const";
import { createLocalMediaStorage } from "../media/local-storage.ctrl";
import { createS3MediaStorage } from "../media/s3-storage.ctrl";
import type { MediaStorage } from "../media/media-storage.ctrl";
import { createRoadcastDatabase } from "./database.ctrl";
import { media, roadcasts } from "./roadcast.schema";

const cleanupLockName = "roadcast:expired-roadcasts";

export function expiredRoadcastCutoff(now = new Date()) {
  return new Date(now.getTime() - planLimits.free.inactiveDays * 24 * 60 * 60 * 1000);
}

function storageFor(provider: "local" | "s3" | "youtube", storage: Partial<Record<"local" | "s3", MediaStorage>>) {
  if (provider === "youtube") return null;
  if (!storage[provider]) storage[provider] = provider === "local" ? createLocalMediaStorage() : createS3MediaStorage();
  return storage[provider];
}

export async function purgeExpiredRoadcasts(now = new Date()) {
  if (!process.env.DATABASE_URL) return { deletedRoadcasts: 0, mediaToRemove: [] as Array<{ provider: "local" | "s3" | "youtube"; key: string }> };
  const database = createRoadcastDatabase();
  const cutoff = expiredRoadcastCutoff(now);
  const result = await database.transaction(async (transaction) => {
    const [lock] = await transaction.select({ locked: sql<boolean>`pg_try_advisory_lock(hashtext(${cleanupLockName}))` }).from(roadcasts).limit(1);
    if (!lock?.locked) return { deletedRoadcasts: 0, mediaToRemove: [] as Array<{ provider: "local" | "s3" | "youtube"; key: string }> };
    try {
      const expired = await transaction.select({ id: roadcasts.id }).from(roadcasts).where(and(eq(roadcasts.plan, "free"), lt(roadcasts.lastActivityAt, cutoff)));
      const mediaToRemove: Array<{ provider: "local" | "s3" | "youtube"; key: string }> = [];
      let deletedRoadcasts = 0;
      for (const roadcast of expired) {
        const attachedMedia = await transaction.select({ provider: media.provider, key: media.key }).from(media).where(eq(media.roadcastId, roadcast.id));
        const deleted = await transaction.delete(roadcasts).where(and(eq(roadcasts.id, roadcast.id), eq(roadcasts.plan, "free"), lt(roadcasts.lastActivityAt, cutoff))).returning({ id: roadcasts.id });
        if (!deleted.length) continue;
        deletedRoadcasts += 1;
        mediaToRemove.push(...attachedMedia);
      }
      return { deletedRoadcasts, mediaToRemove };
    } finally {
      await transaction.execute(sql`select pg_advisory_unlock(hashtext(${cleanupLockName}))`);
    }
  });

  const storage: Partial<Record<"local" | "s3", MediaStorage>> = {};
  for (const item of result.mediaToRemove) {
    const mediaStorage = storageFor(item.provider, storage);
    if (!mediaStorage) continue;
    try { await mediaStorage.remove(item.key); } catch { globalThis.console.error(`Impossible de supprimer le média expiré ${item.key}.`); }
  }
  return result;
}
