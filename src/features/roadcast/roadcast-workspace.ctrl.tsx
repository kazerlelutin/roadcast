import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import type { ChronicleEditorElement, ChronicleFormat, MediaFile } from "../chronicle/chronicle-editor.view";
import type { BroadcastDraft } from "../presentation/broadcast-dialog.view";
import { connectSliderRealtime, type Slider, type SliderRealtimeClient, type BroadcastPayload } from "../presentation/slider-realtime.ctrl";
import { type ShareMode } from "../sharing/share-dialog.view";
import { estimateChronicleMinutes } from "../chronicle/reading-time.ctrl";
import { type RoadcastWorkspaceTheme, type WorkspaceChronicle, RoadcastWorkspaceView } from "./roadcast-workspace.view";

const seed = "Bienvenue dans la chronique. Écris librement, ajoute tes médias au fil du texte et décide ce qui part sur chaque slider.\n\nL’estimation de temps aide toute l’équipe à garder le rythme.";
const initialChronicles: WorkspaceChronicle[] = [
  { id: "welcome", title: "Bienvenue", document: `<p>${seed.replaceAll("\n\n", "</p><p>")}</p>`, author: "Camille", versions: [] },
  { id: "conclusion", title: "Conclusion", document: "<p>Préparez ici la conclusion de votre roadcast.</p>", author: "Alex", versions: [] },
];
const maxVersions = 12;
type PersistedWorkspace = { title: string; chronicles: WorkspaceChronicle[]; authors: string[]; };

export function RoadcastWorkspaceCtrl(props: { slug: string }) {
  const [title, setTitle] = createSignal("Démo de chronique");
  const [chronicles, setChronicles] = createSignal(initialChronicles);
  const [selectedChronicleId, setSelectedChronicleId] = createSignal(initialChronicles[0].id);
  const [chronicleFilter, setChronicleFilter] = createSignal("all");
  const [authors, setAuthors] = createSignal(["Camille", "Alex"]);
  const [authorQuery, setAuthorQuery] = createSignal(initialChronicles[0].author);
  const [authorPickerOpen, setAuthorPickerOpen] = createSignal(false);
  const [bubble, setBubble] = createSignal<{ top: number; left: number } | null>(null);
  const [hydrated, setHydrated] = createSignal(false);
  const [slider, setSlider] = createSignal<Slider>("alpha");
  const [broadcasts, setBroadcasts] = createSignal<Partial<Record<Slider, BroadcastPayload>>>({});
  const [broadcastOpen, setBroadcastOpen] = createSignal(false);
  const [broadcastDraft, setBroadcastDraft] = createSignal<BroadcastDraft | null>(null);
  const [broadcastTarget, setBroadcastTarget] = createSignal<Slider>("alpha");
  const [lastBroadcastSlider, setLastBroadcastSlider] = createSignal<Slider>("alpha");
  const [shareOpen, setShareOpen] = createSignal(false);
  const [shareMode, setShareMode] = createSignal<ShareMode>("edit");
  const [notice, setNotice] = createSignal("");
  const [theme, setTheme] = createSignal<RoadcastWorkspaceTheme>("dark");
  let editor: Editor | undefined;
  let editorChronicleId = "";
  const realtime = new Map<Slider, SliderRealtimeClient>();

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
    const documentPiP = (globalThis as typeof globalThis & { documentPictureInPicture?: { requestWindow: (options: { width: number; height: number }) => Promise<NonNullable<ReturnType<typeof globalThis.open>>>; }; }).documentPictureInPicture;
    if (candidate && documentPiP) {
      const pipWindow = await documentPiP.requestWindow({ width: 480, height: 270 });
      pipWindow.document.head.innerHTML = globalThis.document.head.innerHTML;
      pipWindow.document.body.append(candidate.cloneNode(true));
      return;
    }
    const opened = globalThis.open(publicLink("slider"), "RoadcastPreview", "popup,width=640,height=420");
    if (!opened) setNotice("Autorisez les fenêtres surgissantes pour ouvrir l’aperçu dans une fenêtre séparée.");
  };

  const format = (formatName: ChronicleFormat) => {
    if (!editor) return;
    if (formatName === "link") {
      const url = globalThis.prompt("Adresse du lien");
      if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    else if (formatName === "bold") editor.chain().focus().toggleBold().run();
    else if (formatName === "heading") editor.chain().focus().toggleHeading({ level: 2 }).run();
    else if (formatName === "list") editor.chain().focus().toggleBulletList().run();
    else if (formatName === "quote") editor.chain().focus().toggleBlockquote().run();
    else if (formatName === "separator") editor.chain().focus().setHorizontalRule().run();
    else editor.chain().focus().toggleItalic().run();
  };

  const addChronicle = () => {
    const current = selectedChronicle();
    const author = current?.author ?? authors()[0];
    const chronicle: WorkspaceChronicle = { id: `chronicle-${Date.now()}`, title: "Nouvelle chronique", document: "<p></p>", author, versions: [] };
    setChronicles((items) => [...items, chronicle]);
    setSelectedChronicleId(chronicle.id);
    setAuthorQuery(author);
    setNotice("Nouvelle chronique ajoutée.");
  };

  const moveChronicle = (direction: "up" | "down") => setChronicles((items) => {
    const index = items.findIndex((item) => item.id === selectedChronicleId());
    const destination = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || destination < 0 || destination >= items.length) return items;
    const next = [...items];
    [next[index], next[destination]] = [next[destination], next[index]];
    return next;
  });

  const selectAuthor = (value: string) => {
    const author = value.trim();
    if (!author) { setNotice("Saisissez un nom de chroniqueur."); return; }
    if (!authors().includes(author)) setAuthors((current) => [...current, author]);
    updateSelectedChronicle({ author });
    setAuthorQuery(author);
    setAuthorPickerOpen(false);
    setBubble(null);
    setNotice(`${author} est associé à cette chronique.`);
  };

  const selectChronicle = (id: string) => {
    const chronicle = chronicles().find((item) => item.id === id);
    if (!chronicle) return;
    setSelectedChronicleId(id);
    setAuthorQuery(chronicle.author);
    setAuthorPickerOpen(false);
  };

  const insertMedia = async (file: MediaFile | undefined) => {
    if (!file || !editor) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setNotice("Choisissez une image de moins de 5 Mo."); return; }
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    editor.chain().focus().setImage({ src: `data:${file.type};base64,${globalThis.btoa(binary)}`, alt: "Image de la chronique" }).run();
    setNotice("Image ajoutée à la chronique.");
  };

  const captureSelection = (): BroadcastDraft | null => {
    if (!editor) return null;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, " ").trim();
    const images: string[] = [];
    editor.state.doc.nodesBetween(from, to, (node) => { if (node.type.name === "image" && typeof node.attrs.src === "string") images.push(node.attrs.src); });
    return text || images.length ? { text, images } : null;
  };

  const openBroadcast = () => {
    const draft = captureSelection();
    if (!draft) { setNotice("Sélectionnez du texte ou une image avant de diffuser."); return; }
    setBroadcastDraft(draft);
    setBroadcastTarget(lastBroadcastSlider());
    setBroadcastOpen(true);
    setBubble(null);
  };

  const confirmBroadcast = () => {
    const draft = broadcastDraft();
    if (!draft) return;
    setBroadcasts((current) => ({ ...current, [broadcastTarget()]: draft }));
    realtime.get(broadcastTarget())?.publish(draft);
    setLastBroadcastSlider(broadcastTarget());
    setSlider(broadcastTarget());
    setBroadcastOpen(false);
    setNotice(`Sélection diffusée vers le slider ${broadcastTarget()}.`);
  };

  const editorReady = (element: ChronicleEditorElement) => {
    editor?.destroy();
    const current = selectedChronicle();
    editorChronicleId = current.id;
    editor = new Editor({
      element,
      extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true }), Image.configure({ allowBase64: true })],
      content: current.document,
      onUpdate: ({ editor: instance }) => updateSelectedChronicle({ document: instance.getHTML() }),
      onSelectionUpdate: ({ editor: instance }) => {
        const { from, to } = instance.state.selection;
        if (from === to) { setBubble(null); return; }
        const position = instance.view.coordsAtPos(to);
        setBubble({ top: position.top - 8, left: (position.left + position.right) / 2 });
      },
    });
  };

  const saveVersion = () => {
    const chronicle = selectedChronicle();
    if (chronicle.versions.at(-1)?.document === chronicle.document) { setNotice("Cette version est déjà enregistrée."); return; }
    const version = { id: `version-${Date.now()}`, savedAt: new Date().toISOString(), document: chronicle.document };
    updateSelectedChronicle({ versions: [...chronicle.versions, version].slice(-maxVersions) });
    setNotice("Version enregistrée.");
  };

  const restoreVersion = (versionId: string) => {
    if (!versionId) return;
    const version = selectedChronicle().versions.find((item) => item.id === versionId);
    if (!version) return;
    updateSelectedChronicle({ document: version.document });
    editor?.commands.setContent(version.document);
    setNotice("Version restaurée. Enregistrez une nouvelle version pour la conserver.");
  };

  createEffect(() => {
    const chronicle = selectedChronicle();
    if (editor && editorChronicleId !== chronicle.id) {
      editorChronicleId = chronicle.id;
      editor.commands.setContent(chronicle.document);
    }
  });

  createEffect(() => {
    if (!hydrated()) return;
    const workspace: PersistedWorkspace = { title: title(), chronicles: chronicles(), authors: authors() };
    globalThis.localStorage.setItem(`roadcast-workspace:${props.slug}`, JSON.stringify(workspace));
  });

  onMount(() => {
    const savedTheme = globalThis.localStorage.getItem("roadcast-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    try {
      const savedWorkspace = JSON.parse(globalThis.localStorage.getItem(`roadcast-workspace:${props.slug}`) ?? "null") as PersistedWorkspace | null;
      if (savedWorkspace && typeof savedWorkspace.title === "string" && Array.isArray(savedWorkspace.chronicles) && savedWorkspace.chronicles.length > 0 && Array.isArray(savedWorkspace.authors)) {
        const savedChronicles = savedWorkspace.chronicles.map((chronicle) => ({ ...chronicle, versions: Array.isArray(chronicle.versions) ? chronicle.versions.slice(-maxVersions) : [] }));
        setTitle(savedWorkspace.title);
        setChronicles(savedChronicles);
        setAuthors(savedWorkspace.authors);
        editorChronicleId = "";
        setSelectedChronicleId(savedChronicles[0].id);
        setAuthorQuery(savedChronicles[0].author);
      }
    } catch { globalThis.localStorage.removeItem(`roadcast-workspace:${props.slug}`); }
    (['alpha', 'bravo', 'charly'] as const).forEach((target) => {
      realtime.set(target, connectSliderRealtime(`${props.slug}-${target}`, (payload) => setBroadcasts((current) => ({ ...current, [target]: payload }))));
    });
    setHydrated(true);
  });

  onCleanup(() => {
    editor?.destroy();
    realtime.forEach((client) => client.close());
  });

  return <>
    <RoadcastWorkspaceView
      slug={props.slug} title={title()} chronicles={chronicles()} selectedChronicleId={selectedChronicleId()} minutes={estimateChronicleMinutes(selectedChronicle().document.replace(/<[^>]+>/g, " "))} chronicleFilter={chronicleFilter()} authors={authors()} authorQuery={authorQuery()} authorPickerOpen={authorPickerOpen()} bubble={bubble()} slider={slider()} sliderLink={publicLink("slider")} broadcasts={broadcasts()} broadcastOpen={broadcastOpen()} broadcastDraft={broadcastDraft()} broadcastTarget={broadcastTarget()} notice={notice()} theme={theme()} shareOpen={shareOpen()} shareMode={shareMode()} shareLink={publicLink()}
      onTitleInput={setTitle} onChronicleTitleInput={(value) => updateSelectedChronicle({ title: value })} onAuthorQueryInput={(value) => { setAuthorQuery(value); setAuthorPickerOpen(true); }} onAuthorPickerOpen={setAuthorPickerOpen} onSelectAuthor={selectAuthor} onEditorReady={editorReady} onFormat={format} onMediaInput={(file) => void insertMedia(file)} onUndo={() => editor?.chain().focus().undo().run()} onRedo={() => editor?.chain().focus().redo().run()} onMove={moveChronicle} onAddChronicle={addChronicle} onSelectChronicle={selectChronicle} onFilterChange={setChronicleFilter} onSaveVersion={saveVersion} onRestoreVersion={restoreVersion} onOpenBroadcast={openBroadcast} onBroadcastTargetChange={setBroadcastTarget} onConfirmBroadcast={confirmBroadcast} onCloseBroadcast={() => setBroadcastOpen(false)} onSelectSlider={setSlider} onPictureInPicture={pictureInPicture} onShare={() => setShareOpen(true)} onCloseShare={() => setShareOpen(false)} onShareModeChange={setShareMode} onCopyShareLink={() => void copy(publicLink())} onCopySliderLink={() => void copy(publicLink("slider"))} onThemeChange={toggleTheme}
    />
  </>;
}
