import { HomeCtrl } from "../features/home/home.ctrl";
import { SeoMeta } from "../features/seo/seo-meta.ctrl";

export default function HomeRoute() {
  return <><SeoMeta page="home" /><HomeCtrl /></>;
}
