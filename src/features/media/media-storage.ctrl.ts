export type Upload = { key: string; body: Uint8Array; contentType: string };
export interface MediaStorage { put(upload: Upload): Promise<void>; remove(key: string): Promise<void>; url(key: string): Promise<string>; }
export function assertMediaInput(contentType: string, bytes: number) {
  if (!contentType.startsWith("image/") && !contentType.startsWith("audio/") && !contentType.startsWith("video/")) throw new Error("Type de média non autorisé");
  if (bytes <= 0) throw new Error("Média vide");
}
