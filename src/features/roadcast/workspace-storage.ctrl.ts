const databaseName = "roadcast-workspaces";
const storeName = "workspaces";
type WorkspaceDatabase = InstanceType<typeof globalThis.IDBDatabase>;

function openDatabase(): Promise<WorkspaceDatabase> {
  return new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Impossible d’ouvrir le stockage local."));
  });
}

function read<T>(database: WorkspaceDatabase, key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, "readonly").objectStore(storeName).get(key);
    request.onsuccess = () => resolve((request.result as T | undefined) ?? null);
    request.onerror = () => reject(request.error ?? new Error("Impossible de lire le stockage local."));
  });
}

function write<T>(database: WorkspaceDatabase, key: string, value: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(value, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Impossible d’enregistrer le roadcast."));
    transaction.onabort = () => reject(transaction.error ?? new Error("Impossible d’enregistrer le roadcast."));
  });
}

export function isStorageQuotaExceeded(error: unknown) {
  return error instanceof globalThis.DOMException && error.name === "QuotaExceededError";
}

export async function loadWorkspace<T>(slug: string): Promise<T | null> {
  const database = await openDatabase();
  try { return await read<T>(database, slug); } finally { database.close(); }
}

export async function saveWorkspace<T>(slug: string, workspace: T) {
  const database = await openDatabase();
  try { await write(database, slug, workspace); } finally { database.close(); }
}

export function loadLegacyWorkspace<T>(slug: string): T | null {
  try { return JSON.parse(globalThis.localStorage.getItem(`roadcast-workspace:${slug}`) ?? "null") as T | null; } catch { return null; }
}

export function removeLegacyWorkspace(slug: string) {
  try { globalThis.localStorage.removeItem(`roadcast-workspace:${slug}`); } catch { /* Legacy storage is optional once IndexedDB succeeds. */ }
}
