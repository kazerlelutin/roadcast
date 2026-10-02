export type WorkspaceUpdate = { workspace: string; sourceId?: string; };
type WorkspaceUpdateBus = { listeners: Set<(update: WorkspaceUpdate) => void>; };

function bus(): WorkspaceUpdateBus {
  const scope = globalThis as typeof globalThis & { __roadcastWorkspaceUpdates?: WorkspaceUpdateBus; };
  scope.__roadcastWorkspaceUpdates ??= { listeners: new Set() };
  return scope.__roadcastWorkspaceUpdates;
}

export function announceWorkspaceUpdate(update: WorkspaceUpdate) {
  for (const listener of bus().listeners) listener(update);
}

export function subscribeWorkspaceUpdates(listener: (update: WorkspaceUpdate) => void) {
  bus().listeners.add(listener);
  return () => bus().listeners.delete(listener);
}
