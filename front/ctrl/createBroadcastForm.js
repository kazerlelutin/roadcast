import { kll } from "../main";
import { fetcher } from "../utils/fetcher";

export const createBroadcastForm = {
  state: {
    error: "",
    controller: new AbortController(),
  },
  onInit(_state, el) {
    kll.plugins.translate(el);
    el.render();
  },

  async onSubmit(state, el, e) {
    e.preventDefault();
    const formData = new FormData(el);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetcher.post(
        "/api/broadcast",
        state.controller.signal,
        data
      );
      
      if(res.status !== 201) {
        state.error = "error_create_broadcast";
        return;
      }
      const { editor } = await res.json();
      const path = `/bc/editor/${editor}`;
      window.history.pushState(null, null, path);
      kll.injectPage(path);
    } catch (e) {
      console.log("broadcast creation: ", e);
      state.error = "error_create_broadcast";
    }
  },
  onClean(state) {
    state.controller.abort();
  },
  render() {},
};
