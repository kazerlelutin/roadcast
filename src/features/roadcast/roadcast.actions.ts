import { action } from "@solidjs/router";
import { createRoadcastInput } from "./roadcast.input";
import { createRoadcastDatabase } from "./database.ctrl";
import { roadcasts } from "./roadcast.schema";
import { createRoadcastEditorToken } from "./editor-token.ctrl";
export { createRoadcastInput } from "./roadcast.input";

export const createRoadcast = action(async (raw: unknown) => {
  "use server";
  const input = createRoadcastInput.parse(raw);
  const slug = createRoadcastEditorToken();
  const database = createRoadcastDatabase();
  const [created] = await database.insert(roadcasts).values({ title: input.title, slug, interactiveSlider: input.interactiveSlider }).returning({ slug: roadcasts.slug, title: roadcasts.title });
  return created;
}, "roadcast.create");
