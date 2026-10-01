import { ChronicleEditorView } from "../chronicle/chronicle-editor.view";
import { type Slider, SliderPreviewView } from "../presentation/slider-preview.view";
import styles from "./roadcast-workspace.module.css";

export type RoadcastWorkspaceTheme = "dark" | "light";

export type RoadcastWorkspaceViewProps = {
  slug: string;
  document: string;
  minutes: number;
  slider: Slider;
  notice: string;
  theme: RoadcastWorkspaceTheme;
  onDocumentInput: (value: string) => void;
  onMove: (direction: "up" | "down") => void;
  onOpenMedia: () => void;
  onSelectSlider: (slider: Slider) => void;
  onPictureInPicture: () => void;
  onShare: () => void;
  onThemeChange: () => void;
};

export function RoadcastWorkspaceView(props: RoadcastWorkspaceViewProps) {
  const isLight = () => props.theme === "light";

  return <main classList={{ [styles.page]: true, [styles.light]: isLight() }}>
    <header class={styles.header}>
      <a href="/" class={styles.brand} aria-label="Accueil Roadcast"><span class={styles.firstLetter}>R</span><span class={styles.logoText}>oadcast</span></a>
      <div class={styles.links}>
        <a href={`/${props.slug}/read`}>Lecture</a>
        <a href={`/slider/${props.slug}-alpha`}>Slider</a>
        <button type="button" onClick={props.onShare}>Partager</button>
        <button class={styles.themeButton} type="button" onClick={props.onThemeChange} aria-label={isLight() ? "Passer au mode sombre" : "Passer au mode clair"} title={isLight() ? "Mode sombre" : "Mode clair"}>{isLight() ? "☾" : "☼"}</button>
      </div>
    </header>

    <div class={styles.status} aria-live="polite">{props.notice}</div>

    <div class={styles.workspace}>
      <nav class={styles.tree} aria-label="Arbre des chroniques">
        <p>VOTRE ROADCAST</p>
        <h1>Démo de chronique</h1>
        <ol>
          <li><button type="button" aria-current="page">Bienvenue</button></li>
          <li><button type="button">Conclusion</button></li>
        </ol>
        <button type="button" class={styles.add}>+ Nouvelle chronique</button>
        <hr />
        <small>Camille est connectée · vous pouvez revendiquer le nom de chroniqueur.</small>
      </nav>

      <ChronicleEditorView title="Bienvenue" document={props.document} minutes={props.minutes} openMedia={props.onOpenMedia} onDocumentInput={props.onDocumentInput} onMove={props.onMove} />

      <div data-slider-preview>
        <SliderPreviewView active={props.slider} interactive={props.slider === "bravo"} onSelect={props.onSelectSlider} onPictureInPicture={props.onPictureInPicture} />
      </div>
    </div>
  </main>;
}
