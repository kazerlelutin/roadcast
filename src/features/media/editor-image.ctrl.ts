import { assertMediaInput } from "./media-storage.ctrl";

export const maximumEditorImageBytes = 5 * 1024 * 1024;

const editorImageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export function assertEditorImageInput(contentType: string, bytes: number) {
  assertMediaInput(contentType, bytes);
  if (!editorImageTypes.has(contentType) || bytes > maximumEditorImageBytes) throw new Error("Choisissez une image PNG, JPEG, WebP ou GIF de moins de 5 Mo.");
}

export function isBroadcastImageSource(value: string): boolean {
  return value.length <= 8_000_000 && (/^https?:\/\//.test(value) || /^data:image\/(png|jpe?g|webp|gif);base64,/.test(value));
}
