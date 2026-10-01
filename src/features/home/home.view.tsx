import { For, Show } from "solid-js";
import styles from "./home.module.css";

export type HomeRoadcast = { slug: string; title: string; lastActivityAt?: string | null };
export type HomeTheme = "dark" | "light";

export function HomeView(props: { roadcasts: HomeRoadcast[]; pending: boolean; error: string; theme: HomeTheme; onCreate: (title: string) => void; onThemeChange: () => void }) {
  let titleInput!: HTMLInputElement;

  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    props.onCreate(titleInput.value);
  };

  const isLight = () => props.theme === "light";

  return <main classList={{ [styles.page]: true, [styles.light]: isLight() }}>
    <header class={styles.header}>
      <a class={styles.brand} href="/" aria-label="Accueil Roadcast">
        <span class={styles.firstLetter}>R</span><span class={styles.logoText}>oadcast</span>
      </a>
      <div class={styles.headerActions}>
        <button class={styles.themeButton} type="button" onClick={props.onThemeChange} aria-label={isLight() ? "Passer au mode sombre" : "Passer au mode clair"} title={isLight() ? "Mode sombre" : "Mode clair"}>
          {isLight() ? "☾" : "☼"}
        </button>
      </div>
    </header>

    <div class={styles.layout}>
      <section class={styles.workspace} aria-label="Vos roadcasts">
        <form class={styles.create} onSubmit={submit}>
          <label class={styles.visuallyHidden} for="roadcast-title">Créer un roadcast</label>
          <div>
            <input ref={titleInput} id="roadcast-title" name="title" required minLength={3} maxLength={140} placeholder="Créer un roadcast" autocomplete="off" />
            <button type="submit" disabled={props.pending}>{props.pending ? "Création…" : "Créer"}</button>
          </div>
          <Show when={props.error}><p class={styles.error} role="alert">{props.error}</p></Show>
        </form>

        <div class={styles.list}>
          <For each={props.roadcasts}>{(roadcast) => <a class={styles.roadcast} href={`/${roadcast.slug}`}>
            <span class={styles.roadcastContent}>
              <strong>{roadcast.title}</strong>
              <small>Dernière activité {roadcast.lastActivityAt ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(roadcast.lastActivityAt)) : "aujourd’hui"}</small>
            </span>
            <span aria-hidden="true" class={styles.arrow}>→</span>
          </a>}</For>
        </div>
      </section>

      <section class={styles.intro} aria-labelledby="home-title">
        <h1 id="home-title">Gérez et partagez vos chroniques</h1>
        <p>Rédigez vos chroniques, partagez-les avec vos chroniqueurs et diffusez vos médias pendant vos lives.</p>
        <h2>Un lien pour écrire, un pour lire, un pour diffuser.</h2>
        <p>Gardez la préparation de votre émission dans un seul espace.</p>
        <p class={styles.account}>Commencez tout de suite, sans création de compte.</p>
      </section>
    </div>
  </main>;
}
