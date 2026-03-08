import home from "./home/home.def.ts";
import about from "./about/about.def.ts";
import type { Route } from "./routes.type";

export const routes: Map<string, Route> = new Map([
  home,
  about
]);
