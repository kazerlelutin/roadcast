import { expect, test } from "bun:test";
import { claimChronicleName } from "../../src/features/collaboration/collaboration.ctrl";
test("propose un nom unique au chroniqueur", () => expect(claimChronicleName([{ memberId: "a", displayName: "Camille", connectedAt: new Date() }], "Camille", "b")).toBe("Camille 2"));
