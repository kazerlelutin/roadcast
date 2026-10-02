import { describe, expect, it } from "bun:test";
import { calculateRoadcastUsage } from "../../src/features/roadcast/roadcast-usage.ctrl";

describe("usage du roadcast", () => {
  it("cumule les caractères de toutes les chroniques", () => {
    const usage = calculateRoadcastUsage([{ document: "<p>Bonjour</p>" }, { document: "<p>à toutes</p>" }]);
    expect(usage.characterCount).toBe(15);
  });

  it("cumule la taille des médias intégrés", () => {
    const usage = calculateRoadcastUsage([{ document: '<img src="data:image/png;base64,QUJD" />' }, { document: '<img src="data:image/png;base64,REVG" />' }]);
    expect(usage.mediaBytes).toBe(6);
  });
});
