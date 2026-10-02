export type RoadcastContent = { document: string };

function textFromDocument(document: string) {
  return document.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function mediaSources(document: string): string[] {
  return [...document.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((match) => match[1]);
}

function mediaBytes(source: string): number {
  const base64 = source.match(/^data:[^;]+;base64,(.+)$/i)?.[1];
  return base64 ? Math.floor((base64.length * 3) / 4) : 0;
}

export function calculateRoadcastUsage(chronicles: RoadcastContent[]) {
  const sources = chronicles.flatMap((chronicle) => mediaSources(chronicle.document));
  return {
    characterCount: chronicles.reduce((total, chronicle) => total + textFromDocument(chronicle.document).length, 0),
    mediaBytes: sources.reduce((total, source) => total + mediaBytes(source), 0),
  };
}
