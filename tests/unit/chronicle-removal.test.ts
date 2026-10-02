import { describe, expect, it } from "bun:test";
import { removeChronicle } from "../../src/features/roadcast/chronicle-removal.ctrl";

const chronicles = [
  { id: "one", title: "Une", document: "<p>Une</p>", author: "Camille", versions: [] },
  { id: "two", title: "Deux", document: "<p>Deux</p>", author: "Alex", versions: [] },
];

describe("suppression de chronique", () => {
  it("sélectionne une chronique restante quand la sélection est supprimée", () => {
    const result = removeChronicle(chronicles, "one", "one");
    expect(result.chronicles).toHaveLength(1);
    expect(result.selectedChronicleId).toBe("two");
  });

  it("préserve la dernière chronique", () => {
    const result = removeChronicle([chronicles[0]], "one", "one");
    expect(result.chronicles).toHaveLength(1);
    expect(result.selectedChronicleId).toBe("one");
  });
});
