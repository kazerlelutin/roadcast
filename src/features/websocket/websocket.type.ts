import type { Ctrl } from "../routes/routes.type";

export type WebSocketCtrl = Ctrl & {
  createWebSocketConnection: () => WebSocket;
}