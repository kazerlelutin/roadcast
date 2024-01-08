import { kll } from "../main";
import { fetcher } from "../utils/fetcher";

function renderBroadcast(broadcast, el) {
  if (!broadcast?.id) return;

  // Loader
  const loader = el.querySelector("[kll-id='broadcast_info_loader']");
  loader.classList.add("hidden");

  const infosEl = el.querySelector("[kll-id='broadcast_info']");

  // Broadcast name
  const titleEl = infosEl.querySelector("[kll-id='broadcast_info_title']");
  titleEl.value = broadcast.name;
  infosEl.classList.remove("hidden");

  // Broadcast editor
  const sliderEL = el.querySelector("[kll-id='broadcast_info_slider']");
  sliderEL.value = `${window.location.origin}/slider/${broadcast.reader}`;

  // Broadcast reader
  const readEL = el.querySelector("[kll-id='broadcast_info_reader']");
  readEL.value = `${window.location.origin}/rc/reader/${broadcast.reader}`;
  kll.plugins.translate(el);
}

async function updateName(name, signal) {
  if (!name) return;

  // get the state of the broadcast
  const broadcastEl = document.querySelector("[kll-id='broadcast']");
  const broadcastName = broadcastEl?.state?.broadcast?.name;

  if (broadcastName && broadcastName !== name) {
    try {
      const res = await fetcher.put(`/api/broadcast`, signal, { name });
      if (res.status !== 200)
        throw new Error("Error while updating broadcast name");
      window.document.title = `${name} | ROADCAST`;
      broadcastEl.state.broadcast.name = name;
    } catch (e) {
      console.log(e);
    }
  }
}

export const broadcastInfo = {
  state: {
    controller: new AbortController(),
  },
  onClean(state) {
    state.controller.abort();
  },
  render(state, el, listen) {

    // Listen broadcast (broadcast.broadcast)
    if (listen.key === "broadcast") {
      renderBroadcast(listen.value, el);
    }

    // Listen broadcast name (broadcast_info_title.value)
    if (listen.name === "broadcast_info_title") {
      updateName(listen.value, state.controller.signal);
    }
  },
};
