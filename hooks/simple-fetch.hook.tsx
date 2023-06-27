import { useContext } from 'react'
import { getObjectToBase64 } from '@/utils'
import { BroadcastContext } from '@/entities'
import { useGetMyLocalId } from '@/hooks'

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
