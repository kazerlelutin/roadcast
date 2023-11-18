import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { Broadcast, Chronicle, Editor, Media } from '@prisma/client'

import { createHeader } from '@/utils/create-header'
import { getObjectToBase64 } from '@/utils'

type ExtendedBroadcast = Broadcast & {
  chronicles: ExtendedChronicle[]
}

type ExtendedChronicle = Chronicle & {
  editor: Editor
  medias: Media[]
}

type ErrorBroadcast = {
  message: string
  type: 'chronicle' | 'media' | 'editor' | 'broadcast'
  id: string
  field: string
}

interface BroadcastState {
  broadcast: ExtendedBroadcast
  loading: 'createBroadcastWithHistory' | 'createChronicle' | null
  readMode: boolean
  focusMode: boolean
  lastPosition: number
  treeIsDragging: boolean
  currentChronicle: string
  error: ErrorBroadcast | null
}

interface BroadcastSetters {
  setBroadcast: (broadcast: Partial<Broadcast>) => void
  toggleFocus: () => void
  toggleReadMode: () => void
  updateDrag: (isDragging: boolean) => void
  setCurrentChronicle: (chronicleId: string) => void
  setChronicle: (chronicle: Partial<Chronicle>) => void
}

interface BroadcastGetters {
  getChronicle: (chronicleId: string) => ExtendedChronicle
  getHeader: (editorId?: string) => HeadersInit
}

interface BroadcastActions {
  getBroadcast: (editor: string) => void
  updateField: (field: string, value: string) => void
  createBroadcastWithHistory: () => Promise<Broadcast>
  updateTree: (id: string, position: number) => void
  createChronicle: (position: number) => void
  deleteMedia: (chronicleId: string, mediaId: string) => void
  broadcastMedia: (media: Media) => void
  updateChronicleField: (chronicle: Partial<Chronicle>) => void
}

interface BroadcastStore extends BroadcastState, BroadcastSetters, BroadcastActions, BroadcastGetters {}

const roadcast_focus_mode = 'roadcast_focus_mode'
const roadcast_read_mode = 'roadcast_read_mode'
const roadcast_current_chronicle = 'roadcast_current_chronicle'

export const useBroadcast = create<BroadcastStore>((set, get) => ({
  // === State ================================================================

  broadcast: {
    id: '',
    prefix: '',
    title: '',
    editor: '',
    reader: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    ended_at: new Date(),
    started_at: new Date(),
    chronicles: [],
    editors: [],
    history: [],
    chronicleHistories: [],
  },
  loading: null,
  readMode: false,
  focusMode: false,
  lastPosition: 0,
  treeIsDragging: false,
  currentChronicle: '',
  error: null,
  editorId: '',

  // === GETTERS ==============================================================
  getChronicle: (chronicleId) => {
    const { broadcast } = get()
    return broadcast.chronicles.find((c) => c.id === chronicleId)
  },
  getHeader: (editorId) => {
    const { broadcast } = get()
    broadcast.editor = editorId || broadcast.editor
    return createHeader(broadcast)
  },

  // === SETTERS ==============================================================

  setBroadcast: (broadcast) => set((prev) => ({ broadcast: { ...prev.broadcast, ...broadcast } })),
  setChronicle: (chronicle) => {
    const { broadcast } = get()
    const chronicles = broadcast.chronicles.map((c) => {
      if (c.id === chronicle.id) c = { ...c, ...chronicle }
      return c
    })
    set({
      broadcast: {
        ...broadcast,
        chronicles,
      },
    })
  },
  toggleFocus: () => {
    const { focusMode } = get()
    localStorage.setItem(roadcast_focus_mode, JSON.stringify(!focusMode))
    set((prev) => ({ focusMode: !prev.focusMode }))
  },
  toggleReadMode: () => {
    const { readMode } = get()
    localStorage.setItem(roadcast_read_mode, JSON.stringify(!readMode))
    set((prev) => ({ readMode: !prev.readMode }))
  },
  updateDrag: (isDragging) => set({ treeIsDragging: isDragging }),
  setCurrentChronicle: (chronicleId) => {
    localStorage.setItem(roadcast_current_chronicle, chronicleId)
    set({ currentChronicle: chronicleId })
  },

  // === Actions ==============================================================

  async getBroadcast(editor) {
    const { getHeader } = get()

    try {
      const res = await fetch(`/api/broadcast/findone`, {
        method: 'POST',
        headers: getHeader(editor),
        body: JSON.stringify({ editor }),
      })

      const resJson = await res.json()
      const currentChronicle = localStorage.getItem(roadcast_current_chronicle)

      set({
        broadcast: resJson,
        readMode: localStorage.getItem(roadcast_read_mode) === 'true',
        focusMode: localStorage.getItem(roadcast_current_chronicle) === 'true',
        currentChronicle,
      })
    } catch (err) {}
  },
  async updateField(field, value) {
    const { broadcast } = get()
    try {
      const res = await fetch(`/api/broadcast/update`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ [field]: value }),
      })

      const resJson = await res.json()
      set({
        broadcast: resJson,
      })
    } catch (err) {}
  },
  async createBroadcastWithHistory() {
    const { broadcast } = get()
    set({ loading: 'createBroadcastWithHistory' })
    try {
      const res = await fetch(`/api/broadcast/create_with_history`, {
        method: 'POST',
        headers: createHeader(broadcast),
      })
      const newBroadcast = await res.json()
      set({ loading: null, broadcast: newBroadcast })
      return newBroadcast
    } catch (err) {
      set({ loading: null })
    }
  },
  async updateTree(id, position) {
    const { broadcast } = get()
    const chronicles = broadcast.chronicles
      .map((chronicle) => {
        if (chronicle.id === id) {
          chronicle.position = position
        } else if (chronicle.position >= position) chronicle.position += 1
        return chronicle
      })
      .sort((a, b) => a.position - b.position)

    set({ broadcast: { ...broadcast, chronicles } })

    try {
      const res = await fetch(`/api/chronicle/position`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ id, position }),
      })
      await res.json()
    } catch (err) {
      // reset broadcast
      set({ broadcast })
    }
  },
  async createChronicle(position) {
    const { broadcast } = get()

    set({ loading: 'createChronicle' })

    try {
      const res = await fetch(`/api/chronicle/create`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ position }),
      })
      const chronicles = await res.json()
      broadcast.chronicles = chronicles
      set({ loading: null, broadcast })
    } catch (err) {
      // reset broadcast
      set({ broadcast, loading: null })
    }
  },
  async deleteMedia(chronicleId, mediaId) {
    const { broadcast } = get()
    const chronicle = broadcast.chronicles.find((c) => c.id === chronicleId)
    if (!chronicle) return
    const medias = chronicle.medias.filter((m) => m.id !== mediaId)
    set({
      broadcast: {
        ...broadcast,
        chronicles: broadcast.chronicles.map((c) => {
          if (c.id === chronicleId) c.medias = medias
          return c
        }),
      },
    })

    try {
      const res = await fetch(`/api/media/delete`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ id: mediaId, chronicleId: chronicle.id }),
      })
      await res.json()
    } catch (err) {
      // reset broadcast
      set({ broadcast })
    }
  },
  async updateChronicleField(chronicle) {
    const { broadcast } = get()

    try {
      const res = await fetch(`/api/chronicle/update_field`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ chronicle }),
      })
      if (res.status !== 200) throw new Error('updateChronicleField')
      await res.json()

      set((prev) => ({
        broadcast: {
          ...prev.broadcast,
          chronicles: prev.broadcast.chronicles.map((c) => {
            if (c.id === chronicle.id) c = { ...c, updatedAt: new Date() }
            return c
          }),
        },
      }))
    } catch (err) {
      // reset broadcast
      set({ broadcast })
    }
  },

  async broadcastMedia(media) {
    const { broadcast } = get()
    try {
      const res = await fetch(`/api/media/broadcast`, {
        method: 'POST',
        headers: createHeader(broadcast),
        body: JSON.stringify({ media }),
      })
      await res.json()
    } catch (err) {
      // reset broadcast
      console.log(err)
    }
  },
  // === Getters ==============================================================
}))
