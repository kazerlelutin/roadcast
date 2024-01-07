import "./public/style.css"
import { KLL } from "@kll_/core"
import { CreateComponentPlugin } from "@kll_/basic"
import Nes from "@hapi/nes/lib/client";
import { TranslatePlugin } from "@kll_/translate"
import { translation } from "../data/translation"
import { lsKEY } from "./ctrl/rupteur.js";


const client = new Nes.Client(`ws://${import.meta.env.MODE === "development" ? 'localhost:3000': window.location.host}` , { reconnect: true });

// TRANSLATE ========================
const translateLsKey = "__rc__lang"
localStorage.setItem(translateLsKey, window.navigator.language.split("-")[0])

const params = {
  id: "app",
  routes: {
    "/": import("./pages/index.html?raw").then((m) => m.default),
    "/about": import("./pages/about.html?raw").then((m) => m.default),
    "/legal": import("./pages/legal.html?raw").then((m) => m.default),
    "/broadcast/:id": import("./pages/broadcast.html?raw").then((m) => m.default),
  },
  plugins: [CreateComponentPlugin, kll=> new TranslatePlugin(kll,translation, translateLsKey)],
}

if(import.meta.env.MODE === "development"){
  params.ctrlPath = import('./ctrl/index.js').then(m => m)
  params.templatePath = import('./templates/index.js').then(m => m)
} else {
  params.ctrlPath = import('/ctrl/index.js').then(m => m)
  params.templatePath = import('/templates/index.js').then(m => m)

}
export const kll = new KLL(params)

addEventListener("DOMContentLoaded", async () => {
  const app = document.querySelector("#app")

  app._socket = client;
  await   app._socket.connect();

  app._socket.onConnect = () => {
    console.log("I Listen Update");
  };
  kll.plugins.translate()

});

//TODO à mettre dans la lib
addEventListener("popstate", () => { 
  kll.injectPage(window.location.pathname)
})

// Prevent the flash of the dark theme
const theme =  localStorage.getItem(lsKEY) || "dark";
if(theme === "dark"){
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.add('light')
}