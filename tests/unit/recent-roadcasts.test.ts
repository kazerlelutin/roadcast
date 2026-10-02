import { describe, expect, it } from "bun:test";
import { readRecentRoadcasts, rememberRecentRoadcast } from "../../src/features/roadcast/recent-roadcasts.ctrl";

function memoryStorage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
}

describe("roadcasts récents", () => {
  it("reste limité au navigateur courant et met le dernier roadcast en tête", () => {
    const browser = memoryStorage();
    rememberRecentRoadcast({ slug: "aaaaaaaaaaaaaaaa", title: "Premier", lastActivityAt: "2026-10-01T10:00:00.000Z" }, browser);
    rememberRecentRoadcast({ slug: "bbbbbbbbbbbbbbbb", title: "Second", lastActivityAt: "2026-10-02T10:00:00.000Z" }, browser);
    rememberRecentRoadcast({ slug: "aaaaaaaaaaaaaaaa", title: "Premier renommé", lastActivityAt: "2026-10-03T10:00:00.000Z" }, browser);

    expect(readRecentRoadcasts(browser)).toEqual([
      { slug: "aaaaaaaaaaaaaaaa", title: "Premier renommé", lastActivityAt: "2026-10-03T10:00:00.000Z" },
      { slug: "bbbbbbbbbbbbbbbb", title: "Second", lastActivityAt: "2026-10-02T10:00:00.000Z" },
    ]);
  });

  it("ignore les entrées locales invalides", () => {
    const browser = memoryStorage();
    browser.setItem("roadcast-recent-roadcasts", JSON.stringify([{ slug: "../../admin", title: "Intrus", lastActivityAt: "invalid" }]));
    expect(readRecentRoadcasts(browser)).toEqual([]);
  });
});
