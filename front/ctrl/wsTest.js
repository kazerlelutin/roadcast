import { v4 as uuid } from "uuid";
import { kll } from "../main";

export const wsTest = {
  state: {
    msg: uuid(),
  },
  async onInit(_state, el) {
    const app = document.querySelector("#app");
    const client = app._socket;

    const { params } = kll.parseRoute();
    const start = async () => {
      const handler = (update, flags) => {
        console.log(update, flags);

        // update -> { id: 5, status: 'complete' }
        // Second publish is not received (doesn't match)
      };

      console.log("subscribe", client._subscriptions);
      if (client._subscriptions?.["/bc/123"]?.length > 0) {
        client.unsubscribe("/bc/123", handler);
      }
      client.subscribe("/bc/123", handler);
    };

    await start();

    setTimeout(() => {
      console.log("publish");
      fetch("http://localhost:3000/bc/123");
    }, 4000);
  },
  cleanUp() {
    console.log("cleanUp");
    const app = document.querySelector("#app");
    const client = app._socket;
    client.unsubscribe("/bc/123");
  },

  render(state, el) {
    const msgEl = el.querySelector("[data-msg]");

    msgEl.innerHTML = state.msg;
  },
};
