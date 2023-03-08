import { ReactNode, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'

// INTERFACES ---------------------------------------------------------------
interface MediaProviderProps {
  children: ReactNode
}

export interface IMEdia {
  id: string
  source: string
  name: string
  type: 'image' | 'video' | 'website' | 'text'
  url: string
  createdAt: Date
  tags: string[]
}

// CONTEXT ------------------------------------------------------------------

export const MediaContext = createContext<TEntity<IMEdia>>(null)

// PROVIDER -----------------------------------------------------------------

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const value = useState<IMEdia>({
    id: '',
    source: '',
    name: '',
    type: 'image',
    url: '',
    createdAt: new Date(),
    tags: [],
  })

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

// ROUTES -------------------------------------------------------------------

export enum MediaRoutes {
  delete = 'media/delete',
  findMany = 'media/all',
  create = 'media/create',
  update = 'media/update',
}
