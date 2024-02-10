import { kll } from '../main'
import { fetcher } from '../utils/fetcher'
import { chronicle } from './chronicle'
import { getLsLock } from './lock'

export const mediaDelete = {
  state: {
    chronicle_id: null,
    controller: new AbortController(),
    confirm: false,
    callback: null,
    text: 'confirm_delete_media',
    subText: ''
  },
  onInit(state, el) {
    if (getLsLock() === 'lock') el.classList.add('hidden')

    const { id, chronicle_id, kllId } = kll.getLegacyState(el)

    console.log('mediaDelete', kll.getLegacyState(el))
    const chronicleEl = document.querySelector(`[kll-id='${chronicle_id}']`)
    if (!chronicleEl) return

    const media = chronicleEl.state.chronicle.medias.find((m) => m.id === id)

    state.subText = media.name

    state.callback = async () => {
      try {
        await fetcher.delete(`/api/media/${id}`, state.controller.signal)

        chronicleEl.state.chronicle.medias =
          chronicleEl.state.chronicle.medias.filter((m) => m.id !== id)

        const mediaEl = document.querySelector(`[kll-id='${id}']`)
        if (mediaEl) mediaEl.remove()
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
      listen.value ? el.classList.add('hidden') : el.classList.remove('hidden')
    }
  }
}
