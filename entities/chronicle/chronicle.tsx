/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useMemo, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '@/types'
import { IEditor, IMedia } from '@/entities'
import { Chronicle } from '@prisma/client'
import { useBroadcast } from '@/stores/broadcast.store'

// INTERFACES ---------------------------------------------------------------

export enum ChronicleStatus {
  draft = 'draft',
  published = 'published',
  read = 'read',
}

export interface IChronicle extends Chronicle {
  medias: IMedia[]
  editor: IEditor
}

interface ChronicleProviderProps {
  children: ReactNode
  id: string
}

interface ChroniclesProviderProps {
  children: ReactNode
}

// CONTEXTS ------------------------------------------------------------------

export const ChronicleContext = createContext<string>('')

export const ChronicleRefreshButtonContext = createContext<TEntity<boolean>>(
  false,
  () => {}
)

// PROVIDERS -----------------------------------------------------------------

export function ChronicleProvider({ children, id }: ChronicleProviderProps) {
  return (
    <ChronicleContext.Provider value={id}>{children}</ChronicleContext.Provider>
  )
}

export function ChronicleRefreshButtonProvider({
  children,
}: ChroniclesProviderProps) {
  const value = useState<boolean>(false)
  return (
    <ChronicleRefreshButtonContext.Provider value={value}>
      {children}
    </ChronicleRefreshButtonContext.Provider>
  )
}

// ROUTES -------------------------------------------------------------------

export enum ChronicleRoutes {
  delete = 'chronicle/delete',
  findOne = 'chronicle/one',
  findMany = 'chronicle/all',
  create = 'chronicle/create',
  updateDesc = 'chronicle/update_desc',
  updateTitle = 'chronicle/update_title',
  updateSource = 'chronicle/update_source',
  position = 'chronicle/position',
  previewSource = 'chronicle/preview_source',
}

// HOOKS --------------------------------------------------------------------

export function useCreateChronicle() {
  const ctx = []

  const [_, setChronicles] = ctx
  const createChronicle = (chronicles: IChronicle[]) => {
    setChronicles(chronicles)
  }

  return {
    createChronicle,
  }
}

export function useShowChronicleButton() {
  //TODO faire gaffe, context viré
  const [showRefreshChronicleButton, setDisplayButton] =
    useState<boolean>(false)

  const showChronicleButton = () => {
    setDisplayButton(true)
  }

  const hideChronicleButton = () => {
    setDisplayButton(false)
  }

  return {
    showRefreshChronicleButton,
    showChronicleButton,
    hideChronicleButton,
  }
}

export function useChronicles() {
  const chroniclesCtx = []

  const { broadcast } = useBroadcast()
  const setChronicle = () => {
    console.log('TODO')
  }

  const setChronicles = () => {}

  const editorCount = useMemo(() => {
    const editorIds = broadcast.chronicles.reduce((acc, chronicle) => {
      if (chronicle.editor) {
        acc[chronicle.editor.id] = acc[chronicle.editor.id]
          ? acc[chronicle.editor.id] + 1
          : 1
      }
      return acc
    }, {})

    return Object.keys(editorIds).length
  }, [chroniclesCtx[0]])

  const addMedia = (media: IMedia) => {
    setChronicle((prev) => ({ ...prev, medias: [...prev.medias, media] }))
  }

  const deleteMedia = (mediaId: string) => {
    setChronicle((prev) => ({
      ...prev,
      medias: prev.medias.filter((m) => m.id !== mediaId),
    }))
  }

  const updateChronicle = (chronicle: IChronicle) => {
    setChronicle(chronicle)
  }

  const updateChronicles = (chronicle: IChronicle[]) => {
    setChronicles(chronicle)
  }

  const deleteChronicle = (chronicleId: string) => {
    setChronicles((prev) => prev.filter((c) => c.id !== chronicleId))
  }

  function updateChronicleField<K extends keyof IChronicle>(
    field: K,
    value: IChronicle[K]
  ) {
    setChronicle((prev) => ({ ...prev, [field]: value }))
    setChronicles((prev) =>
      prev.map((chronicleEl) => {
        if (chronicleEl.id === chronicle.id) chronicleEl[field] = value
        return chronicleEl
      })
    )
  }

  return {
    chronicles: broadcast.chronicles,
    addMedia,
    deleteMedia,
    updateChronicle,
    updateChronicles,
    deleteChronicle,
    updateChronicleField,
    editorCount,
  }
}

// NEW **

export function useChronicle() {
  const { getChronicle } = useBroadcast()
  const id = useContext(ChronicleContext)
  if (!id) throw new Error('ChronicleProvider not found')

  return {
    chronicle: getChronicle(id),
  }
}
