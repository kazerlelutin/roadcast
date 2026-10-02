import { expect, test } from "bun:test";
import { youtubeEmbedUrl } from "../../src/features/media/youtube.ctrl";

test("transforme une URL YouTube en diffusion automatique sans contrôles", () => {
  expect(youtubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")?.replace(/&/g, "&")).toContain("autoplay=1");
  expect(youtubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toContain("controls=0");
});

test("refuse une URL qui nest pas YouTube", () => expect(youtubeEmbedUrl("https://example.test/video")).toBeNull());
