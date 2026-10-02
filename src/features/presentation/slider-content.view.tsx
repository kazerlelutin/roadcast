import type { BroadcastPayload } from "./slider-realtime.ctrl";
import styles from "./slider-content.module.css";

export function SliderContentView(props: { payload: BroadcastPayload; preview?: boolean }) {
  const hasText = () => !!props.payload.text;
  const hasMedia = () => props.payload.images.length + props.payload.videos.length > 0;
  return <div classList={{ [styles.surface]: true, [styles.previewSurface]: props.preview }}>
    <div classList={{ [styles.payload]: true, [styles.withText]: hasText(), [styles.withMedia]: hasMedia() }}>
      {hasText() && <p class={styles.text}>{props.payload.text}</p>}
      {hasMedia() && <div class={styles.media}>{props.payload.images.map((src) => <img src={src} alt="Image diffusée" />)}{props.payload.videos.map((src) => <iframe src={src} title="Vidéo YouTube diffusée" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen />)}</div>}
    </div>
  </div>;
}
