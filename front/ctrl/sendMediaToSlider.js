import { kll } from '../main'
import { fetcher } from '../utils/fetcher'
import { toast } from '../utils/toast'

export const sendMediaToSlider = {
  state: {
    controller: new AbortController()
  },
  async onClick(state, el) {
    el.classList.toggle('scale-75')
    el.classList.toggle('opacity-50')

    const { id } = kll.getLegacyState(el)
    const res = await fetcher.get(
      `/api/media/slider/${id}`,
      state.controller.signal
    )

    if (res.status === 201) {
      toast('media_send_to_slider')
    } else {
      toast('media_send_to_slider_error', 'error')
    }
    setTimeout(() => {
      el.classList.toggle('scale-75')
      el.classList.toggle('opacity-50')
    }, 300)
  },
  onClean(state) {
    state.controller.abort()
  }
}
