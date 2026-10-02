import type { BroadcastPayload } from "./slider-realtime.ctrl";
import styles from "./slider-content.module.css";

export function SliderContentView(props: { payload: BroadcastPayload }) {
  const hasText = () => !!props.payload.text;
  const hasMedia = () => props.payload.images.length > 0;
  return <div class={styles.surface}>
    <div classList={{ [styles.payload]: true, [styles.withText]: hasText(), [styles.withMedia]: hasMedia() }}>
      {hasText() && <p class={styles.text}>{props.payload.text}</p>}
      {hasMedia() && <div class={styles.media}>{props.payload.images.map((src) => <img src={src} alt="Image diffusée" />)}</div>}
    </div>
  </div>;
}
