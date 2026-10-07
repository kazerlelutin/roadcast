import { Link, Meta, Title } from "@solidjs/meta";

const SITE_URL = "https://roadcast.app";

type SeoPage = "home" | "legal" | "privacy" | "editor" | "read" | "slider";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  indexable: boolean;
};

const pages: Record<SeoPage, PageMetadata> = {
  home: {
    title: "Roadcast — Écrire, diffuser, partager",
    description: "Préparez vos chroniques, diffusez-les sur vos sliders et partagez-les simplement avec Roadcast.",
    path: "/",
    indexable: true,
  },
  legal: {
    title: "Mentions légales — Roadcast",
    description: "Consultez les mentions légales et les informations d’hébergement de Roadcast.",
    path: "/mentions-legales",
    indexable: true,
  },
  privacy: {
    title: "Confidentialité et cookies — Roadcast",
    description: "Découvrez comment Roadcast traite les données, les préférences de mesure et les cookies.",
    path: "/confidentialite",
    indexable: true,
  },
  editor: {
    title: "Éditeur Roadcast",
    description: "Espace d’édition privé Roadcast.",
    path: "",
    indexable: false,
  },
  read: {
    title: "Lecture privée — Roadcast",
    description: "Espace de lecture privé Roadcast.",
    path: "",
    indexable: false,
  },
  slider: {
    title: "Slider privé — Roadcast",
    description: "Sortie de diffusion privée Roadcast.",
    path: "",
    indexable: false,
  },
};

export function seoPageMetadata(page: SeoPage) {
  const metadata = pages[page];
  return {
    ...metadata,
    canonical: metadata.indexable ? `${SITE_URL}${metadata.path}` : undefined,
    robots: metadata.indexable ? "index, follow" : "noindex, nofollow, noarchive",
  };
}

export function SeoMeta(props: { page: SeoPage }) {
  const metadata = seoPageMetadata(props.page);

  return <>
    <Title>{metadata.title}</Title>
    <Meta name="description" content={metadata.description} />
    <Meta name="robots" content={metadata.robots} />
    <Meta name="googlebot" content={metadata.robots} />
    {metadata.indexable && <>
      <Link rel="canonical" href={metadata.canonical} />
      <Meta property="og:locale" content="fr_FR" />
      <Meta property="og:site_name" content="Roadcast" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={metadata.title} />
      <Meta property="og:description" content={metadata.description} />
      <Meta property="og:url" content={metadata.canonical} />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content={metadata.title} />
      <Meta name="twitter:description" content={metadata.description} />
    </>}
  </>;
}
