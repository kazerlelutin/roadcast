export type Slider = "alpha" | "bravo" | "charly";
export type BroadcastPayload = { text: string; images: string[]; videos: string[]; };
export type SliderBroadcastMessage = { type: "broadcast"; payload: BroadcastPayload; };
export type SliderClearMessage = { type: "clear"; };
export type SliderRealtimeMessage = SliderBroadcastMessage | SliderClearMessage;

const maximumTextLength = 20_000;
const maximumImages = 12;
const maximumVideos = 3;
const maximumImageSourceLength = 8_000_000;

function isImageSource(value: unknown): value is string {
  return typeof value === "string" && value.length <= maximumImageSourceLength && (/^https?:\/\//.test(value) || /^data:image\/(png|jpe?g|webp|gif);base64,/.test(value));
}

function isVideoSource(value: unknown): value is string {
  return typeof value === "string" && value.length <= 2_000 && /^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}\?/.test(value);
}

export function parseSliderBroadcastMessage(value: unknown): SliderRealtimeMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as { type?: unknown; payload?: { text?: unknown; images?: unknown; videos?: unknown; }; };
  if (message.type === "clear" && message.payload === undefined) return { type: "clear" };
  const videos = message.payload?.videos ?? [];
  if (message.type !== "broadcast" || !message.payload || typeof message.payload.text !== "string" || message.payload.text.length > maximumTextLength || !Array.isArray(message.payload.images) || message.payload.images.length > maximumImages || !message.payload.images.every(isImageSource) || !Array.isArray(videos) || videos.length > maximumVideos || !videos.every(isVideoSource)) return null;
  return { type: "broadcast", payload: { text: message.payload.text, images: message.payload.images, videos } };
}

export type SliderRealtimeClient = { publish: (payload: BroadcastPayload) => void; clear: () => void; close: () => void; };

function socketUrl(token: string): string {
  const url = new globalThis.URL("/ws/slider", globalThis.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("token", token);
  return url.toString();
}

export function connectSliderRealtime(token: string, onBroadcast: (payload: BroadcastPayload | null) => void): SliderRealtimeClient {
  let socket: InstanceType<typeof globalThis.WebSocket> | undefined;
  let pending: SliderRealtimeMessage | undefined;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let closed = false;
  const localChannel = typeof globalThis.BroadcastChannel === "function" ? new globalThis.BroadcastChannel(`roadcast-slider:${token}`) : undefined;

  localChannel?.addEventListener("message", (event) => {
    const message = parseSliderBroadcastMessage(event.data);
    if (message) onBroadcast(message.type === "broadcast" ? message.payload : null);
  });

  const sendPending = () => {
    if (!pending || socket?.readyState !== globalThis.WebSocket.OPEN) return;
    socket.send(JSON.stringify(pending));
    pending = undefined;
  };

  const connect = () => {
    if (closed) return;
    socket = new globalThis.WebSocket(socketUrl(token));
    socket.addEventListener("open", sendPending);
    socket.addEventListener("message", (event) => {
      try {
        const message = parseSliderBroadcastMessage(JSON.parse(String(event.data)));
        if (message) onBroadcast(message.type === "broadcast" ? message.payload : null);
      } catch { /* Ignore malformed messages from the network. */ }
    });
    socket.addEventListener("close", () => {
      if (!closed) retry = setTimeout(connect, 1_000);
    });
  };

  connect();
  return {
    publish(payload) {
      pending = { type: "broadcast", payload };
      localChannel?.postMessage({ type: "broadcast", payload });
      sendPending();
    },
    clear() {
      pending = { type: "clear" };
      localChannel?.postMessage(pending);
      sendPending();
    },
    close() {
      closed = true;
      if (retry) globalThis.clearTimeout(retry);
      socket?.close();
      localChannel?.close();
    },
  };
}
