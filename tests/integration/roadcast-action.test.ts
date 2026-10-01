import { expect, test } from "bun:test";
import { createRoadcastInput } from "../../src/features/roadcast/roadcast.input";
test("valide la commande de création", () => expect(createRoadcastInput.parse({ title: "Chronique de rentrée", interactiveSlider: "bravo" })).toMatchObject({ interactiveSlider: "bravo" }));
test("rejette un titre vide", () => expect(() => createRoadcastInput.parse({ title: " " })).toThrow());
