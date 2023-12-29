import "../public/style.css"
import indexPage from "./pages/index.html?raw"
import homePage from "./pages/home.html?raw"
import { KLL } from "@kll_/core"
import { CreateComponentPlugin } from "@kll_/basic"

export const kll = new KLL({
  id: "app",
  routes: {
    "/": indexPage,
    "/home": homePage,
  },
  ctrlPath: "/ctrl/",
  templatePath: "/templates/",
  plugins: [CreateComponentPlugin],
})
