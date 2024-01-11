import { kll } from "../main";
import { createChronicleElement } from "../utils/createChronicleElement";
import { getUserId } from "../utils/createXinfos";
import { fetcher } from "../utils/fetcher";

export const chronicleLock = {
  state: {
    lock: false,
    chronicle_id: null,
    channel: null,
    timeout: null,
    controller: new AbortController(),
  },
  async onInit(state, el) {
    const msgEl = el.querySelector("[data-type='msg']");
    msgEl.setAttribute("data-trans", "lock_edit_chronicle");

    const app = document.querySelector("#app");
    const client = app._socket;

    const handler = (update) => {
      const userId = getUserId();
      if (userId === update.userId) return;

      const chronicleEl = document.querySelector(
        `[kll-id='${state.chronicle_id}']`
      );
      if (chronicleEl) {
        chronicleEl.classList.add("locked");
        state.lock = true;

        el.render();
      }
      clearTimeout(state.timeout);

      state.timeout = setTimeout(async () => {
        try {
          const response = await fetcher.get(
            `/api/chronicle/${state.chronicle_id}`,
            state.controller.signal
          );
          const chronicle = await response.json();

          const broadcastEl = document.querySelector(`[kll-id='broadcast']`);

          broadcastEl.state.broadcast = {
            ...broadcastEl.state.broadcast,
            chronicles: broadcastEl.state.broadcast.chronicles.map((c) =>
              c.id === chronicle.id ? chronicle : c
            ),
          };

          kll.reload(chronicleEl);
          state.lock = false;
        } catch (e) {
          console.log(e);
        } finally {
          chronicleEl.replaceWith(await createChronicleElement(chronicle));
          chronicleEl.classList.remove("locked");
          el.render();
        }
      }, 5000);
    };

    if (client._subscriptions?.[state.channel]?.length > 0) {
      client.unsubscribe(state.channel, handler);
    }

    client.subscribe(state.channel, handler);

    el.render();
  },

  cleanUp(state) {
    const app = document.querySelector("#app");
    const client = app._socket;
    client.unsubscribe(state.channel);
    clearTimeout(state.timeout);
    state.controller.abort();
  },
  async render(state, el) {
    if (state.lock) el.classList.remove("hidden");
    else el.classList.add("hidden");

    kll.plugins.translate(el);
  },
};
