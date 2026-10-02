/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { TEntity } from '@/types'
import { BroadcastContext, IEditor, IMedia } from '@/entities'
import { Chronicle } from '@prisma/client'

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
  chronicle: IChronicle
}

interface ChroniclesProviderProps {
  children: ReactNode
}

// CONTEXTS ------------------------------------------------------------------

export const ChroniclesContext = createContext<TEntity<IChronicle[]>>(null)

export const ChronicleContext = createContext<TEntity<IChronicle>>(null)

export const ChronicleToScreenContext = createContext<TEntity<string>>(null)

export const ChronicleThreeContext = createContext<TEntity<boolean>>(null)

export const ChronicleRefreshButtonContext =
  createContext<TEntity<boolean>>(null)

// PROVIDERS -----------------------------------------------------------------

export function ChronicleProvider({
  children,
  chronicle,
}: ChronicleProviderProps) {
  const value = useState<IChronicle>(chronicle)

  return (
    <ChronicleContext.Provider value={value}>
      {children}
    </ChronicleContext.Provider>
  )
}

export function ChronicleToScreenProvider({
  children,
}: ChroniclesProviderProps) {
  const value = useState<string>()

  return (
    <ChronicleToScreenContext.Provider value={value}>
      {children}
    </ChronicleToScreenContext.Provider>
  )
}

export function ChroniclesProvider({ children }: ChroniclesProviderProps) {
  const [broadcast] = useContext(BroadcastContext)
  const chronicles =
    broadcast?.chronicles?.sort((a, b) => a.position - b.position) || []
  const [currentChronicle, setCurrentChronicle] = useContext(
    ChronicleToScreenContext
  )
  const [_displayButton, setDisplayButton] = useContext(
    ChronicleRefreshButtonContext
  )
  const value = useState<IChronicle[]>(chronicles)

  useEffect(() => {
    if (!broadcast.id) return
    value[1](chronicles)

    if (!currentChronicle && chronicles.length > 0) {
      setCurrentChronicle(chronicles[0].id)
    }
  }, [broadcast])

  useSocketTrigger(TriggerTypes.CHRONICLE, () => {
    setDisplayButton(true)
  })

  return (
    <ChroniclesContext.Provider value={value}>
      {children}
    </ChroniclesContext.Provider>
  )
}

export function ChronicleThreeProvider({ children }: ChroniclesProviderProps) {
  const value = useState<boolean>(false)
  return (
    <ChronicleThreeContext.Provider value={value}>
      {children}
    </ChronicleThreeContext.Provider>
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

export function useThreeChronicle() {
  const ctx = useContext(ChronicleThreeContext)
  const ctxChronicles = useContext(ChroniclesContext)

  if (!ctx || !ctxChronicles)
    throw new Error(
      'useThreeChronicle fonctionne avec le contexte ChronicleThreeContext et ChroniclesContext'
    )

  const [isDragging, setIsDragging] = ctx
  const [chronicles, setChronicles] = ctxChronicles

  const activeDragging = () => {
    setIsDragging(true)
  }
  const disabledDragging = () => {
    setIsDragging(false)
  }

  const updateDrag = (value: boolean) => {
    setIsDragging(value)
  }

  const updateThree = (id: string, position: number) => {
    setChronicles(
      chronicles
        .map((chronicle) => {
          if (chronicle.id === id) {
            chronicle.position = position
          } else if (chronicle.position >= position) chronicle.position += 1
          return chronicle
        })
        .sort((a, b) => a.position - b.position)
    )
  }

  return {
    isDragging,
    activeDragging,
    disabledDragging,
    chronicles,
    updateThree,
    updateDrag,
  }
}

export function useCreateChronicle() {
  const ctx = useContext(ChroniclesContext)

  if (!ctx)
    throw new Error(
      'useCreateChronicle fonctionne avec le contexte ChroniclesContext'
    )

  const [_, setChronicles] = ctx
  const createChronicle = (chronicles: IChronicle[]) => {
    setChronicles(chronicles)
  }

  return {
    createChronicle,
  }
}

export function useShowChronicleButton() {
  const ctx = useContext(ChronicleRefreshButtonContext)

  if (!ctx)
    throw new Error(
      'useShowChronicleButton fonctionne avec le contexte ChronicleRefreshButtonContext'
    )

  const [showRefreshChronicleButton, setDisplayButton] = ctx

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

export function useLastPosition() {
  const ctx = useContext(ChroniclesContext)
  if (!ctx)
    throw new Error(
      'useChronicle fonctionne avec le contexte  ChroniclesContext '
    )

  const [chronicles] = ctx
  const lastPosition =
    chronicles.length === 0 ? 0 : chronicles.at(-1).position + 1

  return {
    lastPosition,
    chronicles,
  }
}

export function useChronicles() {
  const currentChronicleCtx = useContext(ChronicleToScreenContext)
  const ctx = useContext(ChronicleContext)
  const chroniclesCtx = useContext(ChroniclesContext)

  if (ctx === undefined || currentChronicleCtx === undefined)
    throw new Error(
      'useChronicle fonctionne avec le contexte ChronicleToScreenContext, ChronicleContext et ChroniclesContext '
    )

  const [chronicle, setChronicle] = ctx
  const [currentChronicle, setCurrentChronicle] = currentChronicleCtx
  const [chronicles, setChronicles] = chroniclesCtx

  const editorCount = useMemo(() => {
    const editorIds = chronicles.reduce((acc, chronicle) => {
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

  const updateCurrentChronicle = (chronicleId: string) => {
    setCurrentChronicle(chronicleId)
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
    chronicle,
    currentChronicle,
    setCurrentChronicle,
    chronicles,
    addMedia,
    deleteMedia,
    updateChronicle,
    updateChronicles,
    deleteChronicle,
    updateChronicleField,
    updateCurrentChronicle,
    editorCount,
  }
}
