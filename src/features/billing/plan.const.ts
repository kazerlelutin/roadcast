export type Plan = "free" | "complete";
export const planLimits = {
  free: { roadcasts: 25, charactersPerRoadcast: 100_000, media: 100, mediaBytes: 500_000_000, inactiveDays: 90 },
  complete: { roadcasts: 250, charactersPerRoadcast: 2_000_000, media: 2_000, mediaBytes: 25_000_000_000, inactiveDays: null },
} as const;
export function hasReachedLimit(plan: Plan, kind: "roadcasts" | "media", current: number) { return current >= planLimits[plan][kind]; }
