import { create } from 'zustand'
import { Broadcast, Chronicle, Editor } from '@prisma/client'
import { createHeader } from '@/utils/create-header'

type ExtendedBroadcast = Broadcast & {
  chronicles: ExtendedChronicle[]
}

type ExtendedChronicle = Chronicle & {
  editor: Editor
}

interface BroadcastState {
  broadcast: ExtendedBroadcast
  loading: 'createBroadcastWithHistory' | null
  readMode: boolean
  focusMode: boolean
  lastPosition: number
  treeIsDragging: boolean
  currentChronicle: string
}

interface BroadcastSetters {
  setBroadcast: (broadcast: Partial<Broadcast>) => void
  toggleFocus: () => void
  toggleReadMode: () => void
  updateDrag: (isDragging: boolean) => void
  setCurrentChronicle: (chronicleId: string) => void
}

interface BroadcastGetters {
  getChronicle: (chronicleId: string) => ExtendedChronicle
}

interface BroadcastActions {
  getBroadcast: (editor: string) => void
  updateField: (field: string, value: string) => void
  createBroadcastWithHistory: () => Promise<Broadcast>
  updateTree: (id: string, position: number) => void
}

interface BroadcastStore
  extends BroadcastState,
    BroadcastSetters,
    BroadcastActions,
    BroadcastGetters {}

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

  // === GETTERS ==============================================================
  getChronicle: (chronicleId) => {
    const { broadcast } = get()
    return broadcast.chronicles.find((c) => c.id === chronicleId)
  },

  // === SETTERS ==============================================================

  setBroadcast: (broadcast) =>
    set((prev) => ({ broadcast: { ...prev.broadcast, ...broadcast } })),
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
    const { broadcast } = get()
    broadcast.editor = editor
    try {
      const res = await fetch(`/api/broadcast/findone`, {
        method: 'POST',
        headers: createHeader(broadcast),
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
  // === Getters ==============================================================
}))
