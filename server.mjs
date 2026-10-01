import { serve } from "h3";
import application from "./dist/server/entry-server.js";

serve(application, { port: Number(process.env.PORT ?? 3000), hostname: "0.0.0.0" });
