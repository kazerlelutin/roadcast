import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { MediaStorage, Upload } from "./media-storage.ctrl";

export function createS3MediaStorage(client = new S3Client({ region: process.env.S3_REGION, endpoint: process.env.S3_ENDPOINT }), bucket = process.env.S3_BUCKET): MediaStorage {
  if (!bucket) throw new Error("S3_BUCKET est requis pour le stockage S3");
  return { async put(upload: Upload) { await client.send(new PutObjectCommand({ Bucket: bucket, Key: upload.key, Body: upload.body, ContentType: upload.contentType })); }, async remove(key) { await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key })); }, async url(key) { return `${process.env.S3_PUBLIC_URL ?? ""}/${encodeURIComponent(key)}`; } };
}
