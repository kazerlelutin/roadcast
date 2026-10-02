import { defineWebSocketHandler, type WebSocketPeer } from "h3";
import { type ChronicleLock, parseChronicleLockMessage } from "./chronicle-lock.ctrl";

const locksByWorkspace = new Map<string, Map<string, ChronicleLock>>();
const sessionByPeer = new WeakMap<WebSocketPeer, string>();

function workspaceFor(peer: WebSocketPeer): string | null {
  const workspace = new globalThis.URL(peer.request.url).searchParams.get("workspace");
  return workspace && /^[a-z0-9-]{1,128}$/i.test(workspace) ? workspace : null;
}

function topic(workspace: string) { return `collaboration:${workspace}`; }

function locksFor(workspace: string) {
  const locks = locksByWorkspace.get(workspace) ?? new Map<string, ChronicleLock>();
  locksByWorkspace.set(workspace, locks);
  for (const [chronicleId, lock] of locks) if (lock.expiresAt <= Date.now()) locks.delete(chronicleId);
  return [...locks.values()];
}

function snapshot(workspace: string) { return JSON.stringify({ type: "locks", payload: { locks: locksFor(workspace) } }); }
function publishSnapshot(peer: WebSocketPeer, workspace: string) { peer.publish(topic(workspace), snapshot(workspace)); }

export default defineWebSocketHandler({
  open(peer) {
    const workspace = workspaceFor(peer);
    if (!workspace) { peer.close(1008, "Invalid workspace"); return; }
    peer.subscribe(topic(workspace));
    peer.send(snapshot(workspace));
  },
  message(peer, message) {
    const workspace = workspaceFor(peer);
    if (!workspace) { peer.close(1008, "Invalid workspace"); return; }
    try {
      const parsed = parseChronicleLockMessage(message.json());
      if (!parsed) { peer.close(1008, "Invalid collaboration payload"); return; }
      if (parsed.type === "sync") { peer.send(snapshot(workspace)); return; }
      if (parsed.type === "locks") { peer.close(1008, "Invalid collaboration payload"); return; }
      const locks = locksByWorkspace.get(workspace) ?? new Map<string, ChronicleLock>();
      locksByWorkspace.set(workspace, locks);
      locksFor(workspace);
      if (parsed.type === "lock") {
        sessionByPeer.set(peer, parsed.payload.ownerId);
        const existing = locks.get(parsed.payload.chronicleId);
        if (!existing || existing.ownerId === parsed.payload.ownerId) {
          locks.set(parsed.payload.chronicleId, { ...parsed.payload, expiresAt: Date.now() + 12_000 });
          publishSnapshot(peer, workspace);
        } else peer.send(snapshot(workspace));
        return;
      }
      const existing = locks.get(parsed.payload.chronicleId);
      if (existing?.ownerId === parsed.payload.ownerId) { locks.delete(parsed.payload.chronicleId); publishSnapshot(peer, workspace); }
      else peer.send(snapshot(workspace));
    } catch { peer.close(1008, "Invalid collaboration payload"); }
  },
  close(peer) {
    const workspace = workspaceFor(peer);
    const sessionId = sessionByPeer.get(peer);
    if (!workspace || !sessionId) return;
    const locks = locksByWorkspace.get(workspace);
    if (!locks) return;
    let changed = false;
    for (const [chronicleId, lock] of locks) if (lock.ownerId === sessionId) { locks.delete(chronicleId); changed = true; }
    if (changed) publishSnapshot(peer, workspace);
  },
});
