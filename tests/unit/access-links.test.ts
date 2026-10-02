import { describe, expect, it } from "bun:test";
import { createRoadcastAccessLinks, isRoadcastAccessLinks } from "../../src/features/roadcast/access-links.ctrl";

describe("roadcast access links", () => {
  it("creates separate opaque tokens for edit-independent public modes", () => {
    const links = createRoadcastAccessLinks();

    expect(isRoadcastAccessLinks(links)).toBe(true);
    expect(new Set([links.read, links.sliders.alpha, links.sliders.bravo, links.sliders.charly]).size).toBe(4);
    expect(links.read).toMatch(/^[a-f0-9]{32}$/);
  });
});
