/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react'
import { PUSHER_API_ID, PUSHER_KEY, PUSHER_REGION } from '../utils/constants'
import { useRouter } from 'next/router'
import { useGetMyLocalId } from '../hooks/get-my-local-id.hook'
import Pusher from 'pusher-js'

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
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: 'eu',
    })

    const editorChannel = router.query.editor
      ? pusher.subscribe(router.query.editor as string)
      : undefined
    const readerChannel = router.query.reader
      ? pusher.subscribe(router.query.reader as string)
      : undefined
    const events = [
      TriggerTypes?.BROADCAST,
      TriggerTypes?.CHRONICLE,
      TriggerTypes?.MEDIA,
      TriggerTypes?.SLIDER,
    ]
    events.forEach((event) => {
      if (editorChannel) editorChannel.bind(event, cbSocket)
      if (readerChannel) readerChannel.bind(event, cbSocket)
    })
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
