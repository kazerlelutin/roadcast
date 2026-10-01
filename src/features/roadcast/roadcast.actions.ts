import { action } from "@solidjs/router";
import { createRoadcastInput } from "./roadcast.input";
export { createRoadcastInput } from "./roadcast.input";
export const createRoadcast = action(async (raw: unknown) => {
  "use server";
  const input = createRoadcastInput.parse(raw);
  const slug = input.title.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  // Le repository Drizzle est injecté ici lorsque DATABASE_URL est configurée.
  return { slug, title: input.title, interactiveSlider: input.interactiveSlider ?? null };
}, "roadcast.create");
