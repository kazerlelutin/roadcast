import { ChronicleEditorView } from "../chronicle/chronicle-editor.view";
import { type Slider, SliderPreviewView } from "../presentation/slider-preview.view";
import { type ShareMode, ShareDialogView } from "../sharing/share-dialog.view";
import styles from "./roadcast-workspace.module.css";

export type RoadcastWorkspaceTheme = "dark" | "light";
export type WorkspaceChronicle = { id: string; title: string; document: string; author: string; };

export type RoadcastWorkspaceViewProps = {
  slug: string;
  title: string;
  chronicles: WorkspaceChronicle[];
  selectedChronicleId: string;
  minutes: number;
  chronicleFilter: string;
  authors: string[];
  newAuthor: string;
  slider: Slider;
  broadcastSlider: Slider | null;
  notice: string;
  theme: RoadcastWorkspaceTheme;
  shareOpen: boolean;
  shareMode: ShareMode;
  shareLink: string;
  onTitleInput: (value: string) => void;
  onChronicleTitleInput: (value: string) => void;
  onChronicleAuthorChange: (author: string) => void;
  onDocumentInput: (value: string) => void;
  onFormat: (format: "bold" | "italic" | "heading" | "list" | "link" | "separator") => void;
  onMove: (direction: "up" | "down") => void;
  onInsert: (position: "above" | "below") => void;
  onSelectChronicle: (id: string) => void;
  onFilterChange: (author: string) => void;
  onNewAuthorInput: (value: string) => void;
  onCreateAuthor: () => void;
  onOpenMedia: () => void;
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
  const sliderLink = () => `/slider/${props.slug}-${props.slider}`;

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
        <label class={styles.roadcastTitleLabel} for="roadcast-name">Titre du roadcast</label>
        <input id="roadcast-name" class={styles.roadcastTitle} value={props.title} onInput={(event) => props.onTitleInput(event.currentTarget.value)} />
        <div class={styles.filterRow}><label for="chronicle-author">Auteur</label><select id="chronicle-author" value={selectedChronicle().author} onChange={(event) => props.onChronicleAuthorChange(event.currentTarget.value)}>{props.authors.map((author) => <option value={author}>{author}</option>)}</select></div>
        <div class={styles.filterRow}><label for="author-filter">Chroniqueur</label><select id="author-filter" value={props.chronicleFilter} onChange={(event) => props.onFilterChange(event.currentTarget.value)}><option value="all">Tous les chroniqueurs</option>{props.authors.map((author) => <option value={author}>{author}</option>)}</select></div>
        <ol>
          {filteredChronicles().map((chronicle) => <li><button type="button" aria-current={chronicle.id === props.selectedChronicleId ? "page" : undefined} onClick={() => props.onSelectChronicle(chronicle.id)}><span>{chronicle.title}</span><small>{chronicle.author}</small></button></li>)}
        </ol>
        <button type="button" class={styles.add} onClick={() => props.onInsert("below")}>+ Nouvelle chronique</button>
        <hr />
        <label class={styles.authorCreator} for="new-author">Créer un chroniqueur<input id="new-author" value={props.newAuthor} placeholder="Nom du chroniqueur" onInput={(event) => props.onNewAuthorInput(event.currentTarget.value)} /><button type="button" onClick={props.onCreateAuthor}>Ajouter</button></label>
      </nav>

      <ChronicleEditorView title={selectedChronicle().title} document={selectedChronicle().document} minutes={props.minutes} openMedia={props.onOpenMedia} onTitleInput={props.onChronicleTitleInput} onDocumentInput={props.onDocumentInput} onFormat={props.onFormat} onMove={props.onMove} onInsert={props.onInsert} />

      <div data-slider-preview>
        <SliderPreviewView active={props.slider} broadcasting={props.broadcastSlider === props.slider} interactive={props.slider === "bravo"} link={sliderLink()} onSelect={props.onSelectSlider} onPictureInPicture={props.onPictureInPicture} onCopyLink={props.onCopySliderLink} />
      </div>
    </div>
    <ShareDialogView open={props.shareOpen} mode={props.shareMode} link={props.shareLink} onModeChange={props.onShareModeChange} onCopy={props.onCopyShareLink} onClose={props.onCloseShare} />
  </main>;
}
