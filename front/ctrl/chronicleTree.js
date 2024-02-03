import { getResume } from '../utils/getResume'
import { getLsLock } from './lock'

export const chronicleTree = {
  onInit(_state, el) {
    if (getLsLock() === 'lock') {
      const grabIcon = el.querySelector('[data-grab-icon')
      if (grabIcon) grabIcon.classList.add('hidden')
    }
  },
  onDragstart(state, _el, e) {
    e.dataTransfer.setData('text/plain', state.chronicle_id)
  },
  render(state, el, listen) {
    if (listen.key === 'lock') {
      const grabIcon = el.querySelector('[data-grab-icon')
      if (grabIcon)
        grabIcon.classList[listen.value ? 'add' : 'remove']('hidden')
    }
    if (listen.key === 'chronicle') {
      const titleEl = document.querySelector(
        `[data-title="${state.chronicle_id}"]`
      )
      if (!titleEl) return
      const resume = getResume(listen.value.title, 25)
      if (titleEl.innerText === resume) return
      titleEl.innerText = resume
    }
  }
}
