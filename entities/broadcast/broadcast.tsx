/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { usePost } from '../../hooks/post.hook'
import { TEntity } from '../../types/entity.type'
import { IChronicle } from '../chronicle/chronicle'
import useLocalState from '../../hooks/local-state.hook'
import { IEditor } from '../editor/editor'

// INTERFACES ----------------------------------------------------------------
interface BroadcastProviderProps {
  children: React.ReactNode
  broadcast: IBroadcast
}

interface BroadcastOtherProviderProps {
  children: React.ReactNode
}

export interface IBroadcast {
  id: string
  user_id: string
  title: string
  prefix: string
  editor: string
  reader: string
  started_at: Date
  ended_at: Date
  createdAt: Date
  editors: IEditor[]
  chronicles: IChronicle[]
}

// CONTEXT ------------------------------------------------------------------

export const BroadcastInitialValue: IBroadcast = {
  id: '',
  user_id: '',
  title: '',
  prefix: '',
  editor: '',
  reader: '',
  started_at: new Date(),
  ended_at: new Date(),
  createdAt: new Date(),
  chronicles: [],
  editors: [],
}

export const BroadcastContext = createContext<TEntity<IBroadcast>>([
  BroadcastInitialValue,
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
  update = 'broadcast/update',
  saveHistory = 'broadcast/save_history',
}

// HOOK ---------------------------------------------------------------------
export const useBroadcast = () => {
  const [broadcast] = useContext(BroadcastContext)
  const router = useRouter()

  const { post: create } = usePost<IBroadcast>(BroadcastRoutes.create)

  const createBroadcast = async (title: string) => {
    const newBroadcast = await create({ title })
    if (newBroadcast) {
      router.push('editor/' + newBroadcast.editor)
    }
  }

  // spread ...broadcast for access to the value
  return { createBroadcast, broadcast, ...broadcast }
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

  return (
    <BroadcastContext.Provider value={ctx}>
      {children}
    </BroadcastContext.Provider>
  )
}

// HOOKS ---------------------------------------------------------------------

export const useModes = () => {
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
    setReadMode(!isReadMode)
  }

  return {
    isFocused,
    isReadMode,
    switchFocus,
    switchReadMode,
  }
}
