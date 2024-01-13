import { kll } from '../../main.js'
export const link = {
  onClick(_, el, e) {
    e.preventDefault()
    const path = el.getAttribute('href')
    window.history.pushState({}, '', path)
    kll.injectPage(path)
  }
}
