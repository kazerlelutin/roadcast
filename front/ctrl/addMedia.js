import { fetcher } from '../utils/fetcher'
import { switchClasses } from '../utils/switchClasses'
import { toast } from '../utils/toast'
import { getLsLock } from './lock'

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

    const chronicle = chronicles.find((c) => c.id === state.chronicle_id)
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    chronicleEl.state.chronicle = chronicle
  } catch (error) {
    console.error("Erreur lors de l'envoi des fichiers : ", error)
  }
}

function checkFileType(items, state) {
  if (items.length === 0) return

  const formData = new FormData()

  for (const item of items) {
    if (item.kind && item.kind === 'file') {
      const file = item.getAsFile()
      processFile(file, formData)
    } else if (item instanceof File) {
      processFile(item, formData)
    }
  }

  if (formData.has('files')) sendFiles(formData, state)
}

function processFile(file, formData) {
  if (!file) return // S'assure que le fichier existe

  const isSupportedFileType = file.type.match(
    /^(audio\/(mpeg|mp3|ogg|wav)|video\/(mp4|webm|ogg)|image\/(jpeg|png|gif|webp|avif))$/
  )

  if (isSupportedFileType) {
    formData.append('files', file, file.name)
  } else {
    toast('format_not_supported', 'error')
  }
}

export const addMedia = {
  state: {
    chronicle_id: null,
    controller: new AbortController()
  },
  async onChange(state, el, ev) {
    ev.preventDefault()

    checkFileType(Array.from(el.files), state)
  },
  async onDrop(state, _el, ev) {
    ev.preventDefault()

    checkFileType(
      ev.dataTransfer.items ? ev.dataTransfer.items : ev.dataTransfer.files,
      state
    )
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
  },
  onInit(_state, el) {
    getLsLock() === 'lock'
      ? el.classList.add('hidden')
      : el.classList.remove('hidden')
  },
  render(_state, el, listen) {
    if (listen.key === 'lock') {
      listen.value ? el.classList.add('hidden') : el.classList.remove('hidden')
    }
  }
}
