import { expect, test } from "bun:test";
import { assertMediaInput } from "../../src/features/media/media-storage.ctrl";
import { assertEditorImageInput, isBroadcastImageSource } from "../../src/features/media/editor-image.ctrl";
import { remoteImageUrl } from "../../src/features/media/remote-image.ctrl";
test("refuse les types de fichier non média", () => expect(() => assertMediaInput("text/html", 12)).toThrow());
test("refuse les médias vides", () => expect(() => assertMediaInput("image/png", 0)).toThrow());
test("refuse les formats non rendus par l’éditeur et les images trop volumineuses", () => {
  expect(() => assertEditorImageInput("audio/mpeg", 12)).toThrow();
  expect(() => assertEditorImageInput("image/svg+xml", 12)).toThrow();
  expect(() => assertEditorImageInput("image/png", 5 * 1024 * 1024 + 1)).toThrow();
});
test("n’autorise à diffuser que des sources d’image sûres", () => {
  expect(isBroadcastImageSource("data:image/png;base64,QUJD")).toBe(true);
  expect(isBroadcastImageSource("https://images.example.test/photo.webp")).toBe(true);
  expect(isBroadcastImageSource("javascript:alert(1)")).toBe(false);
  expect(isBroadcastImageSource("data:image/svg+xml;base64,PHN2Zz4=")).toBe(false);
});
test("refuse une URL image locale", () => expect(() => remoteImageUrl("https://127.0.0.1/image.png")).toThrow());
test("refuse une URL image non chiffrée", () => expect(() => remoteImageUrl("http://images.example.test/photo.jpg")).toThrow());
