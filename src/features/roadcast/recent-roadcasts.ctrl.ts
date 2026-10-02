export type RecentRoadcast = { slug: string; title: string; lastActivityAt: string; };

type BrowserStorage = { getItem: (key: string) => string | null; setItem: (key: string, value: string) => void; };

const recentRoadcastsKey = "roadcast-recent-roadcasts";
const maxRecentRoadcasts = 12;
const slugPattern = /^[a-zA-Z0-9_-]{8,120}$/;

function storage(): BrowserStorage | null {
  try { return globalThis.localStorage; } catch { return null; }
}

function normalize(value: unknown): RecentRoadcast | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<RecentRoadcast>;
  if (typeof item.slug !== "string" || !slugPattern.test(item.slug) || typeof item.title !== "string") return null;
  const title = item.title.trim().slice(0, 140);
  if (!title) return null;
  const lastActivityAt = typeof item.lastActivityAt === "string" && !Number.isNaN(new Date(item.lastActivityAt).getTime()) ? item.lastActivityAt : new Date(0).toISOString();
  return { slug: item.slug, title, lastActivityAt };
}

export function readRecentRoadcasts(browserStorage = storage()): RecentRoadcast[] {
  if (!browserStorage) return [];
  try {
    const value = JSON.parse(browserStorage.getItem(recentRoadcastsKey) ?? "[]");
    return Array.isArray(value) ? value.map(normalize).filter((item): item is RecentRoadcast => item !== null).sort((left, right) => right.lastActivityAt.localeCompare(left.lastActivityAt)).slice(0, maxRecentRoadcasts) : [];
  } catch {
    return [];
  }
}

export function rememberRecentRoadcast(roadcast: { slug: string; title: string; lastActivityAt?: string | null }, browserStorage = storage()): RecentRoadcast[] {
  const item = normalize({ ...roadcast, lastActivityAt: roadcast.lastActivityAt ?? new Date().toISOString() });
  if (!item) return readRecentRoadcasts(browserStorage);
  const recent = [item, ...readRecentRoadcasts(browserStorage).filter((current) => current.slug !== item.slug)].slice(0, maxRecentRoadcasts);
  if (!browserStorage) return recent;
  try { browserStorage.setItem(recentRoadcastsKey, JSON.stringify(recent)); } catch { /* Le navigateur peut refuser le stockage local. */ }
  return recent;
}
