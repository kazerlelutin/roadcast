import { describe, expect, it } from "bun:test";
import { parseChronicleLockMessage } from "../../src/features/collaboration/chronicle-lock.ctrl";

describe("verrou de chronique", () => {
  it("accepte une demande de verrouillage nommée", () => {
    const message = parseChronicleLockMessage({ type: "lock", payload: { chronicleId: "welcome", ownerId: "session-1", name: "Camille" } });
    expect(message).toEqual({ type: "lock", payload: { chronicleId: "welcome", ownerId: "session-1", name: "Camille" } });
  });

  it("refuse les verrouillages anonymes ou malformés", () => {
    expect(parseChronicleLockMessage({ type: "lock", payload: { chronicleId: "welcome", ownerId: "session-1", name: "" } })).toBeNull();
    expect(parseChronicleLockMessage({ type: "lock", payload: { chronicleId: "welcome!", ownerId: "session-1", name: "Camille" } })).toBeNull();
  });
});
