import { definePlugin } from "nitro";
import { purgeExpiredRoadcasts } from "./expired-roadcasts.server";

const dailyCleanupMs = 24 * 60 * 60 * 1000;

export default definePlugin((nitro) => {
  const run = () => void purgeExpiredRoadcasts().catch(() => globalThis.console.error("Impossible de purger les roadcasts expirés."));
  run();
  const timer = globalThis.setInterval(run, dailyCleanupMs);
  nitro.hooks.hook("close", () => globalThis.clearInterval(timer));
});
