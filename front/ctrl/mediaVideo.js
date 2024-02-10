export const mediaVideo = {
  state: {
    chronicle_id: null,
    id: null,
    controller: new AbortController()
  },
  onInit(_state, el) {
    el.render()
  },

  render(state, el) {
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    const media = chronicleEl.state.chronicle.medias.find(
      (m) => m.id === state.id
    )
    if (!media) return

    const videoEl = el.querySelector('video')
    const sourceEl = el.querySelector('source')
    sourceEl.src = media.url
    sourceEl.type = media.type

    if (media.cover) {
      videoEl.poster = media.cover
    }
  }
}
