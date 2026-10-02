const youtubeHosts = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be", "www.youtube-nocookie.com"]);

export function youtubeEmbedUrl(value: string): string | null {
  let url: InstanceType<typeof globalThis.URL>;
  try { url = new globalThis.URL(value.trim()); } catch { return null; }
  if (url.protocol !== "https:" || !youtubeHosts.has(url.hostname.toLowerCase())) return null;
  const path = url.pathname.split("/").filter(Boolean);
  const id = url.hostname.endsWith("youtu.be") ? path[0] : url.searchParams.get("v") ?? (path[0] === "embed" || path[0] === "shorts" ? path[1] : undefined);
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
  const embed = new globalThis.URL(`https://www.youtube-nocookie.com/embed/${id}`);
  embed.searchParams.set("autoplay", "1");
  embed.searchParams.set("controls", "0");
  embed.searchParams.set("disablekb", "1");
  embed.searchParams.set("mute", "1");
  embed.searchParams.set("playsinline", "1");
  embed.searchParams.set("rel", "0");
  return embed.toString();
}
