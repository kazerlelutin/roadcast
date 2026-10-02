import type { Slider } from "../presentation/slider-realtime.ctrl";

export type RoadcastAccessLinks = { read: string; sliders: Record<Slider, string>; };

function token(): string {
  return globalThis.crypto.randomUUID().replaceAll("-", "");
}

export function createRoadcastAccessLinks(): RoadcastAccessLinks {
  return { read: token(), sliders: { alpha: token(), bravo: token(), charly: token() } };
}

export function isRoadcastAccessLinks(value: unknown): value is RoadcastAccessLinks {
  if (!value || typeof value !== "object") return false;
  const links = value as Partial<RoadcastAccessLinks>;
  return typeof links.read === "string" && !!links.sliders && (["alpha", "bravo", "charly"] as const).every((slider) => typeof links.sliders?.[slider] === "string");
}
