import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  plugins: [
    solidStart({ serialization: { mode: "json" }, middleware: "src/middleware/security.ctrl.ts" }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: { name: "Roadcast", short_name: "Roadcast", description: "Chroniques collaboratives et diffusion multi-slider.", display: "standalone", start_url: "/", background_color: "#101725", theme_color: "#101725", icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] },
      devOptions: { enabled: command === "serve" },
    }),
  ],
}));
