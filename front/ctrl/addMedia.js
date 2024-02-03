import { fetcher } from '../utils/fetcher'
import { switchClasses } from '../utils/switchClasses'

async function sendFiles(formData, state) {
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

    const broadcastEl = document.querySelector('[kll-id="broadcast"]')
    if (!broadcastEl) return
    broadcastEl.state.broadcast = {
      ...broadcastEl.state.broadcast,
      chronicles
    }
    console.log(chronicles) // Traiter la réponse
  } catch (error) {
    console.error("Erreur lors de l'envoi des fichiers : ", error)
  }
}

export const addMedia = {
  state: {
    chronicle_id: null,
    controller: new AbortController()
  },
  async onChange(state, el, ev) {
    ev.preventDefault()

    const formData = new FormData()
    ;[...el.files].forEach((file) => {
      formData.append('files', file, file.name)
    })
    sendFiles(formData, state)
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

    sendFiles(formData, state)
  },
  onDragOver(_state, el, ev) {
    ev.preventDefault()
    if (!el.classList.contains('opacity-100'))
      switchClasses(el, 'opacity-100', 'opacity-50')
  },
  ondragleave(_state, el, ev) {
    ev.preventDefault()
    if (!el.classList.contains('opacity-50'))
      switchClasses(el, 'opacity-50', 'opacity-100')
  }
}
