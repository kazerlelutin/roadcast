import { expect, test } from "bun:test";
import { createRoadcastInput } from "../../src/features/roadcast/roadcast.input";
import { createRoadcastEditorToken } from "../../src/features/roadcast/editor-token.ctrl";
test("valide la commande de création", () => expect(createRoadcastInput.parse({ title: "Chronique de rentrée", interactiveSlider: "bravo" })).toMatchObject({ interactiveSlider: "bravo" }));
test("rejette un titre vide", () => expect(() => createRoadcastInput.parse({ title: " " })).toThrow());
test("utilise un lien d’édition opaque, sans titre du roadcast", () => expect(createRoadcastEditorToken("9e850c6b-96cb-4fd8-b897-8ff7efab19ad")).toBe("9e850c6b96cb4fd8b8978ff7efab19ad"));
