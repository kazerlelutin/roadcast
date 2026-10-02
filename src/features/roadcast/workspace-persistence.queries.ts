import { and, eq } from "drizzle-orm";
import { query } from "@solidjs/router";
import { accessLinks, roadcasts } from "./roadcast.schema";
import { createRoadcastDatabase } from "./database.ctrl";
import { workspaceForRoadcast } from "./workspace-persistence.actions";

export const loadRoadcastWorkspace = query(async (slug: string) => {
  "use server";
  const database = createRoadcastDatabase();
  const [roadcast] = await database.select({ id: roadcasts.id }).from(roadcasts).where(eq(roadcasts.slug, slug));
  return roadcast ? workspaceForRoadcast(database, roadcast.id) : null;
}, "roadcast.workspace.load");

export const loadReadWorkspace = query(async (token: string) => {
  "use server";
  const database = createRoadcastDatabase();
  const [link] = await database.select({ roadcastId: accessLinks.roadcastId }).from(accessLinks).where(and(eq(accessLinks.token, token), eq(accessLinks.mode, "read")));
  return link ? workspaceForRoadcast(database, link.roadcastId) : null;
}, "roadcast.workspace.read");
