import { fetcher } from '../utils/fetcher'
import { switchClasses } from '../utils/switchClasses'
import { getLsLock } from './lock'

export const addChronicleButton = {
  state: {
    position: undefined,
    controller: new AbortController()
  },

  onInit(state, el) {
    state.position = Number(state.position) || 0

    if (getLsLock() === 'lock')
      switchClasses(el, 'opacity-0 pointer-events-none', 'opacity-5')

    el.render()
  },
  async onClick({ controller, position }) {
    try {
      const res = await fetcher.post('/api/chronicle', controller.signal, {
        position
      })

      if (res.status !== 201) {
        state.error = 'error_create_broadcast'
        return
      }
      const { chronicles, chronicleId } = await res.json()

      const broadcastEl = document.querySelector('[kll-ctrl=broadcast]')
      if (!broadcastEl) return

      broadcastEl.state.broadcast = {
        ...broadcastEl.state.broadcast,
        chronicles,
        scrollTo: chronicleId
      }
    } catch (e) {
      console.log('broadcast creation: ', e)
    }
  },
  render(_, el, listen) {
    if (listen.key === 'lock') {
      listen.value
        ? switchClasses(el, 'opacity-0 pointer-events-none', 'opacity-5')
        : switchClasses(el, 'opacity-5', 'opacity-0 pointer-events-none')
    }
  }
}
