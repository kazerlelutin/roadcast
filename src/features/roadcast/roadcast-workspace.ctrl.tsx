import { createSignal, onMount } from "solid-js";
import { MediaDialogView } from "../media/media-dialog.view";
import { type Slider } from "../presentation/slider-preview.view";
import { type ShareMode } from "../sharing/share-dialog.view";
import { estimateChronicleMinutes } from "../chronicle/reading-time.ctrl";
import { type RoadcastWorkspaceTheme, type WorkspaceChronicle, RoadcastWorkspaceView } from "./roadcast-workspace.view";

const seed = "Bienvenue dans la chronique. Écris librement, ajoute tes médias au fil du texte et décide ce qui part sur chaque slider.\n\nL’estimation de temps aide toute l’équipe à garder le rythme.";
const initialChronicles: WorkspaceChronicle[] = [
  { id: "welcome", title: "Bienvenue", document: seed, author: "Camille" },
  { id: "conclusion", title: "Conclusion", document: "Préparez ici la conclusion de votre roadcast.", author: "Alex" },
];

export function RoadcastWorkspaceCtrl(props: { slug: string }) {
  const [title, setTitle] = createSignal("Démo de chronique");
  const [chronicles, setChronicles] = createSignal(initialChronicles);
  const [selectedChronicleId, setSelectedChronicleId] = createSignal(initialChronicles[0].id);
  const [chronicleFilter, setChronicleFilter] = createSignal("all");
  const [authors, setAuthors] = createSignal(["Camille", "Alex"]);
  const [newAuthor, setNewAuthor] = createSignal("");
  const [slider, setSlider] = createSignal<Slider>("alpha");
  const [broadcastSlider, setBroadcastSlider] = createSignal<Slider | null>(null);
  const [mediaOpen, setMediaOpen] = createSignal(false);
  const [shareOpen, setShareOpen] = createSignal(false);
  const [shareMode, setShareMode] = createSignal<ShareMode>("edit");
  const [notice, setNotice] = createSignal("");
  const [theme, setTheme] = createSignal<RoadcastWorkspaceTheme>("dark");

  const selectedChronicle = () => chronicles().find((chronicle) => chronicle.id === selectedChronicleId()) ?? chronicles()[0];
  const updateSelectedChronicle = (updates: Partial<WorkspaceChronicle>) => setChronicles((current) => current.map((chronicle) => chronicle.id === selectedChronicleId() ? { ...chronicle, ...updates } : chronicle));
  const publicLink = (mode: ShareMode = shareMode()) => {
    const path = mode === "edit" ? `/${props.slug}` : mode === "read" ? `/${props.slug}/read` : `/slider/${props.slug}-${slider()}`;
    return `${globalThis.location?.origin ?? ""}${path}`;
  };
  const copy = async (link: string) => {
    try {
      await globalThis.navigator.clipboard?.writeText(link);
      setNotice("Lien copié dans le presse-papiers.");
    } catch {
      setNotice("Copiez le lien affiché dans le champ.");
    }
  };

  const toggleTheme = () => {
    const nextTheme: RoadcastWorkspaceTheme = theme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    globalThis.localStorage.setItem("roadcast-theme", nextTheme);
  };

  const pictureInPicture = async () => {
    const candidate = globalThis.document?.querySelector("[data-slider-preview]") as HTMLElement | null;
    if (candidate && "requestPictureInPicture" in candidate) await (candidate as unknown as { requestPictureInPicture(): Promise<void> }).requestPictureInPicture();
    else setNotice("Le Picture-in-Picture est disponible dans un navigateur compatible.");
  };

  const format = (formatName: "bold" | "italic" | "heading" | "list" | "link" | "separator") => {
    const editor = globalThis.document?.querySelector("[data-chronicle-editor]") as HTMLElement | null;
    editor?.focus();
    if (!editor) return;
    if (formatName === "link") {
      const url = globalThis.prompt("Adresse du lien");
      if (url) globalThis.document.execCommand("createLink", false, url);
    } else if (formatName === "heading") globalThis.document.execCommand("formatBlock", false, "h2");
    else if (formatName === "list") globalThis.document.execCommand("insertUnorderedList");
    else if (formatName === "separator") globalThis.document.execCommand("insertHorizontalRule");
    else globalThis.document.execCommand(formatName);
    updateSelectedChronicle({ document: editor.textContent ?? "" });
  };

  const insertChronicle = (position: "above" | "below") => {
    const current = selectedChronicle();
    const author = current?.author ?? authors()[0];
    const chronicle: WorkspaceChronicle = { id: `chronicle-${Date.now()}`, title: "Nouvelle chronique", document: "", author };
    setChronicles((items) => {
      const index = Math.max(0, items.findIndex((item) => item.id === selectedChronicleId()));
      const next = [...items];
      next.splice(index + (position === "below" ? 1 : 0), 0, chronicle);
      return next;
    });
    setSelectedChronicleId(chronicle.id);
    setNotice(`Nouvelle chronique ajoutée ${position === "above" ? "au-dessus" : "en dessous"}.`);
  };

  const moveChronicle = (direction: "up" | "down") => setChronicles((items) => {
    const index = items.findIndex((item) => item.id === selectedChronicleId());
    const destination = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || destination < 0 || destination >= items.length) return items;
    const next = [...items];
    [next[index], next[destination]] = [next[destination], next[index]];
    setNotice(`Chronique déplacée vers le ${direction === "up" ? "haut" : "bas"}.`);
    return next;
  });

  const createAuthor = () => {
    const author = newAuthor().trim();
    if (!author) { setNotice("Saisissez un nom de chroniqueur."); return; }
    if (!authors().includes(author)) setAuthors((current) => [...current, author]);
    updateSelectedChronicle({ author });
    setNewAuthor("");
    setNotice(`${author} est maintenant chroniqueur.`);
  };

  onMount(() => {
    const savedTheme = globalThis.localStorage.getItem("roadcast-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  });

  return <>
    <RoadcastWorkspaceView slug={props.slug} title={title()} chronicles={chronicles()} selectedChronicleId={selectedChronicleId()} minutes={estimateChronicleMinutes(selectedChronicle().document)} chronicleFilter={chronicleFilter()} authors={authors()} newAuthor={newAuthor()} slider={slider()} broadcastSlider={broadcastSlider()} notice={notice()} theme={theme()} shareOpen={shareOpen()} shareMode={shareMode()} shareLink={publicLink()} onTitleInput={setTitle} onChronicleTitleInput={(value) => updateSelectedChronicle({ title: value })} onChronicleAuthorChange={(author) => updateSelectedChronicle({ author })} onDocumentInput={(value) => updateSelectedChronicle({ document: value })} onFormat={format} onMove={moveChronicle} onInsert={insertChronicle} onSelectChronicle={setSelectedChronicleId} onFilterChange={setChronicleFilter} onNewAuthorInput={setNewAuthor} onCreateAuthor={createAuthor} onOpenMedia={() => setMediaOpen(true)} onSelectSlider={setSlider} onPictureInPicture={pictureInPicture} onShare={() => setShareOpen(true)} onCloseShare={() => setShareOpen(false)} onShareModeChange={setShareMode} onCopyShareLink={() => void copy(publicLink())} onCopySliderLink={() => void copy(publicLink("slider"))} onThemeChange={toggleTheme} />
    <MediaDialogView open={mediaOpen()} onClose={() => setMediaOpen(false)} onDelete={() => { setMediaOpen(false); setNotice("Média supprimé."); }} onSend={(target) => { setMediaOpen(false); setSlider(target); setBroadcastSlider(target); setNotice(`Média envoyé à ${target}.`); }} />
  </>;
}
