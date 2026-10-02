import { useAction } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import type { ChronicleEditorElement, ChronicleFormat, ChronicleInsertBlock, MediaFile } from "../chronicle/chronicle-editor.view";
import type { BroadcastDraft } from "../presentation/broadcast-dialog.view";
import { connectSliderRealtime, type Slider, type SliderRealtimeClient, type BroadcastPayload } from "../presentation/slider-realtime.ctrl";
import { type ShareMode } from "../sharing/share-dialog.view";
import { estimateChronicleMinutes } from "../chronicle/reading-time.ctrl";
import { planLimits } from "../billing/plan.const";
import { type RoadcastWorkspaceTheme, type WorkspaceChronicle, RoadcastWorkspaceView } from "./roadcast-workspace.view";
import { emptyRoadcastAccessLinks, type RoadcastAccessLinks } from "./access-links.ctrl";
import { openSliderPictureInPicture, type SliderPictureInPicture } from "../presentation/picture-in-picture.ctrl";
import { removeChronicle } from "./chronicle-removal.ctrl";
import { calculateRoadcastUsage } from "./roadcast-usage.ctrl";
import { connectChronicleLocks, type ChronicleLock, type ChronicleLockClient } from "../collaboration/chronicle-lock.ctrl";
import { isChronicleVersionSynced } from "../chronicle/chronicle-version.ctrl";
import { saveRoadcastWorkspace } from "./workspace-persistence.actions";
import { loadRoadcastWorkspace } from "./workspace-persistence.queries";

const initialChronicles: WorkspaceChronicle[] = [
  { id: "chronicle-initial", title: "Nouvelle chronique", document: "<p></p>", author: "", versions: [] },
];
const maxVersions = 12;
type PersistedWorkspace = { title: string; chronicles: WorkspaceChronicle[]; authors: string[]; lastActivityAt?: string; links?: RoadcastAccessLinks; };

export function RoadcastWorkspaceCtrl(props: { slug: string }) {
  const [title, setTitle] = createSignal("Démo de chronique");
  const [chronicles, setChronicles] = createSignal(initialChronicles);
  const [selectedChronicleId, setSelectedChronicleId] = createSignal(initialChronicles[0].id);
  const [chronicleFilter, setChronicleFilter] = createSignal("all");
  const [authors, setAuthors] = createSignal<string[]>([]);
  const [authorQuery, setAuthorQuery] = createSignal(initialChronicles[0].author);
  const [authorPickerOpen, setAuthorPickerOpen] = createSignal(false);
  const [insertMenuOpen, setInsertMenuOpen] = createSignal(false);
  const [blockMenu, setBlockMenu] = createSignal<{ top: number; left: number; position: number } | null>(null);
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
  const [chronicleToDeleteId, setChronicleToDeleteId] = createSignal<string | null>(null);
  const [collaboratorName, setCollaboratorName] = createSignal("");
  const [chronicleLocks, setChronicleLocks] = createSignal<ChronicleLock[]>([]);
  const [notice, setNotice] = createSignal("");
  const [workspaceUpdateAvailable, setWorkspaceUpdateAvailable] = createSignal(false);
  const [theme, setTheme] = createSignal<RoadcastWorkspaceTheme>("dark");
  const [accessLinks, setAccessLinks] = createSignal<RoadcastAccessLinks>(emptyRoadcastAccessLinks);
  const [pip, setPip] = createSignal<SliderPictureInPicture>();
  const [lastActivityAt, setLastActivityAt] = createSignal(new Date().toISOString());
  const saveWorkspace = useAction(saveRoadcastWorkspace);
  let editor: Editor | undefined;
  let editorChronicleId = "";
  let editingChronicleId: string | undefined;
  let lockStart: ReturnType<typeof setTimeout> | undefined;
  let lockIdle: ReturnType<typeof setTimeout> | undefined;
  let lockExpiry: ReturnType<typeof globalThis.setInterval> | undefined;
  let workspaceSave: ReturnType<typeof globalThis.setTimeout> | undefined;
  let workspaceSaveInFlight = false;
  let workspaceSaveQueued = false;
  let collaboration: ChronicleLockClient | undefined;
  const realtime = new Map<Slider, SliderRealtimeClient>();

  const selectedChronicle = () => chronicles().find((chronicle) => chronicle.id === selectedChronicleId()) ?? chronicles()[0];
  const versionSynced = () => isChronicleVersionSynced(selectedChronicle(), selectedChronicle().versions.at(-1));
  const usage = () => {
    const expiresAt = new Date(new Date(lastActivityAt()).getTime() + planLimits.free.inactiveDays * 24 * 60 * 60 * 1000).toISOString();
    return { ...calculateRoadcastUsage(chronicles()), characterLimit: planLimits.free.charactersPerRoadcast, mediaBytesLimit: planLimits.free.mediaBytes, expiresAt };
  };
  const lockByOther = (chronicleId: string) => chronicleLocks().find((lock) => lock.chronicleId === chronicleId && lock.ownerId !== collaboration?.sessionId);
  const selectedLockByOther = () => lockByOther(selectedChronicleId());
  const releaseEditingLock = () => {
    if (lockStart) globalThis.clearTimeout(lockStart);
    if (lockIdle) globalThis.clearTimeout(lockIdle);
    if (editingChronicleId) collaboration?.release(editingChronicleId);
    editingChronicleId = undefined;
    lockStart = undefined;
    lockIdle = undefined;
  };
  const keepLockAlive = () => {
    if (lockIdle) globalThis.clearTimeout(lockIdle);
    lockIdle = setTimeout(releaseEditingLock, 8_000);
  };
  const markChronicleAsEditing = () => {
    const name = collaboratorName().trim();
    const chronicleId = selectedChronicleId();
    if (!name || lockByOther(chronicleId)) return;
    if (editingChronicleId === chronicleId) {
      collaboration?.claim(chronicleId, name);
      keepLockAlive();
      return;
    }
    if (lockStart) return;
    releaseEditingLock();
    lockStart = setTimeout(() => {
      lockStart = undefined;
      if (selectedChronicleId() !== chronicleId || lockByOther(chronicleId) || !collaboratorName().trim()) return;
      editingChronicleId = chronicleId;
      collaboration?.claim(chronicleId, collaboratorName().trim());
      keepLockAlive();
    }, 400);
  };
  const publicLink = (mode: ShareMode = shareMode()) => {
    const links = accessLinks();
    const path = mode === "edit" ? `/${props.slug}` : mode === "read" ? `/read/${links.read}` : `/slider/${links.sliders[slider()]}`;
    return `${globalThis.location?.origin ?? ""}${path}`;
  };
  const connectRealtime = (links: RoadcastAccessLinks) => {
    realtime.forEach((client) => client.close());
    realtime.clear();
    (["alpha", "bravo", "charly"] as const).forEach((target) => {
      realtime.set(target, connectSliderRealtime(links.sliders[target], (payload) => setBroadcasts((current) => ({ ...current, [target]: payload }))));
    });
  };
  const persistWorkspace = async () => {
    if (workspaceSaveInFlight) { workspaceSaveQueued = true; return; }
    workspaceSaveInFlight = true;
    const activityAt = new Date().toISOString();
    setLastActivityAt(activityAt);
    try {
      const saved = await saveWorkspace({ slug: props.slug, sourceId: collaboration?.sessionId, title: title(), chronicles: chronicles() });
      if (saved?.links) setAccessLinks(saved.links);
      collaboration?.announceWorkspaceUpdate();
    } catch {
      setNotice("Impossible d’enregistrer ce roadcast en base.");
    } finally {
      workspaceSaveInFlight = false;
      if (workspaceSaveQueued) { workspaceSaveQueued = false; scheduleWorkspaceSave(); }
    }
  };
  const scheduleWorkspaceSave = () => {
    if (!hydrated()) return;
    if (workspaceSave) globalThis.clearTimeout(workspaceSave);
    workspaceSave = globalThis.setTimeout(() => { workspaceSave = undefined; void persistWorkspace(); }, 600);
  };
  const updateSelectedChronicle = (updates: Partial<WorkspaceChronicle>) => {
    setChronicles((current) => current.map((chronicle) => chronicle.id === selectedChronicleId() ? { ...chronicle, ...updates } : chronicle));
    scheduleWorkspaceSave();
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
    const activePip = pip();
    if (activePip?.isOpen()) {
      activePip.focus();
      return;
    }
    try {
      const openedPip = await openSliderPictureInPicture(broadcasts()[slider()] ?? null);
      if (openedPip) { setPip(openedPip); return; }
    } catch {
      // Un navigateur peut exposer l’API tout en refusant la fenêtre PiP.
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
    scheduleWorkspaceSave();
    setNotice("Nouvelle chronique ajoutée.");
  };

  const moveChronicle = (direction: "up" | "down") => {
    let moved = false;
    setChronicles((items) => {
      const index = items.findIndex((item) => item.id === selectedChronicleId());
      const destination = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || destination < 0 || destination >= items.length) return items;
      const next = [...items];
      [next[index], next[destination]] = [next[destination], next[index]];
      moved = true;
      return next;
    });
    if (moved) scheduleWorkspaceSave();
  };

  const requestChronicleDeletion = (id: string) => {
    if (chronicles().length <= 1) { setNotice("Un roadcast doit contenir au moins une chronique."); return; }
    if (chronicles().some((chronicle) => chronicle.id === id)) setChronicleToDeleteId(id);
  };

  const confirmChronicleDeletion = () => {
    const id = chronicleToDeleteId();
    if (!id) return;
    const current = chronicles();
    const result = removeChronicle(current, id, selectedChronicleId());
    if (result.chronicles === current) { setChronicleToDeleteId(null); return; }
    setChronicles(result.chronicles);
    setSelectedChronicleId(result.selectedChronicleId);
    const next = result.chronicles.find((chronicle) => chronicle.id === result.selectedChronicleId);
    if (next) setAuthorQuery(next.author);
    scheduleWorkspaceSave();
    setChronicleToDeleteId(null);
    setNotice("Chronique supprimée.");
  };

  const selectAuthor = (value: string) => {
    const author = value.trim();
    if (!author) { setNotice("Saisissez un nom de chroniqueur."); return; }
    markChronicleAsEditing();
    if (!authors().includes(author)) setAuthors((current) => [...current, author]);
    updateSelectedChronicle({ author });
    setAuthorQuery(author);
    setAuthorPickerOpen(false);
    setInsertMenuOpen(false);
    setBubble(null);
    setNotice(`${author} est associé à cette chronique.`);
  };

  const selectChronicle = (id: string) => {
    const chronicle = chronicles().find((item) => item.id === id);
    if (!chronicle) return;
    if (id !== selectedChronicleId()) releaseEditingLock();
    setSelectedChronicleId(id);
    setAuthorQuery(chronicle.author);
    setAuthorPickerOpen(false);
    setInsertMenuOpen(false);
  };

  const insertMedia = async (file: MediaFile | undefined) => {
    if (!file || !editor) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setNotice("Choisissez une image de moins de 5 Mo."); return; }
    const position = blockMenu()?.position ?? editor.state.selection.from;
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    editor.chain().focus().insertContentAt(position, { type: "image", attrs: { src: `data:${file.type};base64,${globalThis.btoa(binary)}`, alt: "Image de la chronique" } }).run();
    setNotice("Image ajoutée à la chronique.");
  };

  const insertBlock = (block: ChronicleInsertBlock) => {
    if (!editor) return;
    const position = blockMenu()?.position ?? editor.state.selection.from;
    const content = block === "quote" ? { type: "blockquote", content: [{ type: "paragraph" }] } : { type: "horizontalRule" };
    editor.chain().focus().insertContentAt(position, content).run();
  };

  const updateBlockMenu = (position: number) => {
    if (!editor || insertMenuOpen()) return;
    const resolved = editor.state.doc.resolve(position);
    let blockPosition = position;
    for (let depth = resolved.depth; depth > 0; depth -= 1) {
      if (resolved.node(depth).isBlock) { blockPosition = resolved.before(depth); break; }
    }
    const nearby = editor.state.doc.childAfter(position);
    if (resolved.depth === 0 && nearby.node?.isBlock) blockPosition = nearby.offset;
    const node = editor.view.nodeDOM(blockPosition);
    const fallback = editor.view.coordsAtPos(Math.min(blockPosition + 1, editor.state.doc.content.size));
    const bounds = node instanceof HTMLElement ? node.getBoundingClientRect() : null;
    const left = Math.max(8, (bounds?.left ?? fallback.left) - 34);
    const top = bounds ? bounds.top + Math.min(18, Math.max(10, bounds.height / 2)) : fallback.top + 10;
    setBlockMenu({ top, left, position: blockPosition });
  };

  const onEditorPointerMove = (coordinates: { left: number; top: number }) => {
    if (!editor || insertMenuOpen()) return;
    const found = editor.view.posAtCoords(coordinates);
    if (found) updateBlockMenu(found.pos);
  };

  const setInsertMenuVisibility = (open: boolean) => {
    setInsertMenuOpen(open);
    if (!open && editor) globalThis.requestAnimationFrame(() => {
      if (editor && !insertMenuOpen()) updateBlockMenu(editor.state.selection.from);
    });
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
      editable: !selectedLockByOther(),
      onUpdate: ({ editor: instance }) => { markChronicleAsEditing(); updateSelectedChronicle({ document: instance.getHTML() }); },
      onSelectionUpdate: ({ editor: instance }) => {
        const { from, to } = instance.state.selection;
        const position = instance.view.coordsAtPos(to);
        if (from === to) { setBubble(null); updateBlockMenu(to); return; }
        setBlockMenu(null);
        setBubble({ top: position.top - 8, left: (position.left + position.right) / 2 });
      },
    });
    updateBlockMenu(editor.state.selection.from);
  };

  const saveVersion = () => {
    const chronicle = selectedChronicle();
    if (isChronicleVersionSynced(chronicle, chronicle.versions.at(-1))) return;
    const version = { id: `version-${Date.now()}`, savedAt: new Date().toISOString(), title: chronicle.title, author: chronicle.author, document: chronicle.document };
    updateSelectedChronicle({ versions: [...chronicle.versions, version].slice(-maxVersions) });
    setNotice("Version enregistrée.");
  };

  const restoreVersion = (versionId: string) => {
    if (!versionId) return;
    const version = selectedChronicle().versions.find((item) => item.id === versionId);
    if (!version) return;
    updateSelectedChronicle({ title: version.title, author: version.author, document: version.document });
    setAuthorQuery(version.author);
    editor?.commands.setContent(version.document);
    setNotice("Version restaurée. Enregistrez une nouvelle version pour la conserver.");
  };

  createEffect(() => {
    const chronicle = selectedChronicle();
    if (editor && editorChronicleId !== chronicle.id) {
      editorChronicleId = chronicle.id;
      editor.commands.setContent(chronicle.document, { emitUpdate: false });
    }
  });

  createEffect(() => {
    const locked = selectedLockByOther();
    editor?.setEditable(!locked);
    if (locked && editingChronicleId === selectedChronicleId()) releaseEditingLock();
  });

  createEffect(() => {
    const activePip = pip();
    if (!activePip) return;
    if (!activePip.isOpen()) { setPip(); return; }
    activePip.update(broadcasts()[slider()] ?? null);
  });

  onMount(() => {
    const savedTheme = globalThis.localStorage.getItem("roadcast-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    const savedCollaboratorName = globalThis.localStorage.getItem("roadcast-collaborator-name");
    if (savedCollaboratorName) setCollaboratorName(savedCollaboratorName.slice(0, 60));
    void (async () => {
      let savedWorkspace: PersistedWorkspace | null = null;
      try { savedWorkspace = await loadRoadcastWorkspace(props.slug); } catch { setNotice("Impossible de charger ce roadcast depuis la base."); }
      if (savedWorkspace && typeof savedWorkspace.title === "string" && Array.isArray(savedWorkspace.chronicles) && savedWorkspace.chronicles.length > 0 && Array.isArray(savedWorkspace.authors)) {
        const savedChronicles = savedWorkspace.chronicles.map((chronicle) => ({ ...chronicle, versions: Array.isArray(chronicle.versions) ? chronicle.versions.slice(-maxVersions).map((version) => ({ ...version, title: typeof version.title === "string" ? version.title : chronicle.title, author: typeof version.author === "string" ? version.author : chronicle.author })) : [] }));
        setTitle(savedWorkspace.title);
        setChronicles(savedChronicles);
        setAuthors(savedWorkspace.authors);
        if (typeof savedWorkspace.lastActivityAt === "string" && !Number.isNaN(new Date(savedWorkspace.lastActivityAt).getTime())) setLastActivityAt(savedWorkspace.lastActivityAt);
        editorChronicleId = "";
        setSelectedChronicleId(savedChronicles[0].id);
        setAuthorQuery(savedChronicles[0].author);
      }
      if (savedWorkspace?.links) {
        setAccessLinks(savedWorkspace.links);
        connectRealtime(savedWorkspace.links);
      }
      setHydrated(true);
    })();
    collaboration = connectChronicleLocks(props.slug, setChronicleLocks, (sourceId) => { if (sourceId !== collaboration?.sessionId) setWorkspaceUpdateAvailable(true); });
    lockExpiry = globalThis.setInterval(() => setChronicleLocks((locks) => locks.filter((lock) => lock.expiresAt > Date.now())), 1_000);
  });

  onCleanup(() => {
    releaseEditingLock();
    if (workspaceSave) globalThis.clearTimeout(workspaceSave);
    if (lockExpiry) globalThis.clearInterval(lockExpiry);
    collaboration?.close();
    editor?.destroy();
    realtime.forEach((client) => client.close());
  });

  return <>
    <RoadcastWorkspaceView
      slug={props.slug} readLink={publicLink("read")} title={title()} chronicles={chronicles()} selectedChronicleId={selectedChronicleId()} minutes={estimateChronicleMinutes(selectedChronicle().document.replace(/<[^>]+>/g, " "))} usage={usage()} chronicleFilter={chronicleFilter()} authors={authors()} authorQuery={authorQuery()} authorPickerOpen={authorPickerOpen()} insertMenuOpen={insertMenuOpen()} blockMenu={blockMenu()} bubble={bubble()} slider={slider()} sliderLink={publicLink("slider")} broadcasts={broadcasts()} broadcastOpen={broadcastOpen()} broadcastDraft={broadcastDraft()} broadcastTarget={broadcastTarget()} notice={notice()} workspaceUpdateAvailable={workspaceUpdateAvailable()} theme={theme()} shareOpen={shareOpen()} shareMode={shareMode()} shareLink={publicLink()} chronicleToDelete={chronicles().find((chronicle) => chronicle.id === chronicleToDeleteId()) ?? null} collaboratorName={collaboratorName()} chronicleLocks={chronicleLocks()} collaboratorId={collaboration?.sessionId ?? ""} lockedBy={selectedLockByOther()?.name ?? null} versionSynced={versionSynced()}
      onTitleInput={(value) => { setTitle(value); scheduleWorkspaceSave(); }} onChronicleTitleInput={(value) => { markChronicleAsEditing(); updateSelectedChronicle({ title: value }); }} onCollaboratorNameInput={(value) => { const name = value.slice(0, 60); setCollaboratorName(name); globalThis.localStorage.setItem("roadcast-collaborator-name", name); if (!name.trim()) releaseEditingLock(); else if (editingChronicleId) collaboration?.claim(editingChronicleId, name.trim()); }} onAuthorQueryInput={(value) => { markChronicleAsEditing(); setAuthorQuery(value); setAuthorPickerOpen(true); }} onAuthorPickerOpen={setAuthorPickerOpen} onInsertMenuOpen={setInsertMenuVisibility} onSelectAuthor={selectAuthor} onEditorReady={editorReady} onEditorPointerMove={onEditorPointerMove} onEditorPointerLeave={() => { if (!insertMenuOpen()) setBlockMenu(null); }} onFormat={format} onInsertBlock={insertBlock} onMediaInput={(file) => void insertMedia(file)} onUndo={() => editor?.chain().focus().undo().run()} onRedo={() => editor?.chain().focus().redo().run()} onMove={moveChronicle} onAddChronicle={addChronicle} onRequestChronicleDeletion={requestChronicleDeletion} onConfirmChronicleDeletion={confirmChronicleDeletion} onCloseChronicleDeletion={() => setChronicleToDeleteId(null)} onSelectChronicle={selectChronicle} onFilterChange={setChronicleFilter} onSaveVersion={saveVersion} onRestoreVersion={restoreVersion} onOpenBroadcast={openBroadcast} onBroadcastTargetChange={setBroadcastTarget} onConfirmBroadcast={confirmBroadcast} onCloseBroadcast={() => setBroadcastOpen(false)} onSelectSlider={setSlider} onPictureInPicture={pictureInPicture} onShare={() => setShareOpen(true)} onCloseShare={() => setShareOpen(false)} onShareModeChange={setShareMode} onCopyShareLink={() => void copy(publicLink())} onCopySliderLink={() => void copy(publicLink("slider"))} onThemeChange={toggleTheme} onReloadWorkspace={() => globalThis.location.reload()}
    />
  </>;
}
