export type Presence = { memberId: string; displayName: string; connectedAt: Date };
export function claimChronicleName(existing: Presence[], requested: string, memberId: string): string {
  const base = requested.trim().slice(0, 60) || "Chroniqueur";
  const occupied = new Set(existing.filter((presence) => presence.memberId !== memberId).map((presence) => presence.displayName.toLocaleLowerCase("fr")));
  if (!occupied.has(base.toLocaleLowerCase("fr"))) return base;
  let sequence = 2;
  while (occupied.has(`${base} ${sequence}`.toLocaleLowerCase("fr"))) sequence += 1;
  return `${base} ${sequence}`;
}
