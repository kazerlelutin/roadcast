import { type Slider } from "./slider-preview.view";
import styles from "./broadcast-dialog.module.css";

export type BroadcastDraft = { text: string; images: string[]; videos: string[]; };
export type BroadcastDialogViewProps = { open: boolean; draft: BroadcastDraft | null; slider: Slider; onSliderChange: (slider: Slider) => void; onConfirm: () => void; onClose: () => void; };

export function BroadcastDialogView(props: BroadcastDialogViewProps) {
  return <dialog class={styles.dialog} open={props.open} aria-label="Diffuser la sélection" aria-modal="true"><header><button type="button" onClick={props.onClose} aria-label="Annuler la diffusion">×</button></header><section class={styles.selection} aria-label="Sélection à diffuser">{props.draft?.text && <p>{props.draft.text}</p>}{props.draft?.images.map((src) => <img src={src} alt="Image sélectionnée pour la diffusion" />)}{props.draft?.videos.map((src) => <iframe src={src} title="Vidéo YouTube sélectionnée" allow="autoplay" />)}{!props.draft?.text && !props.draft?.images.length && !props.draft?.videos.length && <p>Aucun contenu sélectionné.</p>}</section><fieldset><legend>Envoyer vers</legend><div class={styles.sliders}>{(["alpha", "bravo", "charly"] as const).map((slider) => <button type="button" aria-pressed={props.slider === slider} onClick={() => props.onSliderChange(slider)}>{slider}</button>)}</div></fieldset><footer><button type="button" onClick={props.onClose}>Annuler</button><button type="button" class={styles.confirm} onClick={props.onConfirm}>Diffuser</button></footer></dialog>;
}
