import type { EditorOptions } from "@tiptap/core";
import styles from "./chronicle-editor.module.css";

export type ChronicleVersion = { id: string; savedAt: string; document: string; };
export type MediaFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer>; };
export type ChronicleEditorElement = Exclude<NonNullable<EditorOptions["element"]>, Function>;
export type ChronicleFormat = "paragraph" | "bold" | "italic" | "heading" | "list" | "quote" | "link" | "separator";
export type BroadcastSelection = "text" | "media" | "both";

export type ChronicleEditorViewProps = {
  title: string;
  minutes: number;
  authors: string[];
  authorQuery: string;
  authorPickerOpen: boolean;
  versions: ChronicleVersion[];
  commandMenuOpen: boolean;
  broadcastSelection: BroadcastSelection;
  broadcastSlider: "alpha" | "bravo" | "charly";
  onTitleInput: (value: string) => void;
  onAuthorQueryInput: (value: string) => void;
  onAuthorPickerOpen: (open: boolean) => void;
  onSelectAuthor: (author: string) => void;
  onEditorReady: (element: ChronicleEditorElement) => void;
  onFormat: (format: ChronicleFormat) => void;
  onMediaInput: (file: MediaFile | undefined) => void;
  onUndo: () => void;
  onRedo: () => void;
  onMove: (direction: "up" | "down") => void;
  onSaveVersion: () => void;
  onRestoreVersion: (versionId: string) => void;
  onBroadcastSelectionChange: (selection: BroadcastSelection) => void;
  onBroadcastSliderChange: (slider: "alpha" | "bravo" | "charly") => void;
  onBroadcast: () => void;
};

export function ChronicleEditorView(props: ChronicleEditorViewProps) {
  const matchingAuthors = () => props.authors.filter((author) => author.toLocaleLowerCase().includes(props.authorQuery.toLocaleLowerCase()));
  const canCreateAuthor = () => props.authorQuery.trim().length > 0 && !props.authors.some((author) => author.toLocaleLowerCase() === props.authorQuery.trim().toLocaleLowerCase());

  return <section class={styles.editor} aria-label="Éditeur de chronique">
    <header class={styles.topbar}><span>Toutes les modifications sont enregistrées sur cet appareil.</span><div><button type="button" onClick={props.onUndo} aria-label="Annuler">↶</button><button type="button" onClick={props.onRedo} aria-label="Rétablir">↷</button></div></header>
    <div class={styles.documentShell}>
      <div class={styles.blockRail} aria-label="Ajouter un bloc"><button type="button" onClick={() => props.onFormat("paragraph")} aria-label="Ajouter un paragraphe">+</button><button type="button" onClick={() => props.onFormat("heading")} aria-label="Ajouter un titre">⠿</button></div>
      <article class={styles.document}>
        <p class={styles.kicker}>CHRONIQUE · {props.minutes} MIN</p>
        <input class={styles.title} aria-label="Titre de la chronique" value={props.title} onInput={(event) => props.onTitleInput(event.currentTarget.value)} />
        <div class={styles.metaRow}>
          <div class={styles.authorPicker}><label for="chronicle-author-search">Chroniqueur</label><input id="chronicle-author-search" role="combobox" aria-autocomplete="list" aria-expanded={props.authorPickerOpen} aria-controls="chronicle-author-options" value={props.authorQuery} placeholder="Rechercher ou créer" onFocus={() => props.onAuthorPickerOpen(true)} onBlur={() => props.onAuthorPickerOpen(false)} onInput={(event) => props.onAuthorQueryInput(event.currentTarget.value)} /><div classList={{ [styles.authorOptions]: true, [styles.open]: props.authorPickerOpen }} id="chronicle-author-options" role="listbox" aria-label="Chroniqueurs disponibles">{matchingAuthors().map((author) => <button type="button" role="option" aria-selected={author === props.authorQuery} onMouseDown={(event) => event.preventDefault()} onClick={() => props.onSelectAuthor(author)}>{author}</button>)}{canCreateAuthor() && <button type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => props.onSelectAuthor(props.authorQuery.trim())}>Créer « {props.authorQuery.trim()} »</button>}</div></div>
          <label class={styles.mediaInput}>Insérer une image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => props.onMediaInput(event.currentTarget.files?.[0])} /></label>
        </div>
        <nav class={styles.toolbar} aria-label="Commandes du document"><button type="button" onClick={() => props.onFormat("bold")}><b>B</b></button><button type="button" onClick={() => props.onFormat("italic")}><i>I</i></button><button type="button" onClick={() => props.onFormat("heading")}>Titre</button><button type="button" onClick={() => props.onFormat("list")}>Liste</button><button type="button" onClick={() => props.onFormat("quote")}>Citation</button><button type="button" onClick={() => props.onFormat("link")}>Lien</button></nav>
        <div class={styles.canvas}><div ref={props.onEditorReady} aria-label="Contenu de la chronique" /><div classList={{ [styles.commandMenu]: true, [styles.open]: props.commandMenuOpen }} aria-label="Commandes de bloc"><strong>Ajouter un bloc</strong><button type="button" onClick={() => props.onFormat("paragraph")}>Texte</button><button type="button" onClick={() => props.onFormat("heading")}>Titre</button><button type="button" onClick={() => props.onFormat("list")}>Liste</button><button type="button" onClick={() => props.onFormat("quote")}>Citation</button></div></div>
        <footer><div class={styles.versions}><button type="button" onClick={props.onSaveVersion}>Enregistrer une version</button><label for="chronicle-version">Historique</label><select id="chronicle-version" onChange={(event) => props.onRestoreVersion(event.currentTarget.value)}><option value="">Versions enregistrées</option>{props.versions.slice().reverse().map((version) => <option value={version.id}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(version.savedAt))}</option>)}</select></div><div class={styles.moveActions} aria-label="Changer la position de la chronique"><span>Position</span><button type="button" onClick={() => props.onMove("up")}>↑ Haut</button><button type="button" onClick={() => props.onMove("down")}>↓ Bas</button></div></footer>
      </article>
    </div>
    <section class={styles.broadcast} aria-label="Diffuser une sélection"><strong>Diffuser</strong><label for="broadcast-selection">Contenu</label><select id="broadcast-selection" value={props.broadcastSelection} onChange={(event) => props.onBroadcastSelectionChange(event.currentTarget.value as BroadcastSelection)}><option value="text">Texte sélectionné</option><option value="media">Média(s) du document</option><option value="both">Texte et média(s)</option></select><label for="broadcast-slider">Vers</label><select id="broadcast-slider" value={props.broadcastSlider} onChange={(event) => props.onBroadcastSliderChange(event.currentTarget.value as "alpha" | "bravo" | "charly")}><option value="alpha">Slider Alpha</option><option value="bravo">Slider Bravo</option><option value="charly">Slider Charly</option></select><button type="button" onClick={props.onBroadcast}>Envoyer</button></section>
  </section>;
}
