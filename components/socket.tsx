/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react'
import { PUSHER_KEY } from '@/utils'
import { useRouter } from 'next/router'
import { useGetMyLocalId } from '@/hooks'
import Pusher from 'pusher-js'
import { BroadcastContext, ScheduleAccountCtx, useBroadcast } from '@/entities'

// INTERFACES ---------------------------------------------------------------
interface SocketProviderProps {
  children: ReactNode
}
export enum TriggerTypes {
  CHRONICLE = 'chronicle',
  BROADCAST = 'broadcast',
  MEDIA = 'media',
  SLIDER = 'slider',
  SCHEDULE_ACCOUNT = 'schedule_account',
  SCHEDULE = 'schedule',
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
  const { broadcast } = useBroadcast()
  const [schedule] = useContext(ScheduleAccountCtx)
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
    if (!broadcast?.reader && !schedule?.reader) return
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: 'eu',
    })

    const channelName = router.pathname.match(/schedule/)
      ? (schedule.reader as string)
      : (broadcast.reader as string)

    const channel = pusher.subscribe(channelName)
    const events = [
      TriggerTypes?.BROADCAST,
      TriggerTypes?.CHRONICLE,
      TriggerTypes?.MEDIA,
      TriggerTypes?.SLIDER,
      TriggerTypes?.SCHEDULE_ACCOUNT,
      TriggerTypes?.SCHEDULE,
    ]
    events.forEach((event) => {
      channel.bind(event, cbSocket)
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
