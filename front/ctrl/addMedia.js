import { fetcher } from '../utils/fetcher'

export const addMedia = {
  state: {
    chronicle_id: null,
    controller: new AbortController()
  },
  async onDrop(state, _el, ev) {
    ev.preventDefault()

    const formData = new FormData()

    if (ev.dataTransfer.items) {
      ;[...ev.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          formData.append('files', file, file.name)
        }
      })
    } else {
      ;[...ev.dataTransfer.files].forEach((file) => {
        formData.append('files', file, file.name)
      })
    }

    // Envoi des fichiers au serveur
    try {
      const response = await fetcher.postFile(
        '/api/media/chronicle/' + state.chronicle_id,
        state.controller.signal,
        formData
      )

      if (!response.ok) {
        throw new Error('Erreur réseau ou serveur')
      }

      const chronicles = await response.json()
      console.log(chronicles) // Traiter la réponse
      //TODO rerender les medias
    } catch (error) {
      console.error("Erreur lors de l'envoi des fichiers : ", error)
    }
  },
  onDragOver(_state, el, ev) {
    ev.preventDefault()
    if (!el.classList.contains('opacity-100')) {
      el.classList.remove('opacity-50')
      el.classList.add('opacity-100')
    }
  },
  ondragleave(_state, el, ev) {
    ev.preventDefault()
    if (!el.classList.contains('opacity-50')) {
      el.classList.add('opacity-50')
      el.classList.remove('opacity-100')
    }
  }
}
