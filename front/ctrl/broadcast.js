import { getUserId } from '../utils/createXinfos'
import { fetcher } from '../utils/fetcher'

export const broadcast = {
  state: {
    broadcast: null,
    editors: [],
    loading: true,
    error: null,
    controller: new AbortController(),
    channel: null,
    message: null
  },
  async onInit(state) {
    const signal = state.controller.signal
    state.loading = true

    try {
      const response = await fetcher.get('/api/broadcast', signal)
      const { broadcast, editors } = await response.json()

      state.broadcast = broadcast
      state.editors = editors
      state.channel = `/broadcast/editor/${broadcast.editor}`
      const app = document.querySelector('#app')
      const client = app._socket

      if (client._subscriptions?.[state.channel]?.length > 0) {
        client.unsubscribe(state.channel, handler)
      }

      client.subscribe(state.channel, async (msg) => {
        const userId = getUserId()

        if (userId === msg.userId) return
        if (msg.type === 'update_position') {
          try {
            const response = await fetcher.get('/api/broadcast', signal)
            const { broadcast, editors } = await response.json()
            state.broadcast = broadcast
            state.editors = editors
          } catch (e) {
            console.log(e)
          }
        }

        state.message = msg
      })
    } catch (e) {
      console.log(e)
    } finally {
      state.isInit = true
      state.loading = false
    }
  },
  onClean(state) {
    const app = document.querySelector('#app')
    if (!app._socket) return
    app._socket.unsubscribe(state.channel)
    state.controller.abort()
  }
}
