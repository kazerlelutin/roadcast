/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePost, useLocalState, useLazyFetch, useFetch } from '@/hooks'
import { TEntity } from '@/types'
import { IChronicle, BroadcastChronicleHistory } from '@/entities'
import { Broadcast, ChronicleHistory, Editor } from '@prisma/client'

// INTERFACES ----------------------------------------------------------------
export interface IBroadcast extends Broadcast {
  user_id: string
  editors: Editor[]
  chronicles: IChronicle[]
}

interface BroadcastProviderProps {
  children: React.ReactNode
  broadcast: IBroadcast
}

interface BroadcastOtherProviderProps {
  children: React.ReactNode
}

interface BroadcastChronicleHistory extends ChronicleHistory {
  chronicle: IChronicle
}

// CONTEXT ------------------------------------------------------------------

export const BroadcastContext = createContext<TEntity<IBroadcast>>([
  {} as IBroadcast,
  () => {},
])

export const BroadcastReadModeContext = createContext<TEntity<boolean>>([
  false,
  () => {},
])

export const BroadcastFocusContext = createContext<TEntity<boolean>>([
  false,
  () => {},
])

// ROUTES -------------------------------------------------------------------

export enum BroadcastRoutes {
  findMany = 'broadcast/all',
  findOne = 'broadcast/findone',
  create = 'broadcast/create',
  create_with_history = 'broadcast/create_with_history',
  update = 'broadcast/update',
  saveHistory = 'broadcast/save_history',
  chronicle_history = 'broadcast/chronicle_history',
}

// PROVIDER -----------------------------------------------------------------
export const BroadcastReadModeProvider: React.FC<
  BroadcastOtherProviderProps
> = ({ children }) => {
  const ctx = useLocalState<boolean>(false, 'roadcast_read_mode')

  return (
    <BroadcastReadModeContext.Provider value={ctx}>
      {children}
    </BroadcastReadModeContext.Provider>
  )
}

export const BroadcastFocusModeProvider: React.FC<
  BroadcastOtherProviderProps
> = ({ children }) => {
  const ctx = useLocalState<boolean>(false, 'roadcast_focus_mode')

  return (
    <BroadcastFocusContext.Provider value={ctx}>
      {children}
    </BroadcastFocusContext.Provider>
  )
}

export const BroadcastProvider: React.FC<BroadcastProviderProps> = ({
  children,
  broadcast,
}) => {
  const ctx = useState<IBroadcast>(broadcast)

  useEffect(() => {
    ctx[1](broadcast)
  }, [broadcast])

  return (
    <BroadcastContext.Provider value={ctx}>
      {children}
    </BroadcastContext.Provider>
  )
}

// HOOKS ---------------------------------------------------------------------

export const useGetChronicleHistory = () => {
  const { data, loading } = useFetch<BroadcastChronicleHistory[]>(
    BroadcastRoutes.chronicle_history
  )

  return {
    chronicleHistory: data,
    loading,
  }
}

export const useBroadcast = () => {
  const [broadcast, setBroadcast] = useContext(BroadcastContext)
  const { getData } = useLazyFetch(BroadcastRoutes.findOne, {}, setBroadcast)
  const router = useRouter()

  const { post: create } = usePost<IBroadcast>(BroadcastRoutes.create)
  const { post: createWithHistory } = usePost<IBroadcast>(
    BroadcastRoutes.create_with_history
  )

  const createBroadcast = async (title: string) => {
    const newBroadcast = await create({ title })
    if (newBroadcast) router.push('editor/' + newBroadcast.editor)
  }

  const createBroadcastWithHistory = async () => {
    const newBroadcast = await createWithHistory()
    if (newBroadcast)
      router.push({
        query: {
          editor: newBroadcast.editor,
        },
      })

    getData({ editor: newBroadcast.editor })
  }

  const updateTitle = async (title: string) => {
    setBroadcast((prev) => ({ ...prev, title }))
  }

  // spread ...broadcast for access to the value
  return {
    createBroadcast,
    createBroadcastWithHistory,
    updateTitle,
    broadcast,
  }
}

export const useModes = () => {
  const { broadcast } = useBroadcast()
  const ctxRead = useContext(BroadcastReadModeContext)
  const ctxFocus = useContext(BroadcastFocusContext)

  if (!ctxFocus || !ctxRead)
    throw new Error(
      'useModes must be used within a BroadcastReadModeContext &  BroadcastFocusContext'
    )

  const [isFocused, setFocusMode] = ctxFocus
  const [isReadMode, setReadMode] = ctxRead
  const switchFocus = () => {
    setFocusMode(!isFocused)
  }

  const switchReadMode = () => {
    if (broadcast.editor) setReadMode(!isReadMode)
  }

  return {
    isFocused,
    isReadMode: !broadcast.editor ? true : isReadMode,
    switchFocus,
    switchReadMode,
  }
}
