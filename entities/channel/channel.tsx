/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useState, useEffect } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'
import { SessionContext } from '../session/session'

// CONTEXT ------------------------------------------------------------------
export const ChannelContext = createContext<TEntity<string>>(null)

interface ChannelProviderProps {
  children: ReactNode
}

// ROUTES -------------------------------------------------------------------

export enum ChannelRoutes {
  updateCurrent = 'channel/update',
}

// PROVIDER  ---------------------------------------------------------------
export const ChannelProvider: React.FC<ChannelProviderProps> = ({
  children,
}) => {
  const ctx = useState<string>('')
  const session = useContext(SessionContext)

  useEffect(() => {
    if (session && session.current_channel && !ctx[0]) {
      //setLayout(session.layouts[0])
      ctx[1](session.current_channel)
    }
  }, [session])

  return (
    <ChannelContext.Provider value={ctx}>{children}</ChannelContext.Provider>
  )
}
