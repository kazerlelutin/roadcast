import { fetcher } from '../utils/fetcher'

export const chronicleTreeDropZone = {
  state: {
    position: null,
    chronicle_id: null,
    controller: new AbortController()
  },

  ondragover(_state, el, e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (el.classList.contains('opacity-0')) {
      el.classList.remove('opacity-0')
      el.classList.add('opacity-100')
    }
  },
  onDragleave(_state, el, e) {
    e.preventDefault()
    if (el.classList.contains('opacity-100')) {
      el.classList.remove('opacity-100')
      el.classList.add('opacity-0')
    }
  },
  async onDrop(state, el, e) {
    e.preventDefault()
    const chronicle_id = e.dataTransfer.getData('text/plain')
    const { position } = state
    const broadcastEl = document.querySelector(`[kll-id='broadcast']`)
    if (!broadcastEl) return
    const { chronicles } = broadcastEl.state.broadcast
    const chronicle = chronicles.find((c) => c.id === chronicle_id)
    if (!chronicle) return

    const oldPosition = chronicle.position

    broadcastEl.state.broadcast = {
      ...broadcastEl.state.broadcast,
      chronicles: chronicles
        .map((c) => {
          if (c.id === chronicle_id) return { ...c, position: Number(position) }
          if (c.position > oldPosition && c.position <= Number(position))
            return { ...c, position: c.position - 1 }
          if (c.position < oldPosition && c.position >= Number(position))
            return { ...c, position: c.position + 1 }
          return c
        })
        .sort((a, b) => a.position - b.position)
    }

    await fetcher.put(
      `/api/chronicle/${chronicle_id}`,
      state.controller.signal,
      { position: Number(position) }
    )
    const dropZoneEle = document.querySelectorAll(`[data-dropzone]`)
    dropZoneEle.forEach((ele) => {
      if (ele.classList.contains('opacity-100')) {
        ele.classList.remove('opacity-100')
        ele.classList.add('opacity-0')
      }
    })
  },
  onClean(state) {
    state.controller.abort()
  }
}
