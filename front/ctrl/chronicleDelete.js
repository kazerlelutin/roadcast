import { fetcher } from '../utils/fetcher'
import { getLsLock } from './lock'

export const chronicleDelete = {
  state: {
    chronicle_id: null,
    controller: new AbortController(),
    confirm: false,
    callback: null,
    text: 'confirm_delete_chronicle',
    subText: ''
  },
  onInit(state, el) {
    const ls = getLsLock()
    if (ls === 'lock') {
      el.classList.add('hidden')
    }

    const chronicleEl = document.querySelector(
      `[kll-id='${state.chronicle_id}']`
    )

    state.subText = chronicleEl.state.chronicle.title

    state.callback = async () => {
      try {
        await fetcher.delete(
          `/api/chronicle/${state.chronicle_id}`,
          state.controller.signal
        )
        const broadcastEl = document.querySelector(`[kll-id='broadcast']`)
        broadcastEl.state.broadcast = {
          ...broadcastEl.state.broadcast,
          chronicles: broadcastEl.state.broadcast.chronicles.filter(
            (c) => c.id !== state.chronicle_id
          )
        }
        el.remove()
      } catch (e) {
        console.log(e)
      }
    }
  },
  onClean(state) {
    state.controller.abort()
  },
  render(_, el, listen) {
    if (listen && listen.key === 'lock') {
      if (listen.value) {
        el.classList.add('hidden')
      } else {
        el.classList.remove('hidden')
      }
    }
  }
}
