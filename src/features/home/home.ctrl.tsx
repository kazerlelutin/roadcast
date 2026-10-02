import { useAction, useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { createRoadcast } from "../roadcast/roadcast.actions";
import { readRecentRoadcasts, rememberRecentRoadcast } from "../roadcast/recent-roadcasts.ctrl";
import { type HomeRoadcast, type HomeTheme, HomeView } from "./home.view";

export function HomeCtrl() {
  const [roadcasts, setRoadcasts] = createSignal<HomeRoadcast[]>([]);
  const create = useAction(createRoadcast);
  const navigate = useNavigate();
  const [pending, setPending] = createSignal(false);
  const [error, setError] = createSignal("");
  const [theme, setTheme] = createSignal<HomeTheme>("dark");

  const toggleTheme = () => {
    const nextTheme: HomeTheme = theme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    globalThis.localStorage.setItem("roadcast-theme", nextTheme);
  };

  const openConsent = () => globalThis.dispatchEvent(new globalThis.Event("roadcast:open-consent"));

  onMount(() => {
    const savedTheme = globalThis.localStorage.getItem("roadcast-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    setRoadcasts(readRecentRoadcasts());
  });
  const onCreate = async (title: string) => { setError(""); setPending(true); try { const created = await create({ title }); setRoadcasts(rememberRecentRoadcast(created)); await navigate(`/${created.slug}`); } catch { setError("La création nécessite une base PostgreSQL configurée. Vérifiez DATABASE_URL puis réessayez."); } finally { setPending(false); } };
  return <HomeView roadcasts={roadcasts()} pending={pending()} error={error()} theme={theme()} onCreate={onCreate} onThemeChange={toggleTheme} onOpenConsent={openConsent} />;
}
