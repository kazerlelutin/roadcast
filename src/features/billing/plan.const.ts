export type Plan = "free" | "complete";
export const planLimits = {
  free: { roadcasts: 25, blocksPerChronicle: 250, media: 100, mediaBytes: 1_000_000_000, inactiveDays: 90 },
  complete: { roadcasts: 250, blocksPerChronicle: 2_000, media: 2_000, mediaBytes: 25_000_000_000, inactiveDays: null },
} as const;
export function hasReachedLimit(plan: Plan, kind: "roadcasts" | "media", current: number) { return current >= planLimits[plan][kind]; }
