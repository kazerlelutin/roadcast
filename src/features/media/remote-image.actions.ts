import { action } from "@solidjs/router";
import { z } from "zod";
import { assertMediaInput } from "./media-storage.ctrl";
import { createLocalMediaStorage } from "./local-storage.ctrl";
import { createS3MediaStorage } from "./s3-storage.ctrl";
import { createRoadcastDatabase } from "../roadcast/database.ctrl";
import { media, roadcasts } from "../roadcast/roadcast.schema";
import { eq } from "drizzle-orm";
import { maximumRemoteImageBytes, remoteImageExtensions, remoteImageUrl } from "./remote-image.ctrl";

const remoteImageInput = z.object({ slug: z.string().trim().min(1).max(90), url: z.string().trim().url().max(2_000) });

export const importRemoteImage = action(async (raw: unknown) => {
  "use server";
  const input = remoteImageInput.parse(raw);
  const url = remoteImageUrl(input.url);
  const response = await globalThis.fetch(url, { redirect: "error", signal: globalThis.AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error("L’image distante est indisponible.");
  const contentType = response.headers.get("content-type")?.split(";", 1)[0].toLowerCase() ?? "";
  const announcedLength = Number(response.headers.get("content-length") ?? 0);
  if (announcedLength > maximumRemoteImageBytes) throw new Error("Choisissez une image de moins de 5 Mo.");
  const body = new Uint8Array(await response.arrayBuffer());
  assertMediaInput(contentType, body.byteLength);
  if (!remoteImageExtensions[contentType] || body.byteLength > maximumRemoteImageBytes) throw new Error("Choisissez une image PNG, JPEG, WebP ou GIF de moins de 5 Mo.");
  if (process.env.DATABASE_URL) {
    try {
      const database = createRoadcastDatabase();
      const [roadcast] = await database.select({ id: roadcasts.id }).from(roadcasts).where(eq(roadcasts.slug, input.slug));
      if (roadcast) {
        const provider = process.env.MEDIA_STORAGE === "s3" ? "s3" : "local";
        const key = `${roadcast.id}/${crypto.randomUUID()}.${remoteImageExtensions[contentType]}`;
        const storage = provider === "s3" ? createS3MediaStorage() : createLocalMediaStorage();
        await storage.put({ key, body, contentType });
        await database.insert(media).values({ roadcastId: roadcast.id, provider, key, mimeType: contentType, bytes: body.byteLength });
      }
    } catch {
      // The original bytes are still embedded below. Storage is best effort when unavailable.
    }
  }
  let binary = "";
  body.forEach((byte) => { binary += String.fromCharCode(byte); });
  return { src: `data:${contentType};base64,${globalThis.btoa(binary)}`, bytes: body.byteLength };
}, "media.remote-image.import");
