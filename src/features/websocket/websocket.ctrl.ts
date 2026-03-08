import type { WebSocketCtrl } from "./websocket.type";
import { websocketStore } from "./websocket.store";

const websocketCtrl: WebSocketCtrl = {
  createWebSocketConnection(): WebSocket {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    try {
      return new WebSocket(wsUrl);
    } catch (error) {
      console.error('Erreur lors de la création du WebSocket:', error);
      throw error;
    }
  },
  init: () => {
    const socket = websocketCtrl.createWebSocketConnection();
    websocketStore.socket = socket;

    socket.onopen = () => {
      websocketStore.isConnected = true;
      websocketStore.subscriptions.forEach((_, room) => {

        socket.send(JSON.stringify({
          type: 'subscribe',
          room: room
        }));
      });
    }

    socket.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type.match(/message|download-progress/i) && message.room) {
          const roomSubs = websocketStore.subscriptions.get(message.room);
          if (roomSubs) {
            roomSubs.forEach(callback => callback(message.data));
          }
        } else if (message.type === 'general') {
          console.log('📨 Message général:', message.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    socket.onclose = () => {
      console.log('🔌 WebSocket déconnecté');
      websocketStore.isConnected = false;
    }

    socket.onerror = (event: Event) => {
      console.error('❌ Erreur WebSocket:', event);
    }
  },

  cleanUp: () => {
    if (websocketStore.socket) {
      websocketStore.socket.close();
      websocketStore.socket = null;
      websocketStore.isConnected = false;
    }
  }
}

export default websocketCtrl;