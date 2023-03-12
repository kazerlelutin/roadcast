import { TriggerTypes } from '../components/socket'
import { URL_LIVE } from '../utils/constants'

export const trigger = async (
  room: string,
  body: {
    type: TriggerTypes
    message: unknown
  }
) => {
  fetch(URL_LIVE + '/trigger', {
    method: 'POST',
    body: JSON.stringify({
      room,
      body,
    }),
  })
}
