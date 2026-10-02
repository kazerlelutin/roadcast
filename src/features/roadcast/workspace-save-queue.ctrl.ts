type TimerHandle = ReturnType<typeof globalThis.setTimeout>;
export type WorkspaceSaveTimers = { set: (callback: () => void, delay: number) => TimerHandle; clear: (handle: TimerHandle) => void; };

const browserTimers: WorkspaceSaveTimers = { set: (callback, delay) => globalThis.setTimeout(callback, delay), clear: (handle) => globalThis.clearTimeout(handle) };

/** Serialises writes without retrying an unchanged state. */
export function createWorkspaceSaveQueue(save: () => Promise<void>, delay = 600, timers = browserTimers) {
  let changedRevision = 0;
  let savedRevision = 0;
  let saving = false;
  let disposed = false;
  let timer: TimerHandle | undefined;
  const schedule = () => {
    if (disposed || saving || timer || savedRevision >= changedRevision) return;
    timer = timers.set(() => { timer = undefined; void flush(); }, delay);
  };
  const flush = async () => {
    if (disposed || saving || savedRevision >= changedRevision) return;
    saving = true;
    const revision = changedRevision;
    let succeeded = false;
    try { await save(); savedRevision = revision; succeeded = true; } catch { /* A new user action may request another attempt; an unchanged failure cannot loop. */ } finally {
      saving = false;
      if (succeeded && savedRevision < changedRevision) schedule();
    }
  };
  return {
    markHydrated() { changedRevision = 0; savedRevision = 0; },
    markChanged() { changedRevision += 1; schedule(); },
    dispose() { disposed = true; if (timer) timers.clear(timer); timer = undefined; },
  };
}
