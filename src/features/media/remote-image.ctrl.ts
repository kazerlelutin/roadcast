export const maximumRemoteImageBytes = 5 * 1024 * 1024;
export const remoteImageExtensions: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif" };

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase();
  return host === "localhost" || host.endsWith(".localhost") || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) || host === "::1" || host.startsWith("fc") || host.startsWith("fd");
}

export function remoteImageUrl(value: string): InstanceType<typeof globalThis.URL> {
  const url = new globalThis.URL(value);
  if (url.protocol !== "https:" || url.username || url.password || isPrivateHost(url.hostname)) throw new Error("Cette adresse d’image n’est pas autorisée.");
  return url;
}
