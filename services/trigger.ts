import Pusher from 'pusher'
import { TriggerTypes } from '../components/socket'
import {
  PUSHER_API_ID,
  PUSHER_KEY,
  PUSHER_REGION,
  PUSHER_SECRET,
} from '../utils/constants'

export const trigger = async (
  room: string,
  type: TriggerTypes,
  body: {
    message: unknown
    id?: string
  }
) => {
  const pusher = new Pusher({
    appId: PUSHER_API_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_REGION,
    useTLS: true,
  })
  pusher.trigger(room, type, { ...body, type })
}
