import { kll } from '../main'
import { getMediaType } from '../utils/getMediaType'
import { kebabToCamel } from '../utils/kebabToCamel'
import { setAttributes } from '../utils/setElement'

export const medias = {
  state: {},
  onInit(_state, el) {
    el.render()
  },
  async render(_state, el) {
    if (el._updating) return
    el._updating = true
    const { chronicle } = kll.getLegacyState(el)
    if (!chronicle) return

    const wrapper = document.createElement('div')
    for (const media of chronicle.medias) {
      const type = getMediaType(media.type)
      const tc = kebabToCamel(`media-${type}`)

      const template = await kll.processTemplate(tc)

      if (!template) continue

      setAttributes(template, {
        'kll-id': media.id,
        'kll-ctrl': tc,
        'kll-s-id': media.id,
        'kll-s-chronicle_id': chronicle.id,
        'kll-l': 'true'
      })
      const nameEl = template.querySelector('[data-name]')

      setAttributes(nameEl, {
        'kll-id': `media_name_${media.id}`,
        'kll-s-value': media.name,
        'kll-l': true
      })

      nameEl.classList.add(
        'text-xs',
        'text-rc-info-light',
        'bg-transparent',
        'border-none',
        'w-full',
        'text-center',
        'text-rc-info-light',
        'focus:outline-none',
        'focus:ring-0'
      )
      wrapper.appendChild(template)
    }

    el.innerHTML = wrapper.innerHTML
    const addMedias = await kll.processTemplate('addMedia')

    setAttributes(addMedias, {
      'kll-id': `add_media_${chronicle.id}`,
      'kll-ctrl': 'addMedia',
      id: `add_media_${chronicle.id}`,
      'kll-s-chronicle_id': chronicle.id,
      'kll-l': true,
      'kll-b': 'lock.lock'
    })

    el.appendChild(addMedias)
    kll.reload(el)
    el._updating = false
  }
}
