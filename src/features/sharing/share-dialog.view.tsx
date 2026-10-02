import styles from "./share-dialog.module.css";

export type ShareMode = "edit" | "read" | "slider";

export type ShareDialogViewProps = {
  open: boolean;
  mode: ShareMode;
  link: string;
  onModeChange: (mode: ShareMode) => void;
  onCopy: () => void;
  onClose: () => void;
};

const modes: Array<{ value: ShareMode; label: string; description: string }> = [
  { value: "edit", label: "Écrire", description: "Permet de préparer et modifier les chroniques." },
  { value: "read", label: "Lire", description: "Ouvre une lecture sans les commandes de régie." },
  { value: "slider", label: "Diffuser", description: "Ouvre le slider public actuellement choisi." },
];

export function ShareDialogView(props: ShareDialogViewProps) {
  return <dialog class={styles.dialog} open={props.open} aria-labelledby="share-dialog-title">
    <header class={styles.header}>
      <div><p>PARTAGER LE ROADCAST</p><h2 id="share-dialog-title">Choisir un lien</h2></div>
      <button type="button" onClick={props.onClose} aria-label="Fermer le partage">×</button>
    </header>
    <fieldset>
      <legend>Type de partage</legend>
      <div class={styles.choices}>{modes.map((mode) => <label classList={{ [styles.selected]: props.mode === mode.value }}>
        <input type="radio" name="share-mode" value={mode.value} checked={props.mode === mode.value} onChange={() => props.onModeChange(mode.value)} />
        <span><strong>{mode.label}</strong><small>{mode.description}</small></span>
      </label>)}</div>
    </fieldset>
    <label class={styles.linkLabel} for="share-link">Lien à partager</label>
    <div class={styles.copyRow}>
      <input id="share-link" value={props.link} readOnly />
      <button type="button" onClick={props.onCopy}>Copier le lien</button>
    </div>
  </dialog>;
}
