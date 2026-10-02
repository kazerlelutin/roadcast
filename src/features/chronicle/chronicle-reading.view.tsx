/* eslint-disable solid/no-innerhtml -- Le contrôleur fournit uniquement le HTML nettoyé de TipTap. */
import styles from "./chronicle-reading.module.css";

export type ReadonlyChronicle = { id: string; title: string; author: string; document: string; };
type ReadonlyWorkspace = { title: string; chronicles: ReadonlyChronicle[]; };

export function ChronicleReadingView(props: { workspace: ReadonlyWorkspace | null; selectedChronicleId: string; onSelectChronicle: (id: string) => void; }) {
  const selectedChronicle = () => props.workspace?.chronicles.find((chronicle) => chronicle.id === props.selectedChronicleId) ?? props.workspace?.chronicles[0];
  return <main class={styles.page}>
    <header class={styles.header}>
      <a href="/" class={styles.brand} aria-label="Accueil Roadcast"><span class={styles.firstLetter}>R</span><span class={styles.logoText}>oadcast</span></a>
      <span class={styles.readState}>Lecture</span>
    </header>
    {props.workspace && selectedChronicle() ? <div class={styles.layout}>
      <nav aria-label="Chroniques en lecture"><h1>{props.workspace.title}</h1><ol>{props.workspace.chronicles.map((chronicle) => <li><button type="button" aria-current={chronicle.id === props.selectedChronicleId ? "page" : undefined} onClick={() => props.onSelectChronicle(chronicle.id)}><span>{chronicle.title}</span><small>{chronicle.author}</small></button></li>)}</ol></nav>
      <article><p class={styles.kicker}>LECTURE</p><h2>{selectedChronicle()?.title}</h2><p class={styles.author}>{selectedChronicle()?.author}</p><div class={styles.content} innerHTML={selectedChronicle()?.document ?? ""} /></article>
    </div> : <section class={styles.unavailable}><h1>Lien de lecture introuvable</h1><p>Ce lien ne donne accès à aucun roadcast.</p></section>}
  </main>;
}
