import { create } from 'zustand'
import { Broadcast } from '@prisma/client'
import { createHeader } from '@/utils/create-header'

interface BroadcastState {
  broadcast: Broadcast
  loading: 'createBroadcastWithHistory' | null
  readMode: boolean
  focusMode: boolean
  lastPosition: string
}

interface BroadcastSetters {
  setBroadcast: (broadcast: Partial<Broadcast>) => void
  toggleFocus: () => void
  toggleReadMode: () => void
}

interface BroadcastGetters {}

interface BroadcastActions {
  getBroadcast: (editor: string) => void
  updateField: (field: string, value: string) => void
  createBroadcastWithHistory: () => Promise<Broadcast>
}

interface BroadcastStore
  extends BroadcastState,
    BroadcastSetters,
    BroadcastActions,
    BroadcastGetters {}

const roadcast_focus_mode = 'roadcast_focus_mode'
const roadcast_read_mode = 'roadcast_read_mode'

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
  lastPosition: '',
  // === Setters ==============================================================

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
      set({ broadcast: resJson })
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
        readMode: localStorage.getItem(roadcast_read_mode) === 'true',
        focusMode: localStorage.getItem(roadcast_focus_mode) === 'true',
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
  // === Getters ==============================================================
}))
