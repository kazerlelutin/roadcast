/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { MiniLoaderContext } from '../components/mini-loader/mini-loader'
import { getObjectToBase64 } from '../utils/get-object-to-base64'
import { BroadcastContext } from '../entities/broadcast/broadcast'
import { useGetMyLocalId } from './get-my-local-id.hook'

interface Error {
  message: string
  response: {
    status: number
    data: string
  }
}

export function useUpload<T>(
  url: string,
  callBack?: (value: T) => void
): {
  loading: boolean
  error: Error
  data: T
  upload: (body?: Object, newUrl?: string) => Promise<T>
} {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useContext(MiniLoaderContext),
    [broadcast] = useContext(BroadcastContext),
    myLocalId = useGetMyLocalId(),
    abortController = new AbortController()

  async function handlePost(data: FormData, newUrl?: string) {
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
        body: data,
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
    upload: (body?: FormData, newUrl?: string) => handlePost(body, newUrl),
    data,
    error,
    loading,
  }
}
