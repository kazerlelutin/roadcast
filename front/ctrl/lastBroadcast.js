import { fetcher } from '../utils/fetcher'
import { kll } from '../main'
import { setAttributes } from '../utils/setElement'

export const lastBroadcast = {
  state: {
    isInit: false,
    controller: new AbortController(),
    broadcast: []
  },
  async onInit(state) {
    if (state.isInit) return
    const signal = state.controller.signal
    try {
      const response = await fetcher.get('/api/broadcasts/last', signal)
      const json = await response.json()
      state.broadcast = json
    } catch (e) {
      console.log(e)
    } finally {
      state.isInit = true
    }
  },
  onClean(state) {
    state.controller.abort()
  },
  render(state, el) {
    if (!state.isInit) return
    if (!state.broadcast.length) {
      el.setAttribute('data-trans', 'no_broadcast_history')
      el.classList.add('italic', 'text-xs')
      kll.plugins.translate(el)
    } else {
      el.innerHTML = ''
      const list = document.createElement('ul')
      list.classList.add('list-disc', 'list-inside')
      state.broadcast.forEach((broadcast) => {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.innerText = broadcast.name
        //TODO - Totu mettre

        setAttributes(link, {
          'kll-ctrl': 'link',
          'kll-id': broadcast.editor,
          href: `/bc/editor/${broadcast.editor}`,
          alt: broadcast.name
        })

        li.classList.add('text-xs')
        kll.hydrate(link)
        li.appendChild(link)
        el.appendChild(li)
      })
    }
  }
}
