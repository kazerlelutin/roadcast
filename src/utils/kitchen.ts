/**
 * A unit of work executed during the next animation frame.
 * Keep tasks short and side‑effect free for recipe (read) phase;
 * apply DOM mutations only in cook (write) phase.
 */
export type RenderTask = () => void;

let frameId: number | null = null;

const readTasksByKey = new Map<string, RenderTask>();
const writeTasksByKey = new Map<string, RenderTask>();

const readTasksByElem = new WeakMap<HTMLElement, RenderTask>();
const writeTasksByElem = new WeakMap<HTMLElement, RenderTask>();
const readElements = new Set<HTMLElement>();
const writeElements = new Set<HTMLElement>();

/**
 * Internal scheduler. Ensures only one requestAnimationFrame is queued.
 * Batches all recipe (reads) first, then cook (writes) in the same frame.
 */
function scheduleFrame(): void {
  if (frameId != null) return;
  frameId = requestAnimationFrame(() => {
    frameId = null;

    const readFromKeys = Array.from(readTasksByKey.values());
    const readFromElements: RenderTask[] = [];
    for (const el of readElements) {
      const t = readTasksByElem.get(el);
      if (t) readFromElements.push(t);
      readTasksByElem.delete(el);
    }
    readTasksByKey.clear();
    readElements.clear();

    for (const task of readFromKeys) task();
    for (const task of readFromElements) task();

    const writeFromKeys = Array.from(writeTasksByKey.values());
    const writeFromElements: RenderTask[] = [];
    for (const el of writeElements) {
      const t = writeTasksByElem.get(el);
      if (t) writeFromElements.push(t);
      writeTasksByElem.delete(el);
    }
    writeTasksByKey.clear();
    writeElements.clear();

    for (const task of writeFromKeys) task();
    for (const task of writeFromElements) task();
  });
}

/**
 * Queue a measurement task (read phase) identified by a logical key.
 * Last call for the same key wins before the frame executes.
 */
export function recipe(key: string, task: RenderTask): void {
  readTasksByKey.set(key, task);
  scheduleFrame();
}

/**
 * Queue a mutation task (write phase) identified by a logical key.
 * Last call for the same key wins before the frame executes.
 */
export function cook(key: string, task: RenderTask): void {
  writeTasksByKey.set(key, task);
  scheduleFrame();
}

/**
 * Cancel any pending tasks associated with the provided key.
 */
export function cancel(key: string): void {
  readTasksByKey.delete(key);
  writeTasksByKey.delete(key);
}

/**
 * Queue a measurement task (read phase) scoped to an element.
 * Deduplicated by element reference (WeakMap), last wins.
 */
export function recipeFor(element: HTMLElement, task: RenderTask): void {
  readTasksByElem.set(element, task);
  readElements.add(element);
  scheduleFrame();
}

/**
 * Queue a mutation task (write phase) scoped to an element.
 * Deduplicated by element reference (WeakMap), last wins.
 */
export function cookFor(element: HTMLElement, task: RenderTask): void {
  writeTasksByElem.set(element, task);
  writeElements.add(element);
  scheduleFrame();
}

/**
 * Cancel any pending tasks for the given element.
 */
export function cancelFor(element: HTMLElement): void {
  readTasksByElem.delete(element);
  writeTasksByElem.delete(element);
  readElements.delete(element);
  writeElements.delete(element);
}

/**
 * Batch a set of write mutations under a single logical key.
 */
export function plate(key: string, producer: () => void): void {
  cook(key, producer);
}

/**
 * Ensure the next frame runs and resolve after it. Useful for tests.
 */
export async function service(): Promise<void> {
  return new Promise((resolve) => {
    scheduleFrame();
    requestAnimationFrame(() => resolve());
  });
}

