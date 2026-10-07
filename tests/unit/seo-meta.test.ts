import { expect, test } from "bun:test";
import { seoPageMetadata } from "../../src/features/seo/seo-meta.ctrl";

test("décrit les pages publiques avec une canonical et des aperçus de partage", () => {
  const metadata = seoPageMetadata("home");

  expect(metadata.title).toBe("Roadcast — Écrire, diffuser, partager");
  expect(metadata.canonical).toBe("https://roadcast.app/");
  expect(metadata.robots).toBe("index, follow");
});

test("empêche l’indexation sans exposer le chemin ou le jeton privé", () => {
  const metadata = seoPageMetadata("read");

  expect(metadata.robots).toBe("noindex, nofollow, noarchive");
  expect(metadata.canonical).toBeUndefined();
  expect(metadata.title).toBe("Lecture privée — Roadcast");
});
