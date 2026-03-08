import { createStore } from "@utils/proxy-sub";

// Types pour les rooms et callbacks
type RoomCallback = (data: any) => void;
type RoomSubscriptions = Map<string, Set<RoomCallback>>;


export const websocketStore = createStore<{
  socket: WebSocket | null;
  isConnected: boolean;
  subscriptions: RoomSubscriptions;
}>({
  socket: null,
  isConnected: false,
  subscriptions: new Map(),
}, {
  notifyOnProps: ['socket', 'isConnected'],
  transformData: (_prop, value) => value
});

// API pour gérer les rooms
export const websocketAPI = {
  // S'abonner à une room
  subscribe(room: string, callback: RoomCallback) {
    if (!websocketStore.subscriptions.has(room)) {
      websocketStore.subscriptions.set(room, new Set());
    }
    websocketStore.subscriptions.get(room)!.add(callback);

    // Envoyer la souscription au serveur si connecté
    if (websocketStore.isConnected && websocketStore.socket) {
      websocketStore.socket.send(JSON.stringify({
        type: 'subscribe',
        room: room
      }));
    }
  },

  // Se désabonner d'une room
  unsubscribe(room: string, callback: RoomCallback) {
    const roomSubs = websocketStore.subscriptions.get(room);
    if (roomSubs) {
      roomSubs.delete(callback);
      if (roomSubs.size === 0) {
        websocketStore.subscriptions.delete(room);
        // Envoyer la désinscription au serveur
        if (websocketStore.isConnected && websocketStore.socket) {
          websocketStore.socket.send(JSON.stringify({
            type: 'unsubscribe',
            room: room
          }));
        }
      }
    }
  },

  // Envoyer un message à une room
  sendToRoom(room: string, data: any) {

    if (websocketStore.isConnected && websocketStore.socket) {
      websocketStore.socket.send(JSON.stringify({
        type: 'message',
        room: room,
        data: data
      }));
    }
  },

  // Envoyer un message général
  send(data: any) {
    if (websocketStore.isConnected && websocketStore.socket) {
      websocketStore.socket.send(JSON.stringify({
        type: 'general',
        data: data
      }));
    }
  }
};