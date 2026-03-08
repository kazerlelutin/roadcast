import { router } from "@features/router/router";
import websocketCtrl from "@features/websocket/websocket.ctrl";
import { displayVersion } from "@features/version/version.utils";

addEventListener("DOMContentLoaded", () => {
  router.init();
  websocketCtrl?.init?.();
  displayVersion();
});
