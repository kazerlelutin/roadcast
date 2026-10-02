import { createSignal, onMount } from "solid-js";
import { ChronicleReadingView, type ReadonlyChronicle } from "./chronicle-reading.view";

type StoredChronicle = ReadonlyChronicle & { versions?: unknown; };
type StoredWorkspace = { title?: unknown; chronicles?: unknown; };
type ReadonlyWorkspace = { title: string; chronicles: ReadonlyChronicle[]; };

function safeDocument(document: string): string {
  const template = globalThis.document.createElement("template");
  template.innerHTML = document;
  template.content.querySelectorAll("script, style, iframe, object, embed").forEach((element) => element.remove());
  template.content.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      if (attribute.name.startsWith("on")) element.removeAttribute(attribute.name);
      if ((attribute.name === "href" || attribute.name === "src") && !/^(https?:|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(attribute.value)) element.removeAttribute(attribute.name);
    });
  });
  return template.innerHTML;
}

function readWorkspace(slug: string): ReadonlyWorkspace | null {
  try {
    const stored = JSON.parse(globalThis.localStorage.getItem(`roadcast-workspace:${slug}`) ?? "null") as StoredWorkspace | null;
    if (!stored || typeof stored.title !== "string" || !Array.isArray(stored.chronicles)) return null;
    const chronicles = stored.chronicles.filter((chronicle): chronicle is StoredChronicle => !!chronicle && typeof chronicle === "object" && typeof (chronicle as StoredChronicle).id === "string" && typeof (chronicle as StoredChronicle).title === "string" && typeof (chronicle as StoredChronicle).author === "string" && typeof (chronicle as StoredChronicle).document === "string").map((chronicle) => ({ ...chronicle, document: safeDocument(chronicle.document) }));
    return chronicles.length ? { title: stored.title, chronicles } : null;
  } catch { return null; }
}

export function ChronicleReadingCtrl(props: { token: string }) {
  const [workspace, setWorkspace] = createSignal<ReadonlyWorkspace | null>(null);
  const [selectedChronicleId, setSelectedChronicleId] = createSignal("");
  onMount(() => {
    const slug = globalThis.localStorage.getItem(`roadcast-read-token:${props.token}`);
    const nextWorkspace = slug ? readWorkspace(slug) : null;
    setWorkspace(nextWorkspace);
    setSelectedChronicleId(nextWorkspace?.chronicles[0]?.id ?? "");
  });
  return <ChronicleReadingView workspace={workspace()} selectedChronicleId={selectedChronicleId()} onSelectChronicle={setSelectedChronicleId} />;
}
