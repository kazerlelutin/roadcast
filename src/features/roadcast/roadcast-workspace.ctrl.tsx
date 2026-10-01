import { createSignal, onMount } from "solid-js";
import { MediaDialogView } from "../media/media-dialog.view";
import { type Slider } from "../presentation/slider-preview.view";
import { estimateChronicleMinutes } from "../chronicle/reading-time.ctrl";
import { type RoadcastWorkspaceTheme, RoadcastWorkspaceView } from "./roadcast-workspace.view";

const seed = "Bienvenue dans la chronique. Écris librement, ajoute tes médias au fil du texte et décide ce qui part sur chaque slider.\n\nL’estimation de temps aide toute l’équipe à garder le rythme.";

export function RoadcastWorkspaceCtrl(props: { slug: string }) {
  const [documentText, setDocumentText] = createSignal(seed);
  const [slider, setSlider] = createSignal<Slider>("alpha");
  const [mediaOpen, setMediaOpen] = createSignal(false);
  const [notice, setNotice] = createSignal("");
  const [theme, setTheme] = createSignal<RoadcastWorkspaceTheme>("dark");

  const toggleTheme = () => {
    const nextTheme: RoadcastWorkspaceTheme = theme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    globalThis.localStorage.setItem("roadcast-theme", nextTheme);
  };

  const pictureInPicture = async () => {
    const candidate = globalThis.document?.querySelector("[data-slider-preview]") as HTMLElement | null;
    if (candidate && "requestPictureInPicture" in candidate) await (candidate as unknown as { requestPictureInPicture(): Promise<void> }).requestPictureInPicture();
    else setNotice("Le Picture-in-Picture est disponible dans un navigateur compatible.");
  };

  onMount(() => {
    const savedTheme = globalThis.localStorage.getItem("roadcast-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  });

  return <>
    <RoadcastWorkspaceView slug={props.slug} document={documentText()} minutes={estimateChronicleMinutes(documentText())} slider={slider()} notice={notice()} theme={theme()} onDocumentInput={setDocumentText} onMove={(direction) => setNotice(`Chronique déplacée vers le ${direction === "up" ? "haut" : "bas"}.`)} onOpenMedia={() => setMediaOpen(true)} onSelectSlider={setSlider} onPictureInPicture={pictureInPicture} onShare={() => setNotice("Lien de modification copié — à brancher sur le presse-papiers avec l’authentification.")} onThemeChange={toggleTheme} />
    <MediaDialogView open={mediaOpen()} onClose={() => setMediaOpen(false)} onDelete={() => { setMediaOpen(false); setNotice("Média supprimé."); }} onSend={(target) => { setMediaOpen(false); setSlider(target); setNotice(`Média envoyé à ${target}.`); }} />
  </>;
}
