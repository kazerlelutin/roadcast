import { z } from "zod";
import { calculateRoadcastUsage } from "./roadcast-usage.ctrl";
import { planLimits } from "../billing/plan.const";

const sliders = ["alpha", "bravo", "charly"] as const;
export type WorkspaceSlider = typeof sliders[number];
export type PersistedChronicleVersion = { id: string; savedAt: string; title: string; author: string; document: string; };
export type PersistedChronicle = { id: string; title: string; author: string; document: string; versions: PersistedChronicleVersion[]; };
export type PersistedRoadcastWorkspace = { title: string; chronicles: PersistedChronicle[]; authors: string[]; lastActivityAt: string; links: { read: string; sliders: Record<WorkspaceSlider, string>; }; };

const versionInput = z.object({ id: z.string().min(1).max(120), savedAt: z.string().datetime(), title: z.string().trim().min(1).max(180), author: z.string().trim().min(1).max(120), document: z.string().max(10_000_000) });
export const workspaceInput = z.object({ slug: z.string().min(1).max(90), title: z.string().trim().min(1).max(140), chronicles: z.array(z.object({ id: z.string().min(1).max(120), title: z.string().trim().min(1).max(180), author: z.string().trim().min(1).max(120), document: z.string().max(10_000_000), versions: z.array(versionInput).max(12) })).min(1).max(100) }).superRefine((workspace, context) => {
  const usage = calculateRoadcastUsage(workspace.chronicles);
  if (usage.characterCount > planLimits.free.charactersPerRoadcast) context.addIssue({ code: z.ZodIssueCode.custom, message: "La limite de caractères est atteinte." });
  if (usage.mediaBytes > planLimits.free.mediaBytes) context.addIssue({ code: z.ZodIssueCode.custom, message: "La limite de 100 Mo de médias est atteinte." });
});

export function isPersistedChronicleVersion(value: unknown): value is PersistedChronicleVersion {
  return !!value && typeof value === "object" && typeof (value as PersistedChronicleVersion).id === "string" && typeof (value as PersistedChronicleVersion).savedAt === "string" && typeof (value as PersistedChronicleVersion).title === "string" && typeof (value as PersistedChronicleVersion).author === "string" && typeof (value as PersistedChronicleVersion).document === "string";
}

export function isWorkspaceSlider(value: unknown): value is WorkspaceSlider { return sliders.includes(value as WorkspaceSlider); }
