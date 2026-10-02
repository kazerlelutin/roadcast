import styles from "./legal.module.css";

export type LegalPageKind = "legal" | "privacy";

function LegalLinks(props: { onOpenConsent: () => void }) {
  return <nav class={styles.links} aria-label="Informations légales">
    <a href="/mentions-legales">Mentions légales</a>
    <a href="/confidentialite">Confidentialité</a>
    <button type="button" onClick={props.onOpenConsent}>Préférences de mesure</button>
  </nav>;
}

export function LegalView(props: { kind: LegalPageKind; onOpenConsent: () => void }) {
  const privacy = () => props.kind === "privacy";

  return <main class={styles.page}>
    <header class={styles.header}>
      <a class={styles.brand} href="/" aria-label="Accueil Roadcast">Roadcast</a>
      <LegalLinks onOpenConsent={props.onOpenConsent} />
    </header>

    <article class={styles.content}>
      <p class={styles.eyebrow}>{privacy() ? "CONFIDENTIALITÉ" : "INFORMATIONS"}</p>
      <h1>{privacy() ? "Confidentialité et cookies" : "Mentions légales"}</h1>

      {privacy() ? <>
        <section>
          <h2>Données traitées</h2>
          <p>Roadcast conserve dans le stockage local de votre navigateur les roadcasts, chroniques, versions, médias intégrés, chroniqueurs, préférences et liens de partage créés depuis cet appareil.</p>
        </section>
        <section>
          <h2>Durée de conservation</h2>
          <p>Ces données restent dans votre navigateur jusqu’à leur suppression depuis les réglages de votre navigateur. Roadcast ne crée pas de compte utilisateur ni de profil publicitaire.</p>
        </section>
        <section>
          <h2>Mesure d’audience</h2>
          <p>Uniquement avec votre consentement, Roadcast charge un script de mesure d’audience hébergé par Ben-to. Le refus n’a aucune conséquence sur l’utilisation du service et empêche le chargement de ce script.</p>
          <p>Vous pouvez modifier ce choix à tout moment depuis les préférences de mesure.</p>
        </section>
      </> : <>
        <section>
          <h2>Éditeur</h2>
          <p>Roadcast est édité par Kazer Lelutin. Contact : <a href="mailto:b@bouteiller.contact">b@bouteiller.contact</a>.</p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>Le service est déployé par Ben-to sur une infrastructure administrée avec CapRover.</p>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <p>Le nom, l’identité visuelle et les contenus de Roadcast sont protégés. Leur réutilisation dépend des autorisations ou licences applicables.</p>
        </section>
        <section>
          <h2>Responsabilité</h2>
          <p>Roadcast met en œuvre des moyens raisonnables pour assurer la disponibilité du service, sans garantir une disponibilité ininterrompue ni l’absence d’erreur.</p>
        </section>
      </>}
    </article>

    <footer class={styles.footer}><span>Roadcast</span><LegalLinks onOpenConsent={props.onOpenConsent} /></footer>
  </main>;
}
