/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext } from 'react'
import { createContext } from 'react'
import { Media } from '@prisma/client'

// INTERFACES ---------------------------------------------------------------
interface MediaProviderProps {
  children: ReactNode
  media: Media
}

// CONTEXT ------------------------------------------------------------------

export const MediaContext = createContext<Media>(null)

// PROVIDER -----------------------------------------------------------------

export const MediaProvider: React.FC<MediaProviderProps> = ({
  children,
  media,
}) => {
  return <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
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

  if (!ctx) throw new Error('useMedias must be used within a MediaProvider')

  return {
    media: ctx,
  }
}
