import { action } from "@solidjs/router";
import { createRoadcastInput } from "./roadcast.input";
import { createRoadcastDatabase } from "./database.ctrl";
import { chronicles, roadcasts } from "./roadcast.schema";
import { createRoadcastEditorToken } from "./editor-token.ctrl";
export { createRoadcastInput } from "./roadcast.input";

export const createRoadcast = action(async (raw: unknown) => {
  "use server";
  const input = createRoadcastInput.parse(raw);
  const slug = createRoadcastEditorToken();
  const database = createRoadcastDatabase();
  return database.transaction(async (transaction) => {
    const [created] = await transaction.insert(roadcasts).values({ title: input.title, slug, interactiveSlider: input.interactiveSlider }).returning({ id: roadcasts.id, slug: roadcasts.slug, title: roadcasts.title });
    await transaction.insert(chronicles).values({ roadcastId: created.id, clientId: "chronicle-initial", title: "Nouvelle chronique", author: "", position: 0, document: { html: "<p></p>" } });
    return { slug: created.slug, title: created.title };
  });
}, "roadcast.create");
