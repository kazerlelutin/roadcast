import { useLocation, useParams } from "@solidjs/router";
import { RoadcastWorkspaceCtrl } from "../features/roadcast/roadcast-workspace.ctrl";

export default function RoadcastRoute() {
  const params = useParams<{ slug: string }>();
  const location = useLocation<{ initialTitle?: string }>();
  return <RoadcastWorkspaceCtrl slug={params.slug} initialTitle={location.state?.initialTitle} />;
}
