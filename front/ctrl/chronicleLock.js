import { kll } from '../main'
import { createChronicleElement } from '../utils/createChronicleElement'
import { fetcher } from '../utils/fetcher'

export const chronicleLock = {
  state: {
    lock: false,
    chronicle_id: null,
    channel: null,
    timeout: null,
    controller: new AbortController()
  },
  async onInit(_, el) {
    const msgEl = el.querySelector('[data-type=msg]')
    msgEl.setAttribute('data-trans', 'lock_edit_chronicle')
    el.render()
    kll.plugins.translate(el)
  },

  cleanUp(state) {
    clearTimeout(state.timeout)
    state.controller.abort()
  },
  async render(state, el, listen) {
    if (
      listen?.key === 'message' &&
      listen?.value?.type === 'update' &&
      listen?.value?.id === state.chronicle_id
    ) {
      const chronicleEl = document.querySelector(
        `[kll-id='${state.chronicle_id}']`
      )

      state.lock = true
      chronicleEl.classList.add('locked')

      clearTimeout(state.timeout)

      state.timeout = setTimeout(async () => {
        try {
          const response = await fetcher.get(
            `/api/chronicle/${state.chronicle_id}`,
            state.controller.signal
          )
          const chronicle = await response.json()

          const broadcastEl = document.querySelector(`[kll-id='broadcast']`)

          broadcastEl.state.broadcast = {
            ...broadcastEl.state.broadcast,
            chronicles: broadcastEl.state.broadcast.chronicles.map((c) =>
              c.id === chronicle.id ? chronicle : c
            )
          }

          kll.reload(chronicleEl)
          state.lock = false
          chronicleEl.replaceWith(await createChronicleElement(chronicle))
        } catch (e) {
          console.log(e)
        } finally {
          chronicleEl.classList.remove('locked')
          el.classList.add('hidden')
        }
      }, 5000)
    }

    if (
      listen?.key === 'message' &&
      listen?.value?.type === 'delete' &&
      listen?.value?.id === state.chronicle_id
    ) {
      const broadcastEl = document.querySelector(`[kll-id='broadcast']`)
      broadcastEl.state.broadcast = {
        ...broadcastEl.state.broadcast,
        chronicles: broadcastEl.state.broadcast.chronicles.filter(
          (c) => c.id !== state.chronicle_id
        )
      }
      el.remove()
    }

    if (state.lock) el.classList.remove('hidden')
    else el.classList.add('hidden')
    kll.plugins.translate(el)
  }
}
