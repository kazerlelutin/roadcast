import { MetaProvider, Title } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { type JSX, Show, Suspense } from "solid-js";
import { CookieConsentCtrl } from "./features/legal/cookie-consent.ctrl";
import PrivacyRoute from "./routes/confidentialite";
import HomeRoute from "./routes/index";
import LegalRoute from "./routes/mentions-legales";
import RoadcastRoute from "./routes/[slug]";
import ReadingRoute from "./routes/read/[token]";
import SliderRoute from "./routes/slider/[token]";
import "./shared/styles/global.css";

const routes = [
  { path: "/", component: HomeRoute },
  { path: "/mentions-legales", component: LegalRoute },
  { path: "/confidentialite", component: PrivacyRoute },
  { path: "/read/:token", component: ReadingRoute },
  { path: "/:slug", component: RoadcastRoute },
  { path: "/slider/:token", component: SliderRoute },
  { path: "/roadcast/:slug", component: RoadcastRoute },
];

function AppShell(props: { children: JSX.Element }) {
  const location = useLocation();
  return <MetaProvider><Title>Roadcast</Title><Suspense>{props.children}</Suspense><Show when={!location.pathname.startsWith("/slider/")}><CookieConsentCtrl /></Show></MetaProvider>;
}

export default function App() {
  return <Router root={(props) => <AppShell>{props.children}</AppShell>}>{routes}</Router>;
}
