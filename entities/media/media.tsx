/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, useContext, useEffect } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'
import { useFetch } from '../../hooks/fetch.hook'
import { BroadcastContext } from '../broadcast/broadcast'
import { IChronicle } from '../chronicle/chronicle'
import { TriggerTypes, useSocketTrigger } from '../../components/socket'

// INTERFACES ---------------------------------------------------------------
interface MediaProviderProps {
  children: ReactNode
  media: IMedia | IMediaJoinChronicle
}

interface MediasProviderProps {
  children: ReactNode
}

export interface IChronicleJoin {
  chronicle_id: string
  media_id: string
}

export interface IMedia {
  id: string
  source: string
  name: string
  type: 'image' | 'video' | 'website' | 'text'
  url: string
  cover?: string
  size: number
  createdAt: Date
  chronicles: IChronicle[]
  tags: string[]
}

export interface IMediaJoinChronicle {
  id: string
  source: string
  name: string
  type: 'image' | 'video' | 'website' | 'text'
  url: string
  cover?: string
  size: number
  createdAt: Date
  chronicles: IChronicleJoin[]
  tags: string[]
}

// CONTEXT ------------------------------------------------------------------

export const MediasContext = createContext<TEntity<IMediaJoinChronicle[]>>(null)
export const MediaContext =
  createContext<TEntity<IMedia | IMediaJoinChronicle>>(null)

// PROVIDER -----------------------------------------------------------------

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
  media,
}) => {
  const value = useState<IMedia | IMediaJoinChronicle>(media)

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

export const MediasProvider: React.FC<MediasProviderProps> = ({ children }) => {
  const [broadcast] = useContext(BroadcastContext)
  const { reader, editor } = broadcast
  const value = useState<IMediaJoinChronicle[]>([])
  const { reSync } = useFetch<IMediaJoinChronicle[]>(
    MediaRoutes.findMany,
    { reader, editor },
    (data: IMediaJoinChronicle[]) => value[1](data)
  )

  useEffect(() => {
    if (reader || editor) reSync({ reader })
  }, [reader, editor])

  useSocketTrigger(TriggerTypes.MEDIA, () => reSync({ reader }))

  return (
    <MediasContext.Provider value={value}>{children}</MediasContext.Provider>
  )
}

// ROUTES -------------------------------------------------------------------

export enum MediaRoutes {
  delete = 'media/delete',
  findMany = 'media/all',
  getQuota = 'media/quota',
  create = 'media/create',
  update = 'media/update',
  upload = 'media/upload',
  scrap = 'media/scrap',
  broadcast = 'media/broadcast',
}
