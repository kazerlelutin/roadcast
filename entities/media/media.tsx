/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, useContext } from 'react'
import { createContext } from 'react'
import { TEntity } from '@/types'
import { Media } from '@prisma/client'

// INTERFACES ---------------------------------------------------------------
interface MediaProviderProps {
  children: ReactNode
  media: Media
}

// CONTEXT ------------------------------------------------------------------

export const MediaContext = createContext<TEntity<Media>>(null)

// PROVIDER -----------------------------------------------------------------

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
  media,
}) => {
  const value = useState<Media>(media)

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
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

// HOOKS --------------------------------------------------------------------

export const useMedia = () => {
  const ctx = useContext(MediaContext)

  if (!ctx) {
    throw new Error('useMedias must be used within a MediaProvider')
  }

  const [media] = ctx

  return {
    media,
  }
}
