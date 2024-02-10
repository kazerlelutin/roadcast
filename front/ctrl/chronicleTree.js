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
  render(_state, el, listen) {
    if (listen.key === 'lock') {
      const grabIcon = el.querySelector('[data-grab-icon')
      if (grabIcon)
        grabIcon.classList[listen.value ? 'add' : 'remove']('hidden')
    }
  }
}
