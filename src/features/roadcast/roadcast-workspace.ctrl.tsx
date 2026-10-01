import { createSignal } from "solid-js";
import { ChronicleEditorView } from "../chronicle/chronicle-editor.view";
import { estimateChronicleMinutes } from "../chronicle/reading-time.ctrl";
import { MediaDialogView } from "../media/media-dialog.view";
import { type Slider, SliderPreviewView } from "../presentation/slider-preview.view";
import styles from "./roadcast-workspace.module.css";

const seed = "Bienvenue dans la chronique. Écris librement, ajoute tes médias au fil du texte et décide ce qui part sur chaque slider.\n\nL’estimation de temps aide toute l’équipe à garder le rythme.";
export function RoadcastWorkspaceCtrl(props: { slug: string }) {
  const [documentText, setDocumentText] = createSignal(seed);
  const [slider, setSlider] = createSignal<Slider>("alpha");
  const [mediaOpen, setMediaOpen] = createSignal(false);
  const [notice, setNotice] = createSignal("");
  const pictureInPicture = async () => { const candidate = globalThis.document?.querySelector("[data-slider-preview]") as HTMLElement | null; if (candidate && "requestPictureInPicture" in candidate) await (candidate as unknown as { requestPictureInPicture(): Promise<void> }).requestPictureInPicture(); else setNotice("Le Picture-in-Picture est disponible dans un navigateur compatible."); };
  return <main class={styles.page}><header class={styles.header}><a href="/" class={styles.brand}>roadcast</a><div class={styles.links}><a href={`/roadcast/${props.slug}/read`}>Lecture</a><a href={`/slider/${props.slug}-alpha`}>Slider</a><button type="button" onClick={() => setNotice("Lien de modification copié — à brancher sur le presse-papiers avec l’authentification.")}>Partager</button></div></header><div class={styles.status} aria-live="polite">{notice()}</div><div class={styles.workspace}><nav class={styles.tree} aria-label="Arbre des chroniques"><p>VOTRE ROADCAST</p><h1>Démo de chronique</h1><ol><li><button type="button" aria-current="page">↳ Bienvenue</button></li><li><button type="button">↳ Conclusion</button></li></ol><button type="button" class={styles.add}>+ Nouvelle chronique</button><hr /><small>Camille est connectée · vous pouvez revendiquer le nom de chroniqueur.</small></nav><ChronicleEditorView title="Bienvenue" document={documentText()} minutes={estimateChronicleMinutes(documentText())} openMedia={() => setMediaOpen(true)} onDocumentInput={setDocumentText} onMove={(direction) => setNotice(`Chronique déplacée vers le ${direction === "up" ? "haut" : "bas"}.`)} /><div data-slider-preview><SliderPreviewView active={slider()} interactive={slider() === "bravo"} onSelect={setSlider} onPictureInPicture={pictureInPicture} /></div></div><MediaDialogView open={mediaOpen()} onClose={() => setMediaOpen(false)} onDelete={() => { setMediaOpen(false); setNotice("Média supprimé."); }} onSend={(target) => { setMediaOpen(false); setSlider(target); setNotice(`Média envoyé à ${target}.`); }} /></main>;
}
