import { describe, expect, it } from "bun:test";
import { workspaceInput } from "../../src/features/roadcast/workspace-persistence.types";

const chronicle = { id: "chronicle-1", title: "Bienvenue", author: "Camille", document: "<p>Texte</p>", versions: [] };

describe("persistance PostgreSQL du roadcast", () => {
  it("accepte les chroniques, leurs auteurs et leurs versions", () => {
    expect(workspaceInput.parse({ slug: "demo-123", title: "Démo", chronicles: [chronicle] })).toMatchObject({ chronicles: [chronicle] });
  });
});
