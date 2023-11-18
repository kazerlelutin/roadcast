import { createHeader } from '@/utils/create-header'
import { Editor } from '@prisma/client'
import { create } from 'zustand'
import { useBroadcast } from './broadcast.store'

// =============================================================================
// === INTERFACES ==============================================================
// =============================================================================
interface EditorState {
  editors: Editor[]
  loading: boolean
}

interface EditorActions {
  getEditors: () => void
}

interface EditorStore extends EditorState, EditorActions {}

// =============================================================================
// === STORE ===================================================================
// =============================================================================
export const useEditors = create<EditorStore>((set, get) => ({
  // === STATE ================================================================
  editors: [],
  loading: false,

  // === ACTIONS ==============================================================
  async getEditors() {
    const { getHeader } = useBroadcast.getState()
    set({ loading: true })
    try {
      const res = await fetch(`/api/editor/all`, {
        method: 'POST',
        headers: getHeader(),
      })

      const resJson = await res.json()
      set({
        editors: resJson,
      })
    } catch (err) {
    } finally {
      set({ loading: false })
    }
  },
}))
