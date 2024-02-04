import { kll } from '../main'
import { getResume } from '../utils/getResume'

export const titleTree = {
  state: {
    chronicle_id: null
  },
  onInit(_state, el) {
    el.render()
  },

  onClick(state) {
    // scroll to chronicle
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    chronicleEl.scrollIntoView({ behavior: 'smooth' })
  },
  render(_state, el, listen) {
    if (listen.value?.title) {
      el.innerText = getResume(listen.value.title, 25)
    } else {
      el.setAttribute('data-trans', 'no_title')
      kll.plugins.translate(el)
    }
  }
}
