/* eslint-disable solid/no-innerhtml -- Le contrôleur fournit uniquement le HTML nettoyé de TipTap. */
import styles from "./chronicle-reading.module.css";

export type ReadonlyChronicle = { id: string; title: string; author: string; document: string; };

export function ChronicleReadingView(props: { title: string; chronicles: ReadonlyChronicle[]; selectedChronicleId: string; onSelectChronicle: (id: string) => void; }) {
  const selectedChronicle = () => props.chronicles.find((chronicle) => chronicle.id === props.selectedChronicleId) ?? props.chronicles[0];
  return <main class={styles.page}><header><a href="/" aria-label="Accueil Roadcast">Roadcast</a><strong>{props.title}</strong></header><div class={styles.layout}><nav aria-label="Chroniques en lecture"><h1>Chroniques</h1><ol>{props.chronicles.map((chronicle) => <li><button type="button" aria-current={chronicle.id === props.selectedChronicleId ? "page" : undefined} onClick={() => props.onSelectChronicle(chronicle.id)}><span>{chronicle.title}</span><small>{chronicle.author}</small></button></li>)}</ol></nav><article><p class={styles.kicker}>LECTURE</p><h2>{selectedChronicle().title}</h2><p class={styles.author}>{selectedChronicle().author}</p><div class={styles.content} innerHTML={selectedChronicle().document} /></article></div></main>;
}
