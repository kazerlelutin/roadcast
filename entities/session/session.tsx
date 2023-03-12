/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from 'react'
import { createContext } from 'react'
import { usePost } from '../../hooks/post.hook'
import { getCookie } from '../../utils/get_cookie'
import { COOKIE_NAME } from '../../utils/set-cookie'
import { ILayout } from '../layout/layout'
import { MiniLoader } from '../../components/mini-loader/mini-loader'
import { useRouter } from 'next/router'

// INTERFACES ---------------------------------------------------------------
interface SessionProviderProps {
  children: ReactNode
}

export enum Profiles {
  free = 'free',
  premium = 'premium',
  all_star = 'all_star',
}

export interface ISession {
  login: string
  profile_image_url: string
  offline_image_url: string
  display_name: string
  id: string
  twitch_id: string
  description: string
  broadcaster_type: string
  view_count: number
  created_at: string
  token: string
  token_profile: string
  token_api: string
  current_channel: string
  channel_count: number
  profile: Profiles
  layouts: ILayout[]
}

// CONTEXT ------------------------------------------------------------------
export const SessionContext = createContext<ISession>(null)

// ROUTES -------------------------------------------------------------------

export enum SessionRoutes {
  login = 'session/login',
  disconnect = 'session/disconnect',
}

// PROVIDER -----------------------------------------------------------------
export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const router = useRouter()
  const { data, post, error } = usePost<ISession>(SessionRoutes.login)

  useEffect(() => {
    post({ token: getCookie(COOKIE_NAME) })
  }, [])

  useEffect(() => {
    const { id, admin, editor, reader } = router.query
    if (error && !id && (!admin || !editor || !reader)) {
      router.push('/')
    }
  }, [error])

  return (
    <SessionContext.Provider value={data}>
      {data && children}
    </SessionContext.Provider>
  )
}
