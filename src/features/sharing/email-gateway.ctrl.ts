export type ShareEmail = { to: string; subject: string; url: string; mode: "edit" | "read" | "slider" };
export interface EmailGateway { sendShare(email: ShareEmail): Promise<void>; }

// Adaptateur volontairement absent : le fournisseur est choisi au déploiement, pas dans le domaine métier.
export function createShareEmail(to: string, url: string, mode: ShareEmail["mode"]): ShareEmail { return { to, url, mode, subject: `Roadcast · lien ${mode === "edit" ? "de modification" : mode === "read" ? "de lecture" : "slider"}` }; }
