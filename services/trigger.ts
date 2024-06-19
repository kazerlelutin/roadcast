import Pusher from 'pusher'
import { TriggerTypes } from '@/components'
import {
  PUSHER_API_ID,
  PUSHER_KEY,
  PUSHER_REGION,
  PUSHER_SECRET,
} from '@/utils'

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
  await pusher.trigger(room, type, { ...body, type })
}

const pusher = new Pusher({
  appId: PUSHER_API_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_REGION,
  useTLS: true,
  timeout: 500,
})

export const triggerSlider = async (
  room: string,
  body: {
    message: unknown
  }
) => {

  return await pusher.trigger(room, TriggerTypes.SLIDER, {
    ...body,
    type: TriggerTypes.SLIDER,
  })
}
