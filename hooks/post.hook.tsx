import { useContext, useState } from 'react'
import { MiniLoaderContext } from '../components/mini-loader/mini-loader'
import { SessionContext } from '../entities/session/session'

interface Error {
  message: string
  response: {
    status: number
    data: string
  }
}

export function usePost<T>(url: string): {
  loading: boolean
  error: Error
  data: T
  post: (body?: Object, newUrl?: string) => Promise<T>
} {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useContext(MiniLoaderContext),
    session = useContext(SessionContext),
    abortController = new AbortController()

  async function handlePost(body: Object, newUrl?: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/${newUrl || url}`, {
        method: 'POST',
        signal: abortController.signal,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + session?.token_api || '',
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

  return {
    post: (body?: object, newUrl?: string) => handlePost(body, newUrl),
    data,
    error,
    loading,
  }
}
