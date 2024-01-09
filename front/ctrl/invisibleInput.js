import { getLsLock } from "./lock";

export const invisibleInput = {
  state: {
    value: "",
    delay: 800,
    timeout: null,
  },
  onInit(state, el) {

    el.value = state.value;

    // ===== RENDER =====
    const ls = getLsLock();
    if (ls === "lock") {
      el.disabled = true;
    }
    el.render();
  },
  async onInput(state, el) {
    clearTimeout(state.timeout);

    state.timeout = setTimeout(() => {
      state.value = el.value;
    }, state.delay);
  },
  onClean(state) {
    clearTimeout(state.timeout);
  },
  render(_, el, listen) {
    if (listen && listen.key === "lock") {
      el.disabled = listen.value;
    }
  },
};
