import { Show } from "solid-js";
import styles from "./cookie-consent.module.css";

export type AnalyticsConsent = "accepted" | "rejected" | null;

export function CookieConsentView(props: {
  open: boolean;
  choice: AnalyticsConsent;
  onAccept: () => void;
  onReject: () => void;
}) {
  return <Show when={props.open}>
    <aside class={styles.banner} aria-label="Préférences de mesure d’audience" role="dialog" aria-modal="false">
      <div>
        <strong>Mesure d’audience</strong>
        <p>Avec votre accord, Roadcast utilise une mesure d’audience hébergée par Ben-to pour améliorer le service.</p>
        <a href="/confidentialite">En savoir plus</a>
      </div>
      <div class={styles.actions}>
        <button class={styles.reject} type="button" onClick={props.onReject}>{props.choice === "rejected" ? "Refusé" : "Refuser"}</button>
        <button class={styles.accept} type="button" onClick={props.onAccept}>{props.choice === "accepted" ? "Accepté" : "Accepter"}</button>
      </div>
    </aside>
  </Show>;
}
