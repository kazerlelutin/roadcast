import { describe, expect, it } from "bun:test";
import { isChronicleVersionSynced } from "../../src/features/chronicle/chronicle-version.ctrl";

const version = { title: "Bienvenue", author: "Camille", document: "<p>Bonjour</p>" };

describe("état de version", () => {
  it("signale une saisie identique à la dernière version", () => {
    expect(isChronicleVersionSynced(version, version)).toBeTrue();
  });

  it("signale une modification de titre, auteur ou contenu", () => {
    expect(isChronicleVersionSynced({ ...version, title: "Ouverture" }, version)).toBeFalse();
    expect(isChronicleVersionSynced({ ...version, author: "Alex" }, version)).toBeFalse();
    expect(isChronicleVersionSynced({ ...version, document: "<p>Salut</p>" }, version)).toBeFalse();
  });
});
