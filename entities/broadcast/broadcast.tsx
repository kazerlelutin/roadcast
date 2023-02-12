/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { createContext, useContext, useState, useEffect } from 'react'
import { useFetch } from '../../hooks/fetch.hook'
import { usePost } from '../../hooks/post.hook'
import { TEntity } from '../../types/entity.type'
import { NavigationPages } from '../navigation/navigation'

//TODO Faire pour les broadcasts un contexte qui contient les broadcasts et un contexte qui contient le broadcast en cours

/**
 * peut être pas besoin de context pour les broadcasts, juste un hook qui récupère les broadcasts et un hook qui récupère le broadcast en cours
 */

// INTERFACES ----------------------------------------------------------------
interface BroadcastProviderProps {
  children: React.ReactNode
}

export enum BroadcastProfile {
  admin = 'admin',
  editor = 'editor',
  reader = 'reader',
}

interface IBroadcast {
  id: string
  user_id: string
  title: string
  description: string
  logo: string
  prefix: string
  admin: string
  editor: string
  reader: string
  started_at: Date
  ended_at: Date
  createdAt: Date
  profile: BroadcastProfile
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
  profile: BroadcastProfile.admin,
}

export const BroadcastContext = createContext<TEntity<IBroadcast>>([
  BroadcastInitialValue,
  () => {},
])

// ROUTES -------------------------------------------------------------------

export enum BroadcastRoutes {
  findMany = 'broadcast/all',
  findOne = 'broadcast',
  create = 'broadcast/create',
}

// HOOK ---------------------------------------------------------------------
export const useBroadcast = () => {
  const router = useRouter()
  const [broadcast, setBroadcast] = useContext(BroadcastContext)
  const { data } = useFetch<IBroadcast>(BroadcastRoutes.findMany)
  const { post: create } = usePost<IBroadcast>(BroadcastRoutes.create)

  useEffect(() => {
    if (data) setBroadcast(data)
  }, [data])

  const createBroadcast = async (title: string) => {
    const newBroadcast = await create({ title })
    if (newBroadcast) {
      router.push({
        pathname: 'dashboard',
        query: {
          id: newBroadcast.id,
          page: NavigationPages.broadcast,
        },
      })
    }
  }

  return { broadcast, createBroadcast }
}

// PROVIDER -----------------------------------------------------------------
export const BroadcastProvider: React.FC<BroadcastProviderProps> = ({
  children,
}) => {
  const ctx = useState<IBroadcast>(BroadcastInitialValue)

  return (
    <BroadcastContext.Provider value={ctx}>
      {children}
    </BroadcastContext.Provider>
  )
}
