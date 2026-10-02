import { defineWebSocketHandler, type WebSocketPeer } from "h3";
import { type BroadcastPayload, parseSliderBroadcastMessage, type SliderBroadcastMessage } from "./slider-realtime.ctrl";

const latestPayloadByToken = new Map<string, BroadcastPayload>();

function tokenFor(peer: WebSocketPeer): string | null {
  const token = new globalThis.URL(peer.request.url).searchParams.get("token");
  return token && /^[a-z0-9-]{1,128}$/i.test(token) ? token : null;
}

function topic(token: string) { return `slider:${token}`; }

function messageFor(payload: BroadcastPayload): SliderBroadcastMessage {
  return { type: "broadcast", payload };
}

export default defineWebSocketHandler({
  open(peer) {
    const token = tokenFor(peer);
    if (!token) { peer.close(1008, "Invalid slider token"); return; }
    peer.subscribe(topic(token));
    const latest = latestPayloadByToken.get(token);
    if (latest) peer.send(JSON.stringify(messageFor(latest)));
  },
  message(peer, message) {
    const token = tokenFor(peer);
    if (!token) { peer.close(1008, "Invalid slider token"); return; }
    try {
      const update = parseSliderBroadcastMessage(message.json());
      if (!update) { peer.close(1008, "Invalid broadcast payload"); return; }
      if (update.type === "clear") latestPayloadByToken.delete(token);
      else latestPayloadByToken.set(token, update.payload);
      peer.publish(topic(token), JSON.stringify(update));
    } catch { peer.close(1008, "Invalid broadcast payload"); }
  },
});
