import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import HomeRoute from "./routes/index";
import RoadcastRoute from "./routes/roadcast/[slug]";
import ReadingRoute from "./routes/roadcast/[slug]/read";
import SliderRoute from "./routes/slider/[token]";
import "./shared/styles/global.css";

const routes = [
  { path: "/", component: HomeRoute },
  { path: "/roadcast/:slug/read", component: ReadingRoute },
  { path: "/roadcast/:slug", component: RoadcastRoute },
  { path: "/slider/:token", component: SliderRoute },
];

export default function App() {
  return <Router root={(props) => <MetaProvider><Title>Roadcast</Title><Suspense>{props.children}</Suspense></MetaProvider>}>{routes}</Router>;
}
