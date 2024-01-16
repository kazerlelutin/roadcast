import { kll } from '../main'
import { fetcher } from '../utils/fetcher'

export const addFirstChronicle = {
  state: {
    controller: new AbortController()
  },
  onInit(_, el) {
    el.render()
  },
  async onClick(state) {
    try {
      const res = await fetcher.post(
        '/api/chronicle',
        state.controller.signal,
        {
          position: 0
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
  onClean(state) {
    state.controller.abort()
  },
  render(_, el, listen) {
    kll.plugins.translate(el)

    if (!listen) return
    if (listen.key === 'broadcast' && listen.value.chronicles.length === 0) {
      el.classList.remove('hidden')
      el.classList.add('flex')
    }

    if (listen.key === 'broadcast' && listen.value.chronicles.length > 0) {
      el.remove()
    }
  }
}
