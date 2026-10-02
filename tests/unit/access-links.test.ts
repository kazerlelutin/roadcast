import { describe, expect, it } from "bun:test";
import { emptyRoadcastAccessLinks, isRoadcastAccessLinks } from "../../src/features/roadcast/access-links.ctrl";

describe("roadcast access links", () => {
  it("does not provide browser-generated public tokens before the server responds", () => {
    expect(emptyRoadcastAccessLinks.read).toBe("");
    expect(isRoadcastAccessLinks(emptyRoadcastAccessLinks)).toBe(false);
  });
});
