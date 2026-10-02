import { expect, test } from "bun:test";
import { parseSliderBroadcastMessage } from "../../src/features/presentation/slider-realtime.ctrl";

test("accepte une diffusion texte et image sûre", () => {
  expect(parseSliderBroadcastMessage({ type: "broadcast", payload: { text: "Bonjour", images: ["https://cdn.example.test/image.webp"] } })).toEqual({ type: "broadcast", payload: { text: "Bonjour", images: ["https://cdn.example.test/image.webp"], videos: [] } });
});

test("accepte une vidéo YouTube de diffusion sans contrôles", () => {
  const video = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&mute=1";
  const message = parseSliderBroadcastMessage({ type: "broadcast", payload: { text: "", images: [], videos: [video] } });
  expect(message?.type === "broadcast" ? message.payload.videos : []).toEqual([video]);
});

test("accepte leffacement dun slider", () => {
  expect(parseSliderBroadcastMessage({ type: "clear" })).toEqual({ type: "clear" });
});

test("rejette un message websocket invalide", () => {
  expect(parseSliderBroadcastMessage({ type: "broadcast", payload: { text: "Bonjour", images: ["javascript:alert(1)"] } })).toBeNull();
});
