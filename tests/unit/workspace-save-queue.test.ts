import { describe, expect, it } from "bun:test";
import { createWorkspaceSaveQueue, type WorkspaceSaveTimers } from "../../src/features/roadcast/workspace-save-queue.ctrl";

function manualTimers() {
  const callbacks = new Map<number, () => void>();
  let nextId = 0;
  const timers: WorkspaceSaveTimers = { set(callback) { const id = ++nextId; callbacks.set(id, callback); return id as unknown as ReturnType<typeof globalThis.setTimeout>; }, clear(handle) { callbacks.delete(handle as unknown as number); } };
  return { timers, run() { const pending = [...callbacks.values()]; callbacks.clear(); pending.forEach((callback) => callback()); }, pending: () => callbacks.size };
}

describe("file de sauvegarde de l’espace", () => {
  it("n’envoie qu’une fois un état inchangé", async () => {
    const clock = manualTimers(); let saves = 0;
    const queue = createWorkspaceSaveQueue(async () => { saves += 1; }, 600, clock.timers);
    queue.markChanged(); queue.markChanged(); expect(clock.pending()).toBe(1);
    clock.run(); await Promise.resolve();
    expect(saves).toBe(1); expect(clock.pending()).toBe(0);
  });

  it("enregistre encore une fois seulement après une modification pendant l’envoi", async () => {
    const clock = manualTimers(); let finish: (() => void) | undefined; let saves = 0;
    const queue = createWorkspaceSaveQueue(() => new Promise<void>((resolve) => { saves += 1; finish = resolve; }), 600, clock.timers);
    queue.markChanged(); clock.run(); await Promise.resolve(); queue.markChanged(); finish?.(); await Promise.resolve();
    expect(clock.pending()).toBe(1); clock.run(); await Promise.resolve(); expect(saves).toBe(2); finish?.();
  });

  it("ne retente pas en boucle une sauvegarde en erreur", async () => {
    const clock = manualTimers(); let saves = 0;
    const queue = createWorkspaceSaveQueue(async () => { saves += 1; throw new Error("base indisponible"); }, 600, clock.timers);
    queue.markChanged(); clock.run(); await Promise.resolve();
    expect(saves).toBe(1); expect(clock.pending()).toBe(0);
  });
});
