import { type ChronicleEditorElement, type ChronicleFormat, type ChronicleVersion, type MediaFile, ChronicleEditorView } from "../chronicle/chronicle-editor.view";
import { type BroadcastDraft, BroadcastDialogView } from "../presentation/broadcast-dialog.view";
import { type BroadcastPayload, type Slider, SliderPreviewView } from "../presentation/slider-preview.view";
import { type ShareMode, ShareDialogView } from "../sharing/share-dialog.view";
import Moon from "lucide-solid/icons/moon";
import Sun from "lucide-solid/icons/sun";
import Trash2 from "lucide-solid/icons/trash";
import Lock from "lucide-solid/icons/lock";
import styles from "./roadcast-workspace.module.css";

export type RoadcastWorkspaceTheme = "dark" | "light";
export type WorkspaceChronicle = { id: string; title: string; document: string; author: string; versions: ChronicleVersion[]; };
export type RoadcastUsage = { characterCount: number; characterLimit: number; mediaBytes: number; mediaBytesLimit: number; expiresAt: string; };

export type RoadcastWorkspaceViewProps = {
  slug: string;
  readLink: string;
  title: string;
  chronicles: WorkspaceChronicle[];
  selectedChronicleId: string;
  minutes: number;
  usage: RoadcastUsage;
  chronicleFilter: string;
  authors: string[];
  authorQuery: string;
  authorPickerOpen: boolean;
  insertMenuOpen: boolean;
  blockMenu: { top: number; left: number; position: number } | null;
  bubble: { top: number; left: number } | null;
  slider: Slider;
  sliderLink: string;
  broadcasts: Partial<Record<Slider, BroadcastPayload>>;
  broadcastOpen: boolean;
  broadcastDraft: BroadcastDraft | null;
  broadcastTarget: Slider;
  notice: string;
  workspaceUpdateAvailable: boolean;
  theme: RoadcastWorkspaceTheme;
  shareOpen: boolean;
  shareMode: ShareMode;
  shareLink: string;
  chronicleToDelete: WorkspaceChronicle | null;
  versionCleanupOpen: boolean;
  collaboratorName: string;
  collaboratorId: string;
  chronicleLocks: Array<{ chronicleId: string; name: string; ownerId: string; }>;
  lockedBy: string | null;
  workspaceSynced: boolean;
  onTitleInput: (value: string) => void;
  onChronicleTitleInput: (value: string) => void;
  onCollaboratorNameInput: (value: string) => void;
  onAuthorQueryInput: (value: string) => void;
  onAuthorPickerOpen: (open: boolean) => void;
  onInsertMenuOpen: (open: boolean) => void;
  onSelectAuthor: (author: string) => void;
  onEditorReady: (element: ChronicleEditorElement) => void;
  onEditorPointerMove: (coordinates: { left: number; top: number }) => void;
  onEditorPointerLeave: () => void;
  onFormat: (format: ChronicleFormat) => void;
  onInsertBlock: (block: "quote" | "separator") => void;
  onMediaInput: (file: MediaFile | undefined) => void;
  onUndo: () => void;
  onRedo: () => void;
  onMove: (direction: "up" | "down") => void;
  onAddChronicle: () => void;
  onRequestChronicleDeletion: (id: string) => void;
  onConfirmChronicleDeletion: () => void;
  onCloseChronicleDeletion: () => void;
  onSelectChronicle: (id: string) => void;
  onFilterChange: (author: string) => void;
  onSaveVersion: () => void;
  onRestoreVersion: (versionId: string) => void;
  onRequestVersionCleanup: () => void;
  onConfirmVersionCleanup: () => void;
  onCloseVersionCleanup: () => void;
  onOpenBroadcast: () => void;
  onBroadcastTargetChange: (slider: Slider) => void;
  onConfirmBroadcast: () => void;
  onCloseBroadcast: () => void;
  onSelectSlider: (slider: Slider) => void;
  onPictureInPicture: () => void;
  onShare: () => void;
  onCloseShare: () => void;
  onShareModeChange: (mode: ShareMode) => void;
  onCopyShareLink: () => void;
  onCopySliderLink: () => void;
  onThemeChange: () => void;
  onReloadWorkspace: () => void;
};

export function RoadcastWorkspaceView(props: RoadcastWorkspaceViewProps) {
  const isLight = () => props.theme === "light";
  const selectedChronicle = () => props.chronicles.find((chronicle) => chronicle.id === props.selectedChronicleId) ?? props.chronicles[0];
  const filteredChronicles = () => props.chronicleFilter === "all" ? props.chronicles : props.chronicles.filter((chronicle) => chronicle.author === props.chronicleFilter);
  const lockFor = (chronicleId: string) => props.chronicleLocks.find((lock) => lock.chronicleId === chronicleId);
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" });
  const formatBytes = (bytes: number) => bytes < 1_000_000 ? `${Math.ceil(bytes / 1_000)} Ko` : bytes < 1_000_000_000 ? `${(bytes / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo` : `${(bytes / 1_000_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Go`;
  const formatCharacters = (characters: number) => characters.toLocaleString("fr-FR");

  return <main classList={{ [styles.page]: true, [styles.light]: isLight() }}>
    <header class={styles.header}>
      <a href="/" class={styles.brand} aria-label="Accueil Roadcast"><span class={styles.firstLetter}>R</span><span class={styles.logoText}>oadcast</span></a>
      <div class={styles.links}>
        <label class={styles.collaboratorName}><span>Vous</span><input aria-label="Votre nom de collaborateur" value={props.collaboratorName} maxlength={60} placeholder="Votre nom" onInput={(event) => props.onCollaboratorNameInput(event.currentTarget.value)} /></label>
        <a href={props.readLink}>Lecture</a>
        <button type="button" onClick={props.onShare}>Partager</button>
        <button class={styles.themeButton} type="button" onClick={props.onThemeChange} aria-label={isLight() ? "Passer au mode sombre" : "Passer au mode clair"} title={isLight() ? "Mode sombre" : "Mode clair"}>{isLight() ? <Moon size={16} /> : <Sun size={16} />}</button>
      </div>
    </header>

    <div class={styles.status} aria-live="polite">
      <span>{props.notice}</span>
      {props.workspaceUpdateAvailable && <span class={styles.workspaceUpdate}>Modifications disponibles <button type="button" onClick={props.onReloadWorkspace}>Recharger</button></span>}
    </div>

    <div class={styles.workspace}>
      <nav class={styles.tree} aria-label="Arbre des chroniques">
        <section class={styles.treeIdentity}><label class={styles.roadcastTitleLabel} for="roadcast-name">Titre du roadcast</label><input id="roadcast-name" class={styles.roadcastTitle} value={props.title} onInput={(event) => props.onTitleInput(event.currentTarget.value)} /></section>
        <section class={styles.treeContent}><div class={styles.treeFilter}><label class={styles.filterLabel} for="author-filter">Filtrer les chroniques</label><select id="author-filter" class={styles.filterSelect} value={props.chronicleFilter} onChange={(event) => props.onFilterChange(event.currentTarget.value)}><option value="all">Tous les chroniqueurs</option>{props.authors.map((author) => <option value={author}>{author}</option>)}</select></div><hr class={styles.treeDivider} /><div class={styles.treeList}><h2>Chroniques</h2><ol>
          {filteredChronicles().map((chronicle) => { const lock = lockFor(chronicle.id); const lockLabel = lock && (lock.ownerId === props.collaboratorId ? "Vous éditez" : `${lock.name} édite`); return <li class={styles.chronicleItem}><button class={styles.selectChronicle} type="button" aria-current={chronicle.id === props.selectedChronicleId ? "page" : undefined} onClick={() => props.onSelectChronicle(chronicle.id)}><span>{chronicle.title}</span><span class={styles.chronicleMeta}><small>{chronicle.author}</small>{lockLabel && <span class={styles.lockStatus}><Lock size={12} /><span>{lockLabel}</span></span>}</span></button><button class={styles.deleteChronicle} type="button" disabled={props.chronicles.length <= 1} onClick={() => props.onRequestChronicleDeletion(chronicle.id)} aria-label={`Supprimer ${chronicle.title}`} title="Supprimer la chronique"><Trash2 size={14} /></button></li>; })}
        </ol></div><button type="button" class={styles.add} onClick={props.onAddChronicle}>+ Nouvelle chronique</button><aside class={styles.usage} aria-label="Limites du roadcast"><div class={styles.deletion}><span>Suppression prévue</span><strong>{dateFormatter.format(new Date(props.usage.expiresAt))}</strong></div><div class={styles.quota}><div><span>Caractères</span><strong>{formatCharacters(props.usage.characterCount)} / {formatCharacters(props.usage.characterLimit)}</strong></div><progress value={props.usage.characterCount} max={props.usage.characterLimit} aria-label="Caractères de l’ensemble du roadcast" /></div><div class={styles.quota}><div><span>Médias</span><strong>{formatBytes(props.usage.mediaBytes)} / {formatBytes(props.usage.mediaBytesLimit)}</strong></div><progress value={props.usage.mediaBytes} max={props.usage.mediaBytesLimit} aria-label="Taille des médias de l’ensemble du roadcast" /></div></aside></section>
      </nav>

      <ChronicleEditorView title={selectedChronicle().title} minutes={props.minutes} authors={props.authors} authorQuery={props.authorQuery} authorPickerOpen={props.authorPickerOpen} insertMenuOpen={props.insertMenuOpen} blockMenu={props.blockMenu} versions={selectedChronicle().versions} bubble={props.bubble} lockedBy={props.lockedBy} workspaceSynced={props.workspaceSynced} onTitleInput={props.onChronicleTitleInput} onAuthorQueryInput={props.onAuthorQueryInput} onAuthorPickerOpen={props.onAuthorPickerOpen} onInsertMenuOpen={props.onInsertMenuOpen} onSelectAuthor={props.onSelectAuthor} onEditorReady={props.onEditorReady} onEditorPointerMove={props.onEditorPointerMove} onEditorPointerLeave={props.onEditorPointerLeave} onFormat={props.onFormat} onInsertBlock={props.onInsertBlock} onOpenBroadcast={props.onOpenBroadcast} onMediaInput={props.onMediaInput} onUndo={props.onUndo} onRedo={props.onRedo} onMove={props.onMove} onSaveVersion={props.onSaveVersion} onRestoreVersion={props.onRestoreVersion} onRequestVersionCleanup={props.onRequestVersionCleanup} />

      <div data-slider-preview>
        <SliderPreviewView active={props.slider} payload={props.broadcasts[props.slider] ?? null} link={props.sliderLink} onSelect={props.onSelectSlider} onPictureInPicture={props.onPictureInPicture} onCopyLink={props.onCopySliderLink} />
      </div>
    </div>
    <ShareDialogView open={props.shareOpen} mode={props.shareMode} link={props.shareLink} onModeChange={props.onShareModeChange} onCopy={props.onCopyShareLink} onClose={props.onCloseShare} />
    <BroadcastDialogView open={props.broadcastOpen} draft={props.broadcastDraft} slider={props.broadcastTarget} onSliderChange={props.onBroadcastTargetChange} onConfirm={props.onConfirmBroadcast} onClose={props.onCloseBroadcast} />
    <dialog class={styles.deleteDialog} open={props.chronicleToDelete !== null} aria-labelledby="delete-chronicle-title">
      <h2 id="delete-chronicle-title">Supprimer cette chronique ?</h2>
      <p><strong>{props.chronicleToDelete?.title}</strong> et ses versions seront supprimées de ce roadcast.</p>
      <div><button type="button" onClick={props.onCloseChronicleDeletion}>Annuler</button><button class={styles.deleteConfirm} type="button" onClick={props.onConfirmChronicleDeletion}>Supprimer</button></div>
    </dialog>
    <dialog class={styles.deleteDialog} open={props.versionCleanupOpen} aria-labelledby="cleanup-versions-title">
      <h2 id="cleanup-versions-title">Nettoyer l’historique ?</h2>
      <p>{selectedChronicle().versions.length} version{selectedChronicle().versions.length > 1 ? "s seront" : " sera"} supprimée{selectedChronicle().versions.length > 1 ? "s" : ""}. La chronique courante est conservée.</p>
      <div><button type="button" onClick={props.onCloseVersionCleanup}>Annuler</button><button class={styles.deleteConfirm} type="button" onClick={props.onConfirmVersionCleanup}>Nettoyer</button></div>
    </dialog>
  </main>;
}
