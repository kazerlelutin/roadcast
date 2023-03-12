/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { createContext, useState, useEffect } from 'react'
import { useFetch } from '../../hooks/fetch.hook'
import { usePost } from '../../hooks/post.hook'
import { TEntity } from '../../types/entity.type'
import { NavigationPages } from '../navigation/navigation'
import { IChronicle } from '../chronicle/chronicle'
import { TriggerTypes, useSocketTrigger } from '../../components/socket'

// INTERFACES ----------------------------------------------------------------
interface BroadcastProviderProps {
  children: React.ReactNode
}

export interface IBroadcast {
  id: string
  user_id: string
  title: string
  description?: string
  logo?: string
  prefix: string
  admin: string
  editor: string
  reader: string
  started_at: Date
  ended_at: Date
  createdAt: Date
  chronicles: IChronicle[]
}

// CONTEXT ------------------------------------------------------------------

export const BroadcastInitialValue: IBroadcast = {
  id: '',
  user_id: '',
  title: '',
  description: '',
  logo: '',
  prefix: '',
  admin: '',
  editor: '',
  reader: '',
  started_at: new Date(),
  ended_at: new Date(),
  createdAt: new Date(),
  chronicles: [],
}

export const BroadcastContext = createContext<TEntity<IBroadcast>>([
  BroadcastInitialValue,
  () => {},
])

// ROUTES -------------------------------------------------------------------

export enum BroadcastRoutes {
  findMany = 'broadcast/all',
  findOne = 'broadcast/findone',
  create = 'broadcast/create',
  update = 'broadcast/update',
}

// HOOK ---------------------------------------------------------------------
export const useBroadcast = () => {
  const router = useRouter()

  const { post: create } = usePost<IBroadcast>(BroadcastRoutes.create)

  const createBroadcast = async (title: string) => {
    const newBroadcast = await create({ title })
    if (newBroadcast) {
      router.push({
        pathname: 'dashboard',
        query: {
          id: newBroadcast.id,
          page: NavigationPages.broadcast,
          admin: newBroadcast.admin,
        },
      })
    }
  }

  return { createBroadcast }
}

// PROVIDER -----------------------------------------------------------------
export const BroadcastProvider: React.FC<BroadcastProviderProps> = ({
  children,
}) => {
  const router = useRouter()
  const ctx = useState<IBroadcast>(BroadcastInitialValue)

  const { data, refetch } = useFetch<IBroadcast>(
    BroadcastRoutes.findOne,
    {
      admin: router.query?.admin,
      editor: router.query?.editor,
      viewer: router.query?.viewer,
    },
    ctx[1]
  )

  //update context if data is fetched, clean context if no admin, editor or viewer key
  useEffect(() => {
    if (data) ctx[1](data)
  }, [data])
  useEffect(() => {
    const { admin, editor, viewer } = router.query

    //clean state if no admin, editor or viewer key
    if (admin || editor || viewer) {
      refetch()
    } else {
      ctx[1](BroadcastInitialValue)
    }
  }, [router.query])

  useSocketTrigger(TriggerTypes.BROADCAST, (message: string) => {
    //TODO Demande de refresh le contexte
    // if (message === 'refresh') refetch()
  })

  return (
    <BroadcastContext.Provider value={ctx}>
      {children}
    </BroadcastContext.Provider>
  )
}
