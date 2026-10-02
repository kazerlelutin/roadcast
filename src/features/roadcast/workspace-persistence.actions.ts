import { and, eq, inArray } from "drizzle-orm";
import { action } from "@solidjs/router";
import { chronicles, chronicleVersions, roadcasts } from "./roadcast.schema";
import { createRoadcastDatabase } from "./database.ctrl";
import { workspaceInput } from "./workspace-persistence.types";
import { workspaceForRoadcast } from "./workspace-persistence.server";

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
      const values = { title: chronicle.title, author: chronicle.author, position, document: { html: chronicle.document } };
      return existingIds.has(chronicle.id)
        ? transaction.update(chronicles).set(values).where(and(eq(chronicles.roadcastId, roadcast.id), eq(chronicles.clientId, chronicle.id)))
        : transaction.insert(chronicles).values({ ...values, roadcastId: roadcast.id, clientId: chronicle.id });
    }));
    const retainedIds = input.chronicles.map((chronicle) => chronicle.id);
    const removedIds = existing.map((chronicle) => chronicle.clientId).filter((id) => !retainedIds.includes(id));
    if (removedIds.length) await transaction.delete(chronicles).where(and(eq(chronicles.roadcastId, roadcast.id), inArray(chronicles.clientId, removedIds)));
    const savedChronicles = await transaction.select({ id: chronicles.id, clientId: chronicles.clientId }).from(chronicles).where(eq(chronicles.roadcastId, roadcast.id));
    const chronicleIds = new Map(savedChronicles.map((chronicle) => [chronicle.clientId, chronicle.id]));
    for (const chronicle of input.chronicles) {
      const chronicleId = chronicleIds.get(chronicle.id);
      if (!chronicleId) continue;
      await transaction.delete(chronicleVersions).where(eq(chronicleVersions.chronicleId, chronicleId));
      if (chronicle.versions.length) await transaction.insert(chronicleVersions).values(chronicle.versions.map((version) => ({ chronicleId, clientId: version.id, savedAt: new Date(version.savedAt), title: version.title, author: version.author, document: { html: version.document } })));
    }
    return workspaceForRoadcast(transaction, roadcast.id);
  });
}, "roadcast.workspace.save");
