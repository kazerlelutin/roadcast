import type { Slider } from "../presentation/slider-realtime.ctrl";

export type RoadcastAccessLinks = { read: string; sliders: Record<Slider, string>; };
export const emptyRoadcastAccessLinks: RoadcastAccessLinks = { read: "", sliders: { alpha: "", bravo: "", charly: "" } };

export function isRoadcastAccessLinks(value: unknown): value is RoadcastAccessLinks {
  if (!value || typeof value !== "object") return false;
  const links = value as Partial<RoadcastAccessLinks>;
  return typeof links.read === "string" && links.read.length > 0 && !!links.sliders && (["alpha", "bravo", "charly"] as const).every((slider) => typeof links.sliders?.[slider] === "string" && links.sliders[slider].length > 0);
}
