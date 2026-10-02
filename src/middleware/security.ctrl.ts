import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({ onRequest(event) { event.response.headers.set("X-Content-Type-Options", "nosniff"); event.response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin"); event.response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()"); } });
