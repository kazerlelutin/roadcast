import { kll } from '../main'

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
        if (!msg.media) return
        const media = msg.media
        console.log(media)
        if (media.type.match(/image/i)) {
          const imgEl = new Image()
          imgEl.src = media.url
          imgEl.classList.add('object-cover', 'w-full', 'h-full')
          el.innerHTML = imgEl.outerHTML
        }

        if (media.type.match(/video/i)) {
          const videoContainer = document.createElement('div')
          videoContainer.classList.add('video-container')

          const videoEl = document.createElement('video')
          const sourceEl = document.createElement('source')
          sourceEl.src = media.url
          sourceEl.type = media.type

          videoEl.appendChild(sourceEl)
          videoEl.setAttribute('loop', true)
          videoEl.setAttribute('autoplay', true) // Assurez-vous que l'autoplay est autorisé par le navigateur
          videoEl.classList.add('object-cover', 'w-full', 'h-full')

          videoContainer.appendChild(videoEl)

          el.innerHTML = '' // Nettoyez le contenu précédent
          el.appendChild(videoContainer) // Ajoutez le conteneur de vidéo

          videoEl.play() // Tentez de jouer la vidéo
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
