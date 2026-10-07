import { clientOnly } from "@solidjs/start";
import { useLocation, useParams } from "@solidjs/router";
import { SeoMeta } from "../features/seo/seo-meta.ctrl";

const RoadcastWorkspaceCtrl = clientOnly(() => import("../features/roadcast/roadcast-workspace.ctrl").then((module) => ({ default: module.RoadcastWorkspaceCtrl })));

export default function RoadcastRoute() {
  const params = useParams<{ slug: string }>();
  const location = useLocation<{ initialTitle?: string }>();
  return <><SeoMeta page="editor" /><RoadcastWorkspaceCtrl slug={params.slug} initialTitle={location.state?.initialTitle} /></>;
}
