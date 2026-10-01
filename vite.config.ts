import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  resolve: { dedupe: ["solid-js", "solid-js/web", "@solidjs/router"] },
  optimizeDeps: {
    include: [
      "solid-js",
      "solid-js/web",
      "@solidjs/start/fns/client",
      "zod",
      "terracotta",
      "@jridgewell/resolve-uri",
      "@jridgewell/trace-mapping",
      "error-stack-parser-es",
      "source-map-js",
    ],
  },
  plugins: [
    solidStart({ ssr: false, devOverlay: false, serialization: { mode: "json" }, middleware: "src/middleware/security.ctrl.ts" }),
    command === "build" && nitro(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: { name: "Roadcast", short_name: "Roadcast", description: "Chroniques collaboratives et diffusion multi-slider.", display: "standalone", start_url: "/", background_color: "#101725", theme_color: "#101725", icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] },
      // Le worker est généré pour la production ; l'activer en dev déclenche un refresh pendant l'hydratation Solid.
      devOptions: { enabled: false },
    }),
  ],
  nitro: {
    preset: "bun",
    features: { websocket: true },
    handlers: [{ route: "/ws/slider", handler: "src/features/presentation/slider-realtime.server.ts" }],
  },
}));
