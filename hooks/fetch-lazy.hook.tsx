/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { MiniLoaderContext } from '../components/mini-loader/mini-loader'
import { getObjectToBase64 } from '../utils/get-object-to-base64'
import { BroadcastContext } from '../entities/broadcast/broadcast'
import { useGetMyLocalId } from './get-my-local-id.hook'

export interface Error {
  message: string
  response: {
    status: number
    data: string
  }
}
export type FetchResult<T> = {
  getData: (newBody?: object) => void
  reSync: (newBody?: object) => void
  data: T
  error: Error
  loading: boolean
  localLoading: boolean
}

export function useLazyFetch<T>(
  url: string,
  body: object = {},
  callback?: (data: T) => void
): FetchResult<T> {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [inProgress, setInProgress] = useState<boolean>(false),
    [loading, setLoading] = useContext(MiniLoaderContext),
    [localLoading, setLocalLoading] = useState<boolean>(false),
    [broadcast] = useContext(BroadcastContext),
    myLocalId = useGetMyLocalId(),
    [abort, setAbort] = useState<AbortController>()

  async function handleFetch(newBody?: object, reSync?: boolean) {
    if (inProgress) return
    setInProgress(true)
    if (!reSync) {
      setLoading(true)
      setLocalLoading(true)
    }

    try {
      const res = await fetch(`/api/${url}`, {
        method: 'POST',
        signal: abort.signal,
        headers: {
          Accept: 'application/json',
          ['X-Info']: getObjectToBase64({
            myLocalId,
            editor: broadcast.editor,
            reader: broadcast.reader,
          }),
        },
        body: JSON.stringify(newBody || body || {}),
      })

      const resJson = await res.json()
      callback?.(resJson)
      setData(resJson)
      if (res.status !== 200) {
        setError(resJson)
      }
    } catch (e) {
      setError(e)
    }
    if (!reSync) {
      setLoading(false)
      setLocalLoading(false)
    }
    setInProgress(false)
  }

  useEffect(() => {
    if (!abort) setAbort(new AbortController())
    return () => {
      if (inProgress) abort.abort('cleanup')
    }
  }, [abort])

  return {
    getData: (newBody?: object) => handleFetch(newBody),
    //Resync not trigger Loading
    reSync: (newBody?: object) => handleFetch(newBody || undefined, true),
    data,
    error,
    loading,
    localLoading,
  }
}
