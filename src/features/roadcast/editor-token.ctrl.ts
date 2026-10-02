export function createRoadcastEditorToken(uuid = globalThis.crypto.randomUUID()) {
  return uuid.replaceAll("-", "");
}
