import { fetcher } from '../utils/fetcher'

export const mediaImage = {
  state: {
    chronicle_id: null,
    id: null,
    controller: new AbortController()
  },
  onInit(_state, el) {
    el.render()
  },
  async onClick(state) {
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    const media = chronicleEl.state.chronicle.medias.find(
      (m) => m.id === state.id
    )
    if (!media) return
    fetcher.get(`/api/media/slider/${media.id}`, state.controller.signal)
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
  }
}
