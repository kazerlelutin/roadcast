import { action } from "@solidjs/router";
import { createRoadcastInput } from "./roadcast.input";
import { createRoadcastDatabase } from "./database.ctrl";
import { roadcasts } from "./roadcast.schema";
export { createRoadcastInput } from "./roadcast.input";
export const createRoadcast = action(async (raw: unknown) => {
  "use server";
  const input = createRoadcastInput.parse(raw);
  const baseSlug = input.title.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
  const database = createRoadcastDatabase();
  const [created] = await database.insert(roadcasts).values({ title: input.title, slug, interactiveSlider: input.interactiveSlider }).returning({ slug: roadcasts.slug, title: roadcasts.title });
  return created;
}, "roadcast.create");
