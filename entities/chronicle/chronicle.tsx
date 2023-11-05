/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useMemo, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '@/types'
import { Chronicle, Editor, Media } from '@prisma/client'
import { useBroadcast } from '@/stores'

// INTERFACES ---------------------------------------------------------------

export enum ChronicleStatus {
  draft = 'draft',
  published = 'published',
  read = 'read',
}

export interface IChronicle extends Chronicle {
  medias: Media[]
  editor: Editor
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

export const ChronicleRefreshButtonContext = createContext<TEntity<boolean>>([
  false,
  () => {},
])

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

// NEW **

export function useChronicle() {
  const { getChronicle,setChronicle, updateChronicleField, deleteMedia } = useBroadcast()
  const id = useContext(ChronicleContext)
  if (!id) throw new Error('ChronicleProvider not found')

  const chronicle = getChronicle(id)
  return {
    chronicle,
    deleteMedia: (mediaId: string) => deleteMedia(id, mediaId),
    updateChronicleField: (chronicle: Partial<Chronicle>) => updateChronicleField({...chronicle, id}),
    setChronicle: (chronicle: Partial<Chronicle>) => setChronicle({...chronicle, id}),
  }
}
