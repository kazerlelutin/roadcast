import { mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import type { MediaStorage, Upload } from "./media-storage.ctrl";

export function createLocalMediaStorage(directory = process.env.MEDIA_LOCAL_DIRECTORY ?? "./data/media"): MediaStorage {
  const root = resolve(directory);
  const fileFor = (key: string) => { if (!/^[a-zA-Z0-9/_-]+$/.test(key)) throw new Error("Clé de média invalide"); return join(root, key); };
  return { async put(upload: Upload) { const file = fileFor(upload.key); await mkdir(dirname(file), { recursive: true }); await Bun.write(file, upload.body); }, async remove(key) { await rm(fileFor(key), { force: true }); }, async url(key) { return `/media/${encodeURIComponent(key)}`; } };
}
