import { kll } from '../main'
import { createChronicleElement } from '../utils/createChronicleElement'

export const chronicles = {
  async render(_state, el, listen) {
    console.log('chronicles.js render', listen.key, listen.value)

    if (listen.key === 'broadcast') {
      const broadcast = listen.value

      if (!broadcast.id) return

      if (broadcast.chronicles.length === 0) {
        el.innerHTML =
          '<div data-trans="no_chronicle" class="text-center italic text-rc-info"></div>'
      } else {
        const loader = el.querySelector('[kll-id="loader"]')
        if (loader) loader.remove()

        broadcast.chronicles.sort((a, b) => a.position - b.position)

        const wrapper = document.createElement('div')

        for (const chronicle of broadcast.chronicles) {
          //TODO arrêter si dans DOM et ectouer etat dans chronicle
          const chronicleEl = await createChronicleElement(chronicle)
          wrapper.appendChild(chronicleEl)
        }

        el.innerHTML = wrapper.innerHTML
        kll.reload(el)

        const broadcastEl = document.querySelector('[kll-id="broadcast"]')
        if (!broadcastEl) return

        if (broadcastEl.state.scrollTo) {
          const scrollTo = document.querySelector(
            `[kll-id="${broadcastEl.state.scrollTo}"]`
          )
          if (scrollTo) scrollTo.scrollIntoView({ behavior: 'smooth' })
          broadcastEl.state.scrollTo = null
        }
      }
    }

    kll.plugins.translate(el)
  }
}
