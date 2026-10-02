import { and, eq, inArray } from "drizzle-orm";
import { action } from "@solidjs/router";
import { accessLinks, chronicles, roadcasts } from "./roadcast.schema";
import { createRoadcastDatabase } from "./database.ctrl";
import { type PersistedRoadcastWorkspace, type WorkspaceSlider, workspaceInput } from "./workspace-persistence.types";

type Database = ReturnType<typeof createRoadcastDatabase>;
type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
const sliderNames: WorkspaceSlider[] = ["alpha", "bravo", "charly"];

function token() { return globalThis.crypto.randomUUID().replaceAll("-", ""); }

async function ensureLinks(database: Database | Transaction, roadcastId: string): Promise<PersistedRoadcastWorkspace["links"]> {
  const existing = await database.select({ token: accessLinks.token, mode: accessLinks.mode, slider: accessLinks.slider }).from(accessLinks).where(eq(accessLinks.roadcastId, roadcastId));
  const read = existing.find((link) => link.mode === "read")?.token ?? token();
  if (!existing.some((link) => link.mode === "read")) await database.insert(accessLinks).values({ roadcastId, token: read, mode: "read" });
  const sliders = {} as Record<WorkspaceSlider, string>;
  for (const slider of sliderNames) {
    const current = existing.find((link) => link.mode === "slider" && link.slider === slider)?.token ?? token();
    sliders[slider] = current;
    if (!existing.some((link) => link.mode === "slider" && link.slider === slider)) await database.insert(accessLinks).values({ roadcastId, token: current, mode: "slider", slider });
  }
  return { read, sliders };
}

export async function workspaceForRoadcast(database: Database | Transaction, roadcastId: string): Promise<PersistedRoadcastWorkspace | null> {
  const [roadcast] = await database.select({ title: roadcasts.title, lastActivityAt: roadcasts.lastActivityAt }).from(roadcasts).where(eq(roadcasts.id, roadcastId));
  if (!roadcast) return null;
  const rows = await database.select({ clientId: chronicles.clientId, title: chronicles.title, author: chronicles.author, document: chronicles.document, versions: chronicles.versions }).from(chronicles).where(eq(chronicles.roadcastId, roadcastId)).orderBy(chronicles.position);
  const links = await ensureLinks(database, roadcastId);
  const savedChronicles = rows.map((chronicle) => ({
    id: chronicle.clientId,
    title: chronicle.title,
    author: chronicle.author,
    document: typeof chronicle.document.html === "string" ? chronicle.document.html : "<p></p>",
    versions: Array.isArray(chronicle.versions) ? chronicle.versions.filter((version): version is PersistedRoadcastWorkspace["chronicles"][number]["versions"][number] => !!version && typeof version === "object" && typeof (version as { id?: unknown }).id === "string" && typeof (version as { savedAt?: unknown }).savedAt === "string" && typeof (version as { title?: unknown }).title === "string" && typeof (version as { author?: unknown }).author === "string" && typeof (version as { document?: unknown }).document === "string") : [],
  }));
  return { title: roadcast.title, chronicles: savedChronicles, authors: [...new Set(savedChronicles.map((chronicle) => chronicle.author).filter(Boolean))], lastActivityAt: roadcast.lastActivityAt.toISOString(), links };
}

export const saveRoadcastWorkspace = action(async (raw: unknown) => {
  "use server";
  const input = workspaceInput.parse(raw);
  const database = createRoadcastDatabase();
  return database.transaction(async (transaction) => {
    const [roadcast] = await transaction.select({ id: roadcasts.id }).from(roadcasts).where(eq(roadcasts.slug, input.slug));
    if (!roadcast) throw new Error("Roadcast introuvable.");
    await transaction.update(roadcasts).set({ title: input.title, lastActivityAt: new Date() }).where(eq(roadcasts.id, roadcast.id));
    const existing = await transaction.select({ clientId: chronicles.clientId }).from(chronicles).where(eq(chronicles.roadcastId, roadcast.id));
    const existingIds = new Set(existing.map((chronicle) => chronicle.clientId));
    await Promise.all(input.chronicles.map((chronicle, position) => {
      const values = { title: chronicle.title, author: chronicle.author, position, document: { html: chronicle.document }, versions: chronicle.versions };
      return existingIds.has(chronicle.id)
        ? transaction.update(chronicles).set(values).where(and(eq(chronicles.roadcastId, roadcast.id), eq(chronicles.clientId, chronicle.id)))
        : transaction.insert(chronicles).values({ ...values, roadcastId: roadcast.id, clientId: chronicle.id });
    }));
    const retainedIds = input.chronicles.map((chronicle) => chronicle.id);
    const removedIds = existing.map((chronicle) => chronicle.clientId).filter((id) => !retainedIds.includes(id));
    if (removedIds.length) await transaction.delete(chronicles).where(and(eq(chronicles.roadcastId, roadcast.id), inArray(chronicles.clientId, removedIds)));
    return workspaceForRoadcast(transaction, roadcast.id);
  });
}, "roadcast.workspace.save");
