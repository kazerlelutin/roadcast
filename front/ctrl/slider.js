import { kll } from '../main'
import { getUserId } from '../utils/createXinfos'

export const slider = {
  state: {
    channel: null
  },
  onInit(state, el) {
    const {
      params: { reader }
    } = kll.parseRoute()

    state.channel = `/slider/${reader}`
    const app = document.querySelector('#app')

    try {
      const client = app._socket
      if (client._subscriptions?.[state.channel]?.length > 0) {
        client.unsubscribe(state.channel, handler)
      }

      client.subscribe(state.channel, async (msg) => {
        const userId = getUserId()

        if (!msg.media) return
        const media = msg.media
        console.log(media)
        if (media.type.match(/image/i)) {
          const imgEl = new Image()
          imgEl.src = media.url
          imgEl.classList.add('object-cover', 'w-full', 'h-full')
          el.innerHTML = imgEl.outerHTML
        }

        state.message = msg
      })
    } catch (e) {
      console.log(e)
    }
  },
  onClean(state) {
    const app = document.querySelector('#app')
    if (!app._socket) return
    app._socket.unsubscribe(state.channel)
  }
}
