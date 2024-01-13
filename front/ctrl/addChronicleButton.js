import { fetcher } from '../utils/fetcher'
import { getLsLock } from './lock'

export const addChronicleButton = {
  state: {
    position: undefined,
    controller: new AbortController()
  },

  onInit(state, el) {
    // ===== STATE =====
    state.position = Number(state.position) || 0

    // ===== RENDER =====
    const ls = getLsLock()
    if (ls === 'lock') {
      el.classList.remove('opacity-5')
      el.classList.add('opacity-0', 'pointer-events-none')
    }
    el.render()
  },
  async onClick(state) {
    try {
      const res = await fetcher.post(
        '/api/chronicle',
        state.controller.signal,
        {
          position: state.position
        }
      )

      if (res.status !== 201) {
        state.error = 'error_create_broadcast'
        return
      }
      const chronicles = await res.json()

      const broadcastEl = document.querySelector('[kll-ctrl=broadcast]')
      if (!broadcastEl) return

      broadcastEl.state.broadcast = {
        ...broadcastEl.state.broadcast,
        chronicles
      }
    } catch (e) {
      console.log('broadcast creation: ', e)
    }
  },
  render(_, el, listen) {
    // ===== LISTEN =====
    if (listen && listen.key === 'lock') {
      if (listen.value) {
        el.classList.remove('opacity-5')
        el.classList.add('opacity-0', 'pointer-events-none')
      } else {
        el.classList.remove('opacity-0', 'pointer-events-none')
        el.classList.add('opacity-5')
      }
    }
  }
}
