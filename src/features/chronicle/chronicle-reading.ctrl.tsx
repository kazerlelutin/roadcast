import { createSignal, onMount } from "solid-js";
import { ChronicleReadingView, type ReadonlyChronicle } from "./chronicle-reading.view";

const fallbackChronicles: ReadonlyChronicle[] = [
  { id: "welcome", title: "Bienvenue", author: "Camille", document: "<p>Bienvenue dans la chronique.</p>" },
  { id: "conclusion", title: "Conclusion", author: "Alex", document: "<p>Préparez ici la conclusion du roadcast.</p>" },
];

type StoredChronicle = ReadonlyChronicle & { versions?: unknown; };
type StoredWorkspace = { title?: unknown; chronicles?: unknown; };

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

function readWorkspace(slug: string): { title: string; chronicles: ReadonlyChronicle[]; } {
  try {
    const stored = JSON.parse(globalThis.localStorage.getItem(`roadcast-workspace:${slug}`) ?? "null") as StoredWorkspace | null;
    if (!stored || typeof stored.title !== "string" || !Array.isArray(stored.chronicles)) return { title: "Roadcast", chronicles: fallbackChronicles };
    const chronicles = stored.chronicles.filter((chronicle): chronicle is StoredChronicle => !!chronicle && typeof chronicle === "object" && typeof (chronicle as StoredChronicle).id === "string" && typeof (chronicle as StoredChronicle).title === "string" && typeof (chronicle as StoredChronicle).author === "string" && typeof (chronicle as StoredChronicle).document === "string").map((chronicle) => ({ ...chronicle, document: safeDocument(chronicle.document) }));
    return { title: stored.title, chronicles: chronicles.length ? chronicles : fallbackChronicles };
  } catch { return { title: "Roadcast", chronicles: fallbackChronicles }; }
}

export function ChronicleReadingCtrl(props: { slug: string }) {
  const [workspace, setWorkspace] = createSignal({ title: "Roadcast", chronicles: fallbackChronicles });
  const [selectedChronicleId, setSelectedChronicleId] = createSignal(fallbackChronicles[0].id);
  onMount(() => {
    const nextWorkspace = readWorkspace(props.slug);
    setWorkspace(nextWorkspace);
    setSelectedChronicleId(nextWorkspace.chronicles[0].id);
  });
  return <ChronicleReadingView title={workspace().title} chronicles={workspace().chronicles} selectedChronicleId={selectedChronicleId()} onSelectChronicle={setSelectedChronicleId} />;
}
