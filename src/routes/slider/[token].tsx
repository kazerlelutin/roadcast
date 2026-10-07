import { clientOnly } from "@solidjs/start";
import { useParams } from "@solidjs/router";
import { SeoMeta } from "../../features/seo/seo-meta.ctrl";

const SliderOutputCtrl = clientOnly(() => import("../../features/presentation/slider-output.ctrl").then((module) => ({ default: module.SliderOutputCtrl })));

export default function SliderRoute() {
  const params = useParams<{ token: string }>();
  return <><SeoMeta page="slider" /><SliderOutputCtrl token={params.token} /></>;
}
