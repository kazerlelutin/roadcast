import { kll } from '../main'

export const header = {
  onInit(_state, el) {
    el.render()
  },
  render(_state, el) {
    kll.plugins.translate(el)
  }
}
