import { describe, expect, it } from "bun:test";
import { isStorageQuotaExceeded } from "../../src/features/roadcast/workspace-storage.ctrl";

describe("stockage de l’espace de travail", () => {
  it("identifie un quota de navigateur dépassé", () => {
    expect(isStorageQuotaExceeded(new globalThis.DOMException("plein", "QuotaExceededError"))).toBeTrue();
  });

  it("ne traite pas les autres erreurs comme un quota dépassé", () => {
    expect(isStorageQuotaExceeded(new Error("réseau"))).toBeFalse();
  });
});
