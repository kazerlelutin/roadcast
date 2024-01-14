import { kll } from '../main'
import { setElement, setElementbyKllTc } from '../utils/setElement'

export const tree = {
  state: {},

  async render(state, el, listen) {
    console.log('tree render', listen)
    const broadcastEl = document.querySelector(`[kll-id='broadcast']`)
    const container = el.querySelector('[data-tree]')
    if (!broadcastEl || !container) return
    const { chronicles } = broadcastEl.state.broadcast

    container.innerHTML = ''
    for (const chronicle of chronicles) {
      const chronicleTreeEl = await kll.processTemplate('chronicleTree')

      setElementbyKllTc(chronicleTreeEl, 'chronicleTreeDropZone', null, {
        'kll-id': `dropzone_${chronicle.position}`,
        'kll-s-position': chronicle.position
      })

      setElement(
        chronicleTreeEl,
        'title',
        chronicle.title ? chronicle.title : undefined,
        {
          'kll-b': `${chronicle.id}.chronicle`,
          'kll-ctrl': 'chronicleTree',
          'kll-id': `chronicle_tree_title_${chronicle.id}`
        }
      )

      container.appendChild(chronicleTreeEl)
    }

    kll.reload(el)
    kll.plugins.translate(el)
  }
}
