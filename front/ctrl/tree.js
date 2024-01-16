import { kll } from '../main'
import { setElement, setElementbyKllTc } from '../utils/setElement'

export const tree = {
  state: {},

  async render(_state, el) {
    const broadcastEl = document.querySelector(`[kll-id='broadcast']`)
    const container = el.querySelector('[data-tree]')
    if (!broadcastEl || !container) return
    const { chronicles } = broadcastEl.state.broadcast

    container.innerHTML = ''
    for (const [index, chronicle] of chronicles.entries()) {
      const chronicleTreeEl = await kll.processTemplate('chronicleTree')

      chronicleTreeEl.setAttribute('id', `tree_${chronicle.id}`)
      chronicleTreeEl.setAttribute('kll-b', `${chronicle.id}.chronicle`)

      const addPost = index === chronicles.length - 1 ? 0 : 1
      setElementbyKllTc(chronicleTreeEl, 'chronicleTreeDropZone', null, {
        'kll-id': `dropzone_${chronicle.position + 1}`,
        'kll-s-position': chronicle.position + addPost,
        id: `dropzone_${chronicle.id}`
      })

      setElement(chronicleTreeEl, 'grab', undefined, {
        'kll-b': `${chronicle.id}.chronicle,lock.lock`,
        'kll-id': `chronicle_tree_title_${chronicle.id}`,
        'kll-s-position': chronicle.position,
        'kll-s-chronicle_id': chronicle.id
      })

      setElement(
        chronicleTreeEl,
        'title',
        chronicle.title ? chronicle.title : undefined,
        {
          'data-title': chronicle.id
        }
      )
      container.appendChild(chronicleTreeEl)
    }

    kll.reload(el)
    kll.plugins.translate(el)
  }
}
