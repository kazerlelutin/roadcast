export const mediaImage = {
  state: {
    chronicle_id: null,
    id: null,
    controller: new AbortController()
  },
  onInit(state, el, e) {
    el.render()
  },
  render(state, el, _listen) {
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    const media = chronicleEl.state.chronicle.medias.find(
      (m) => m.id === state.id
    )
    if (!media) return

    const imgEl = el.querySelector('img')
    imgEl.src = media.url
    imgEl.alt = media.name
    console.log(media.url)
  }
}
