export function removeChronicle<T extends { id: string }>(items: T[], id: string, selectedId: string) {
  const index = items.findIndex((item) => item.id === id);
  if (items.length <= 1 || index < 0) return { chronicles: items, selectedChronicleId: selectedId };
  const chronicles = items.filter((item) => item.id !== id);
  const next = chronicles[Math.min(index, chronicles.length - 1)];
  return { chronicles, selectedChronicleId: selectedId === id ? next.id : selectedId };
}
