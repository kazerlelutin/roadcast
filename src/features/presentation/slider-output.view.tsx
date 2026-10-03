import { Show } from "solid-js";
import { type BroadcastPayload } from "./slider-realtime.ctrl";
import { SliderContentView } from "./slider-content.view";
import styles from "./slider-output.module.css";

export function SliderOutputView(props: { payload: BroadcastPayload | null }) {
  return <main class={styles.output} data-slider-output aria-live="polite"><Show when={props.payload} fallback={<span class={styles.visuallyHidden}>Aucune diffusion en cours.</span>}>{(payload) => <SliderContentView payload={payload()} />}</Show></main>;
}
