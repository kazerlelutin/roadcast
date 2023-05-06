/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { TriggerTypes, useSocketTrigger } from '../../components/socket'
import { TEntity } from '../../types/entity.type'
import { BroadcastContext } from '../broadcast/broadcast'

// INTERFACES ---------------------------------------------------------------

export enum ChronicleStatus {
  draft = 'draft',
  published = 'published',
  read = 'read',
}

export interface IChronicle {
  id: string
  broadcast_id: string
  title: string
  position: number
  text?: string
  source?: string
  status: ChronicleStatus
  createdAt: Date
  updatedAt: Date
  //TODO type this
  medias: any[]
  editor: any
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

export const ChronicleProvider: React.FC<ChronicleProviderProps> = ({
  children,
  chronicle,
}) => {
  const value = useState<IChronicle>(chronicle)

  return (
    <ChronicleContext.Provider value={value}>
      {children}
    </ChronicleContext.Provider>
  )
}

export const ChronicleToScreenProvider: React.FC<ChroniclesProviderProps> = ({
  children,
}) => {
  const value = useState<string>()

  return (
    <ChronicleToScreenContext.Provider value={value}>
      {children}
    </ChronicleToScreenContext.Provider>
  )
}

export const ChroniclesProvider: React.FC<ChroniclesProviderProps> = ({
  children,
}) => {
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

export const ChronicleThreeProvider: React.FC<ChroniclesProviderProps> = ({
  children,
}) => {
  const value = useState<boolean>(false)
  return (
    <ChronicleThreeContext.Provider value={value}>
      {children}
    </ChronicleThreeContext.Provider>
  )
}

export const ChronicleRefreshButtonProvider: React.FC<
  ChroniclesProviderProps
> = ({ children }) => {
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
}
