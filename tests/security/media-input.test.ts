import { expect, test } from "bun:test";
import { assertMediaInput } from "../../src/features/media/media-storage.ctrl";
import { remoteImageUrl } from "../../src/features/media/remote-image.ctrl";
test("refuse les types de fichier non média", () => expect(() => assertMediaInput("text/html", 12)).toThrow());
test("refuse les médias vides", () => expect(() => assertMediaInput("image/png", 0)).toThrow());
test("refuse une URL image locale", () => expect(() => remoteImageUrl("https://127.0.0.1/image.png")).toThrow());
test("refuse une URL image non chiffrée", () => expect(() => remoteImageUrl("http://images.example.test/photo.jpg")).toThrow());
