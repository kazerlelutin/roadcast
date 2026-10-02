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

  it("accepte la notification de modifications d’un autre collaborateur", () => {
    expect(parseChronicleLockMessage({ type: "workspace-updated", payload: { sourceId: "session-2" } })).toEqual({ type: "workspace-updated", payload: { sourceId: "session-2" } });
  });

  it("refuse une notification de mise à jour malformée", () => {
    expect(parseChronicleLockMessage({ type: "workspace-updated", payload: { sourceId: "session!2" } })).toBeNull();
  });
});
