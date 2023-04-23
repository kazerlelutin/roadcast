import { useContext } from 'react'
import { BroadcastContext } from '../entities/broadcast/broadcast'
import { useGetMyLocalId } from './get-my-local-id.hook'
import { getObjectToBase64 } from '../utils/get-object-to-base64'

export const useSimpleFetch = () => {
  const [broadcast] = useContext(BroadcastContext),
    myLocalId = useGetMyLocalId()

  async function getData<T>(url: string, body: Object): Promise<T> {
    const res = await fetch(`/api/${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ['X-Info']: getObjectToBase64({
          myLocalId,
          editor: broadcast.editor,
          reader: broadcast.reader,
        }),
      },
      body: JSON.stringify(body || {}),
    })
    return await res.json()
  }

  return { getData }
}
