/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { MiniLoaderContext } from '../components/mini-loader/mini-loader'
import { useGetMyLocalId } from './get-my-local-id.hook'
import { BroadcastContext } from '../entities/broadcast/broadcast'
import { getObjectToBase64 } from '../utils/get-object-to-base64'

interface Error {
  message: string
  response: {
    status: number
    data: string
  }
}

export function usePost<T>(
  url: string,
  callBack?: (value: T) => void
): {
  loading: boolean
  error: Error
  data: T
  post: (body?: Object, newUrl?: string) => Promise<T>
} {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [broadcast] = useContext(BroadcastContext),
    [loading, setLoading] = useContext(MiniLoaderContext),
    myLocalId = useGetMyLocalId(),
    abortController = new AbortController()

  async function handlePost(body: Object, newUrl?: string) {
    setLoading(true)

    try {
      const res = await fetch(`/api/${newUrl || url}`, {
        method: 'POST',
        signal: abortController.signal,
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

      const resJson = await res.json()
      setData(resJson)
      if (res.status !== 200) {
        setError(resJson)
      }

      return resJson
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (callBack && data) callBack(data)
  }, [data])

  return {
    post: (body?: object, newUrl?: string) => handlePost(body, newUrl),
    data,
    error,
    loading,
  }
}
