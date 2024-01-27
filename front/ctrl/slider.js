import { kll } from '../main'
import { getUserId } from '../utils/createXinfos'

export const slider = {
  state: {
    channel: null
  },
  onInit(state) {
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

        console.log(msg)
        if (userId === msg.userId) return
        if (msg.type === 'img') {
        }

        state.message = msg
      })
    } catch (e) {
      console.log(e)
    }
  },
  onClean(state) {
    const app = document.querySelector('#app')
    const client = app._socket
    client.unsubscribe(state.channel)
  }
}
