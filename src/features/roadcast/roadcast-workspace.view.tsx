import { type ChronicleEditorElement, type ChronicleFormat, type ChronicleVersion, type MediaFile, ChronicleEditorView } from "../chronicle/chronicle-editor.view";
import { type BroadcastDraft, BroadcastDialogView } from "../presentation/broadcast-dialog.view";
import { type BroadcastPayload, type Slider, SliderPreviewView } from "../presentation/slider-preview.view";
import { type ShareMode, ShareDialogView } from "../sharing/share-dialog.view";
import styles from "./roadcast-workspace.module.css";

export type RoadcastWorkspaceTheme = "dark" | "light";
export type WorkspaceChronicle = { id: string; title: string; document: string; author: string; versions: ChronicleVersion[]; };

export type RoadcastWorkspaceViewProps = {
  slug: string;
  title: string;
  chronicles: WorkspaceChronicle[];
  selectedChronicleId: string;
  minutes: number;
  chronicleFilter: string;
  authors: string[];
  authorQuery: string;
  authorPickerOpen: boolean;
  bubble: { top: number; left: number } | null;
  slider: Slider;
  sliderLink: string;
  broadcasts: Partial<Record<Slider, BroadcastPayload>>;
  broadcastOpen: boolean;
  broadcastDraft: BroadcastDraft | null;
  broadcastTarget: Slider;
  notice: string;
  theme: RoadcastWorkspaceTheme;
  shareOpen: boolean;
  shareMode: ShareMode;
  shareLink: string;
  onTitleInput: (value: string) => void;
  onChronicleTitleInput: (value: string) => void;
  onAuthorQueryInput: (value: string) => void;
  onAuthorPickerOpen: (open: boolean) => void;
  onSelectAuthor: (author: string) => void;
  onEditorReady: (element: ChronicleEditorElement) => void;
  onFormat: (format: ChronicleFormat) => void;
  onMediaInput: (file: MediaFile | undefined) => void;
  onUndo: () => void;
  onRedo: () => void;
  onMove: (direction: "up" | "down") => void;
  onAddChronicle: () => void;
  onSelectChronicle: (id: string) => void;
  onFilterChange: (author: string) => void;
  onSaveVersion: () => void;
  onRestoreVersion: (versionId: string) => void;
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
};

export function RoadcastWorkspaceView(props: RoadcastWorkspaceViewProps) {
  const isLight = () => props.theme === "light";
  const selectedChronicle = () => props.chronicles.find((chronicle) => chronicle.id === props.selectedChronicleId) ?? props.chronicles[0];
  const filteredChronicles = () => props.chronicleFilter === "all" ? props.chronicles : props.chronicles.filter((chronicle) => chronicle.author === props.chronicleFilter);

  return <main classList={{ [styles.page]: true, [styles.light]: isLight() }}>
    <header class={styles.header}>
      <a href="/" class={styles.brand} aria-label="Accueil Roadcast"><span class={styles.firstLetter}>R</span><span class={styles.logoText}>oadcast</span></a>
      <div class={styles.links}>
        <a href={`/${props.slug}/read`}>Lecture</a>
        <button type="button" onClick={props.onShare}>Partager</button>
        <button class={styles.themeButton} type="button" onClick={props.onThemeChange} aria-label={isLight() ? "Passer au mode sombre" : "Passer au mode clair"} title={isLight() ? "Mode sombre" : "Mode clair"}>{isLight() ? "☾" : "☼"}</button>
      </div>
    </header>

    <div class={styles.status} aria-live="polite">{props.notice}</div>

    <div class={styles.workspace}>
      <nav class={styles.tree} aria-label="Arbre des chroniques">
        <section class={styles.treeIdentity}><label class={styles.roadcastTitleLabel} for="roadcast-name">Titre du roadcast</label><input id="roadcast-name" class={styles.roadcastTitle} value={props.title} onInput={(event) => props.onTitleInput(event.currentTarget.value)} /></section>
        <section class={styles.treeContent}><h2>Chroniques</h2><label class={styles.filterLabel} for="author-filter">Filtrer les chroniques</label><select id="author-filter" class={styles.filterSelect} value={props.chronicleFilter} onChange={(event) => props.onFilterChange(event.currentTarget.value)}><option value="all">Tous les chroniqueurs</option>{props.authors.map((author) => <option value={author}>{author}</option>)}</select><hr class={styles.treeDivider} /><ol>
          {filteredChronicles().map((chronicle) => <li><button type="button" aria-current={chronicle.id === props.selectedChronicleId ? "page" : undefined} onClick={() => props.onSelectChronicle(chronicle.id)}><span>{chronicle.title}</span><small>{chronicle.author}</small></button></li>)}
        </ol>
        <button type="button" class={styles.add} onClick={props.onAddChronicle}>+ Nouvelle chronique</button></section>
      </nav>

      <ChronicleEditorView title={selectedChronicle().title} minutes={props.minutes} authors={props.authors} authorQuery={props.authorQuery} authorPickerOpen={props.authorPickerOpen} versions={selectedChronicle().versions} bubble={props.bubble} onTitleInput={props.onChronicleTitleInput} onAuthorQueryInput={props.onAuthorQueryInput} onAuthorPickerOpen={props.onAuthorPickerOpen} onSelectAuthor={props.onSelectAuthor} onEditorReady={props.onEditorReady} onFormat={props.onFormat} onOpenBroadcast={props.onOpenBroadcast} onMediaInput={props.onMediaInput} onUndo={props.onUndo} onRedo={props.onRedo} onMove={props.onMove} onSaveVersion={props.onSaveVersion} onRestoreVersion={props.onRestoreVersion} />

      <div data-slider-preview>
        <SliderPreviewView active={props.slider} payload={props.broadcasts[props.slider] ?? null} link={props.sliderLink} onSelect={props.onSelectSlider} onPictureInPicture={props.onPictureInPicture} onCopyLink={props.onCopySliderLink} />
      </div>
    </div>
    <ShareDialogView open={props.shareOpen} mode={props.shareMode} link={props.shareLink} onModeChange={props.onShareModeChange} onCopy={props.onCopyShareLink} onClose={props.onCloseShare} />
    <BroadcastDialogView open={props.broadcastOpen} draft={props.broadcastDraft} slider={props.broadcastTarget} onSliderChange={props.onBroadcastTargetChange} onConfirm={props.onConfirmBroadcast} onClose={props.onCloseBroadcast} />
  </main>;
}
