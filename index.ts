import { serve, type BunRequest } from "bun";
import index from "./index.html";

export const server = serve({
  port: 3000,
  websocket: {
    message: (ws, message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "subscribe") {
          ws.subscribe(parsedMessage.room);
        }
      } catch (error) {
        console.log('websocket message', error);
      }
    },
  },

  routes: {

    "/api/hello": {
      GET: () => new Response("Hello, World!", { status: 200 }),
    },

    "/public/*": (req: BunRequest) => {
      const url = new URL(req.url);
      const path = url.pathname.replace("/public", "./public");
      const file = Bun.file(path);

      if (file.name?.includes('.ico')) {
        return new Response(file.stream(), { headers: { "Content-Type": "image/x-icon" } });
      }
      return new Response(file.stream(), { headers: { "Content-Type": "text/html" } });
    },
    "/*": index,
  },

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/" && req.headers.get("upgrade") === "websocket") {
      const success = server.upgrade(req);
      if (success) {
        return undefined;
      }
      return new Response("WebSocket upgrade failed", { status: 400 });
    }

    if (url.pathname.startsWith("/api/download/")) {
      const filename = url.pathname.replace("/api/download/", "");
      const filePath = `data/csv/${filename}`;

      try {
        const file = Bun.file(filePath);
        const exists = await file.exists();

        if (exists) {
          const fileBuffer = await file.arrayBuffer();
          return new Response(fileBuffer, {
            headers: {
              'Content-Type': 'application/zip',
              'Content-Disposition': `attachment; filename="${filename}"`,
              'Content-Length': fileBuffer.byteLength.toString(),
            },
          });
        } else {
          return new Response("File not found", { status: 404 });
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
  development: import.meta.env.DEV === 'true',
});

console.log(`Listening on ${server.url}`);