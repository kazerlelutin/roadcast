export type Slider = "alpha" | "bravo" | "charly";
export type BroadcastPayload = { text: string; images: string[]; };
export type SliderBroadcastMessage = { type: "broadcast"; payload: BroadcastPayload; };

const maximumTextLength = 20_000;
const maximumImages = 12;
const maximumImageSourceLength = 8_000_000;

function isImageSource(value: unknown): value is string {
  return typeof value === "string" && value.length <= maximumImageSourceLength && (/^https?:\/\//.test(value) || /^data:image\/(png|jpe?g|webp|gif);base64,/.test(value));
}

export function parseSliderBroadcastMessage(value: unknown): SliderBroadcastMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as { type?: unknown; payload?: { text?: unknown; images?: unknown; }; };
  if (message.type !== "broadcast" || !message.payload || typeof message.payload.text !== "string" || message.payload.text.length > maximumTextLength || !Array.isArray(message.payload.images) || message.payload.images.length > maximumImages || !message.payload.images.every(isImageSource)) return null;
  return { type: "broadcast", payload: { text: message.payload.text, images: message.payload.images } };
}

export type SliderRealtimeClient = { publish: (payload: BroadcastPayload) => void; close: () => void; };

function socketUrl(token: string): string {
  const url = new globalThis.URL("/ws/slider", globalThis.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("token", token);
  return url.toString();
}

export function connectSliderRealtime(token: string, onBroadcast: (payload: BroadcastPayload) => void): SliderRealtimeClient {
  let socket: InstanceType<typeof globalThis.WebSocket> | undefined;
  let pending: BroadcastPayload | undefined;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let closed = false;

  const sendPending = () => {
    if (!pending || socket?.readyState !== globalThis.WebSocket.OPEN) return;
    const message = parseSliderBroadcastMessage({ type: "broadcast", payload: pending });
    if (message) socket.send(JSON.stringify(message));
    pending = undefined;
  };

  const connect = () => {
    if (closed) return;
    socket = new globalThis.WebSocket(socketUrl(token));
    socket.addEventListener("open", sendPending);
    socket.addEventListener("message", (event) => {
      try {
        const message = parseSliderBroadcastMessage(JSON.parse(String(event.data)));
        if (message) onBroadcast(message.payload);
      } catch { /* Ignore malformed messages from the network. */ }
    });
    socket.addEventListener("close", () => {
      if (!closed) retry = setTimeout(connect, 1_000);
    });
  };

  connect();
  return {
    publish(payload) {
      pending = payload;
      sendPending();
    },
    close() {
      closed = true;
      if (retry) globalThis.clearTimeout(retry);
      socket?.close();
    },
  };
}
