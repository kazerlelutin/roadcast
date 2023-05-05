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
import { URL_LIVE } from '../utils/constants'
import { useRouter } from 'next/router'
import { useGetMyLocalId } from '../hooks/get-my-local-id.hook'

// INTERFACES ---------------------------------------------------------------
interface SocketProviderProps {
  children: ReactNode
}
export enum TriggerTypes {
  CHRONICLE = 'chronicle',
  BROADCAST = 'broadcast',
  MEDIA = 'media',
  SLIDER = 'slider',
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
  const myLocalId = useGetMyLocalId()
  const router = useRouter()
  const [message, setMessage] = useState<{
    type: TriggerTypes | undefined
    message: unknown
  }>()

  const cbSocket = (data: {
    type: TriggerTypes
    message: unknown
    id?: string
  }) => {
    //It's my own message
    if (data?.id && myLocalId === data?.id) return
    setMessage(data)
    setTimeout(() => setMessage(undefined), 400)
  }

  useEffect(() => {
    const socket = io(URL_LIVE, {
      transports: ['websocket', 'polling', 'flashsocket'],
    })
    socket.on('connect', () => {
      socket.on('roadcast-public', cbSocket)
      if (router.query?.editor)
        socket.on('roadcast-' + router.query.editor, cbSocket)
      if (router.query?.reader)
        socket.on('roadcast-' + router.query.reader, cbSocket)
    })

    return () => {
      socket?.disconnect()
    }
  }, [router.query])

  return message
}

// PROVIDER -----------------------------------------------------------------
export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const message = useSocket()

  return (
    <SocketContext.Provider value={message}>{children}</SocketContext.Provider>
  )
}
