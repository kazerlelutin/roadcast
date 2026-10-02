import { expect, test } from "bun:test";
import { assertMediaInput } from "../../src/features/media/media-storage.ctrl";
test("refuse les types de fichier non média", () => expect(() => assertMediaInput("text/html", 12)).toThrow());
test("refuse les médias vides", () => expect(() => assertMediaInput("image/png", 0)).toThrow());
