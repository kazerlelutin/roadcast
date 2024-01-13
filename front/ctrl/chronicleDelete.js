import { kll } from '../main'
import { createConfirmModal } from '../utils/createConfirmModal'
import { fetcher } from '../utils/fetcher'
import { getLsLock } from './lock'

export const chronicleDelete = {
  state: {
    chronicle_id: null,
    controller: new AbortController(),
    confirm: false
  },
  onInit(_, el) {
    const ls = getLsLock()
    if (ls === 'lock') {
      el.classList.add('hidden')
    }
  },
  async onClick(state, el) {
    //TODO mettre une modale de confirmation
    const chronicleEl = document.querySelector(
      `[kll-id='${state.chronicle_id}']`
    )

    const dialog = createConfirmModal(
      'confirm_delete_chronicle',
      chronicleEl.state.chronicle.title,
      async () => {
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
    )

    dialog.showModal()
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
