import { Show } from "solid-js";
import { type BroadcastPayload } from "./slider-realtime.ctrl";
import styles from "./slider-output.module.css";

export function SliderOutputView(props: { payload: BroadcastPayload | null }) {
  return <main class={styles.output} aria-live="polite"><Show when={props.payload} fallback={<span class={styles.visuallyHidden}>Aucune diffusion en cours.</span>}>{(payload) => <section class={styles.payload} aria-label="Contenu diffusé">{payload().text && <p>{payload().text}</p>}{payload().images.map((src) => <img src={src} alt="Image diffusée" />)}</section>}</Show></main>;
}
