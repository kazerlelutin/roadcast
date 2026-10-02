export type ChronicleLock = { chronicleId: string; name: string; ownerId: string; expiresAt: number; };
type LockRequest = { type: "lock"; payload: { chronicleId: string; name: string; ownerId: string; }; };
type ReleaseRequest = { type: "release"; payload: { chronicleId: string; ownerId: string; }; };
type SyncRequest = { type: "sync"; };
export type ChronicleLockMessage = LockRequest | ReleaseRequest | SyncRequest | { type: "locks"; payload: { locks: ChronicleLock[]; }; };

const lockDurationMs = 12_000;

function validId(value: unknown): value is string { return typeof value === "string" && /^[a-z0-9-]{1,128}$/i.test(value); }
function validName(value: unknown): value is string { return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 60; }

export function parseChronicleLockMessage(value: unknown): ChronicleLockMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as { type?: unknown; payload?: { chronicleId?: unknown; name?: unknown; ownerId?: unknown; locks?: unknown; }; };
  const payload = message.payload;
  if (message.type === "sync") return { type: "sync" };
  if (message.type === "lock" && payload && validId(payload.chronicleId) && validName(payload.name) && validId(payload.ownerId)) return { type: "lock", payload: { chronicleId: payload.chronicleId, name: payload.name.trim(), ownerId: payload.ownerId } };
  if (message.type === "release" && payload && validId(payload.chronicleId) && validId(payload.ownerId)) return { type: "release", payload: { chronicleId: payload.chronicleId, ownerId: payload.ownerId } };
  if (message.type !== "locks" || !payload || !Array.isArray(payload.locks)) return null;
  const locks = payload.locks.filter((lock): lock is ChronicleLock => !!lock && typeof lock === "object" && validId((lock as ChronicleLock).chronicleId) && validName((lock as ChronicleLock).name) && validId((lock as ChronicleLock).ownerId) && typeof (lock as ChronicleLock).expiresAt === "number");
  return locks.length === payload.locks.length ? { type: "locks", payload: { locks } } : null;
}

function socketUrl(workspace: string): string {
  const url = new globalThis.URL("/ws/collaboration", globalThis.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.searchParams.set("workspace", workspace);
  return url.toString();
}

function sessionId() { return globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}-${Math.random().toString(36).slice(2)}`; }

export type ChronicleLockClient = { sessionId: string; claim: (chronicleId: string, name: string) => void; release: (chronicleId: string) => void; close: () => void; };

export function connectChronicleLocks(workspace: string, onLocks: (locks: ChronicleLock[]) => void): ChronicleLockClient {
  const ownerId = sessionId();
  let locks: ChronicleLock[] = [];
  let socket: InstanceType<typeof globalThis.WebSocket> | undefined;
  let pending: ChronicleLockMessage | undefined;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let closed = false;
  const localChannel = typeof globalThis.BroadcastChannel === "function" ? new globalThis.BroadcastChannel(`roadcast-locks:${workspace}`) : undefined;

  const publishLocks = () => onLocks(locks.filter((lock) => lock.expiresAt > Date.now()));
  const replaceLocks = (next: ChronicleLock[]) => { locks = next.filter((lock) => lock.expiresAt > Date.now()); publishLocks(); };
  const applyLocalRequest = (message: ChronicleLockMessage) => {
    if (message.type === "lock") {
      const existing = locks.find((lock) => lock.chronicleId === message.payload.chronicleId && lock.expiresAt > Date.now());
      if (!existing || existing.ownerId === message.payload.ownerId) replaceLocks([...locks.filter((lock) => lock.chronicleId !== message.payload.chronicleId), { ...message.payload, expiresAt: Date.now() + lockDurationMs }]);
    }
    if (message.type === "release") replaceLocks(locks.filter((lock) => lock.chronicleId !== message.payload.chronicleId || lock.ownerId !== message.payload.ownerId));
  };
  const send = (message: ChronicleLockMessage) => {
    pending = message;
    if (socket?.readyState === globalThis.WebSocket.OPEN) { socket.send(JSON.stringify(message)); pending = undefined; }
    applyLocalRequest(message);
    localChannel?.postMessage(message);
  };
  const sendSnapshot = () => localChannel?.postMessage({ type: "locks", payload: { locks } });
  localChannel?.addEventListener("message", (event) => {
    const message = parseChronicleLockMessage(event.data);
    if (!message) return;
    if (message.type === "sync") { sendSnapshot(); return; }
    if (message.type === "locks") { replaceLocks(message.payload.locks); return; }
    applyLocalRequest(message);
  });

  const connect = () => {
    if (closed) return;
    socket = new globalThis.WebSocket(socketUrl(workspace));
    socket.addEventListener("open", () => {
      if (pending) { socket?.send(JSON.stringify(pending)); pending = undefined; }
    });
    socket.addEventListener("message", (event) => {
      try {
        const message = parseChronicleLockMessage(JSON.parse(String(event.data)));
        if (message?.type === "locks") replaceLocks(message.payload.locks);
      } catch { /* Ignore malformed network messages. */ }
    });
    socket.addEventListener("close", () => { if (!closed) retry = setTimeout(connect, 1_000); });
  };

  if (!import.meta.env.DEV) connect();
  localChannel?.postMessage({ type: "sync" });
  return {
    sessionId: ownerId,
    claim(chronicleId, name) { if (validId(chronicleId) && validName(name)) send({ type: "lock", payload: { chronicleId, name: name.trim(), ownerId } }); },
    release(chronicleId) { if (validId(chronicleId)) send({ type: "release", payload: { chronicleId, ownerId } }); },
    close() { closed = true; if (retry) globalThis.clearTimeout(retry); socket?.close(); localChannel?.close(); },
  };
}
