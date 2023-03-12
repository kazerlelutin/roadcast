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
import { BroadcastContext } from '../entities/broadcast/broadcast'
import { SessionContext } from '../entities/session/session'
import { URL_LIVE } from '../utils/constants'
import { useRouter } from 'next/router'

// INTERFACES ---------------------------------------------------------------
interface SocketProviderProps {
  children: ReactNode
}
export enum TriggerTypes {
  CHRONICLE = 'chronicle',
  BROADCAST = 'broadcast',
}

// CONTEXT ------------------------------------------------------------------
export const SocketContext = createContext({
  type: undefined,
  message: undefined,
})

// HOOKS --------------------------------------------------------------------

export const useSocketTrigger = (
  type: TriggerTypes,
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
  const router = useRouter()
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
    const { id } = router.query
    socket.on('connect', () => {
      socket.on('roadcast-public', cbSocket)
      if (session) socket.on('roadcast-' + session.twitch_id, cbSocket)
      socket.on('roadcast-' + id, cbSocket)
    })

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
