import { createAsync, useAction, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createRoadcast } from "../roadcast/roadcast.actions";
import { listRoadcasts } from "../roadcast/roadcast.queries";
import { HomeView } from "./home.view";

export function HomeCtrl() {
  const roadcasts = createAsync(() => listRoadcasts());
  const create = useAction(createRoadcast);
  const navigate = useNavigate();
  const [pending, setPending] = createSignal(false);
  const [error, setError] = createSignal("");
  const onCreate = async (title: string) => { setError(""); setPending(true); try { const created = await create({ title }); await navigate(`/roadcast/${created.slug}`); } catch { setError("La création nécessite une base PostgreSQL configurée. Vérifiez DATABASE_URL puis réessayez."); } finally { setPending(false); } };
  return <HomeView roadcasts={roadcasts() ?? []} pending={pending()} error={error()} onCreate={onCreate} />;
}
