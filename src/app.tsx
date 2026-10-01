import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./shared/styles/global.css";

export default function App() {
  return <MetaProvider><Title>Roadcast</Title><Router><FileRoutes /></Router></MetaProvider>;
}
