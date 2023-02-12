/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react'
import io from 'socket.io-client'
import { SessionContext } from '../entities/session/session'
import { URL_LIVE } from '../utils/constants'

// INTERFACES ---------------------------------------------------------------
interface SocketProviderProps {
  children: ReactNode
}

export enum TriggerTypes {
  public = 'public-roadcast',
}

// CONTEXT ------------------------------------------------------------------
export const SocketContext = createContext({
  type: undefined,
  message: undefined,
})

// HOOKS --------------------------------------------------------------------

export const useSocketTrigger = (
  type: string,
  action: (msg: unknown) => void
) => {
  const message = useContext(SocketContext)

  useEffect(() => {
    if (message && message?.type == type) {
      action(message?.message)
    }
  }, [message])

  return message
}

export const useSocket = () => {
  const session = useContext(SessionContext)
  const [message, setMessage] = useState<{
    type: TriggerTypes | undefined
    message: unknown
  }>()

  const cbSocket = (data: { type: TriggerTypes; message: unknown }) => {
    setMessage(data)
    setTimeout(() => setMessage(undefined), 400)
  }

  useEffect(() => {
    const socket = io(URL_LIVE)
    if (session) {
      socket.on('connect', () => {
        socket.on(session.id + '-roadcast', cbSocket)
        socket.on(TriggerTypes.public, cbSocket)
      })
    }

    return () => {
      socket?.disconnect()
    }
  }, [session])

  return message
}

// PROVIDER -----------------------------------------------------------------
export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const message = useSocket()

  return (
    <SocketContext.Provider value={message}>{children}</SocketContext.Provider>
  )
}
