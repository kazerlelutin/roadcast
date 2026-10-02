import { expect, test } from "bun:test";
import { expiredRoadcastCutoff } from "../../src/features/roadcast/expired-roadcasts.server";

test("calcule une expiration Free après 45 jours", () => {
  expect(expiredRoadcastCutoff(new Date("2026-10-02T12:00:00.000Z")).toISOString()).toBe("2026-08-18T12:00:00.000Z");
});
