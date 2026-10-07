import { clientOnly } from "@solidjs/start";
import { useParams } from "@solidjs/router";
import { SeoMeta } from "../../features/seo/seo-meta.ctrl";

const ChronicleReadingCtrl = clientOnly(() => import("../../features/chronicle/chronicle-reading.ctrl").then((module) => ({ default: module.ChronicleReadingCtrl })));

export default function ReadRoute() {
  const params = useParams<{ token: string }>();
  return <><SeoMeta page="read" /><ChronicleReadingCtrl token={params.token} /></>;
}
