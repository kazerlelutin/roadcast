import { fetcher } from "../utils/fetcher";

export const lastBroadcast = {
  state: {
    isInit: false,
    controller: new AbortController(),
    broadcast: [],
  },
  async onInit(state) {
    console.log("lastBroadcast onInit");
    if(state.isInit) return;
    state.isInit = true;
    const signal = state.controller.signal;
    try {
      const response = await fetcher.get("/api/broadcasts/last",signal);
      const json = await response.json();
      state.broadcast = json;
      console.log(json);
    }catch(e){
      console.log(e);
    }
  },
  onClean(state){
    state.controller.abort()
  },
  render() {},
};
