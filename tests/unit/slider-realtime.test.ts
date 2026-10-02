import { expect, test } from "bun:test";
import { parseSliderBroadcastMessage } from "../../src/features/presentation/slider-realtime.ctrl";

test("accepte une diffusion texte et image sûre", () => {
  expect(parseSliderBroadcastMessage({ type: "broadcast", payload: { text: "Bonjour", images: ["https://cdn.example.test/image.webp"] } })).toEqual({ type: "broadcast", payload: { text: "Bonjour", images: ["https://cdn.example.test/image.webp"] } });
});

test("rejette un message websocket invalide", () => {
  expect(parseSliderBroadcastMessage({ type: "broadcast", payload: { text: "Bonjour", images: ["javascript:alert(1)"] } })).toBeNull();
});
