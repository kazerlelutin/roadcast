import { z } from "zod";
export const createRoadcastInput = z.object({ title: z.string().trim().min(3).max(140), interactiveSlider: z.enum(["alpha", "bravo", "charly"]).optional() });
