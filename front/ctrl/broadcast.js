import { fetcher } from "../utils/fetcher";

export const broadcast = {
  state: {
    broadcast: null,
    editors: [],
    loading: true,
    error: null,
    controller: new AbortController(),
  },
  async onInit(state) {
    const signal = state.controller.signal;
    state.loading = true;
    try {
      const response = await fetcher.get("/api/broadcast", signal);
      const { broadcast, editors } = await response.json();

      state.broadcast = broadcast;
      state.editors = editors;

    } catch (e) {
      console.log(e);
    } finally {
      state.isInit = true;
      state.loading = false;
    }
  },
  onClean(){
    this.state.controller.abort()
  },
  render() {},
};
