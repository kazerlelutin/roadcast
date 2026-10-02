export type ChronicleSnapshot = { title: string; author: string; document: string; };

export function isChronicleVersionSynced(current: ChronicleSnapshot, saved: ChronicleSnapshot | undefined) {
  return !!saved && saved.title === current.title && saved.author === current.author && saved.document === current.document;
}
