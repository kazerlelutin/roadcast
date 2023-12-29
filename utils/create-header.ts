import { Broadcast, ScheduleAccount } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { getObjectToBase64 } from './get-object-to-base64'

export function createHeader(
  broadcast?: Broadcast,
  scheduleAccount?: ScheduleAccount
) {
  const myLocalIdSaved = localStorage.getItem('roadcast-my-local-id')
  const myLocalId = myLocalIdSaved ? JSON.parse(myLocalIdSaved) : uuidv4()
  return {
    Accept: 'application/json',
    ['X-Info']: getObjectToBase64({
      myLocalId,
      editor: broadcast?.editor || scheduleAccount?.editor || '',
      reader: broadcast?.reader || scheduleAccount?.reader || '',
    }),
  }
}
