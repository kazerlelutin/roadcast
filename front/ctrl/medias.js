import { kll } from '../main'
import { getMediaType } from '../utils/getMediaType'
import { getState } from '../utils/getState'
import { kebabToCamel } from '../utils/kebabToCamel'
import { setAttributes } from '../utils/setElement'

export const medias = {
  state: {
    chronicle_id: null
  },
  onInit(_state, el) {
    el.render()
  },
  async render(state, el) {
    const { chronicle } = getState(state.chronicle_id)

    if (!chronicle) return
    el.innerHTML = ''

    for (const media of chronicle.medias) {
      const type = getMediaType(media.type)
      const tc = kebabToCamel(`media-${type}`)

      const template = await kll.processTemplate(tc)

      setAttributes(template, {
        'kll-id': media.id,
        'kll-s-id': media.id,
        'kll-s-chronicle_id': chronicle.id,
        'kll-ctrl': tc
      })

      el.appendChild(template)
    }

    const addMedias = await kll.processTemplate('addMedia')

    setAttributes(addMedias, {
      'kll-id': `add_media_${chronicle.id}`,
      'kll-ctrl': 'addMedia',
      id: `add_media_${chronicle.id}`,
      'kll-s-chronicle_id': chronicle.id
    })

    el.appendChild(addMedias)

    kll.reload(el)
  }
}
