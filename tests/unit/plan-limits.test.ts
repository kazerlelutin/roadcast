import { describe, expect, it } from "bun:test";
import { planLimits } from "../../src/features/billing/plan.const";

describe("limites de l’offre gratuite", () => {
  it("limite la taille totale des médias d’un roadcast à 100 Mo", () => {
    expect(planLimits.free.mediaBytes).toBe(100_000_000);
  });
});
