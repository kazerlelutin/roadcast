import {
  BroadcastFocusModeProvider,
  BroadcastProvider,
  BroadcastReadModeProvider,
  BroadcastRoutes,
  ChronicleRefreshButtonProvider,
  ChronicleToScreenProvider,
  ChroniclesProvider,
  EditorsProvider,
  IBroadcast,
} from '@/entities'
import { SocketProvider } from '@/components'
import { Editor } from '@/pages_related'
import { useEffect, useRef, useState } from 'react'
import { useGetMyLocalId } from '@/hooks'
import { getObjectToBase64 } from '@/utils'
import { LineLoader, LoadingView } from '@/ui'

type WriterWrapperProps = {
  editorToken: string
}
export function WriterWrapper({ editorToken }: WriterWrapperProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [broadcast, setBroadcast] = useState<IBroadcast>()
  const [error, setError] = useState<any>()
  const refSignal = useRef<any>()

  const myLocalId = useGetMyLocalId()

  const handleFetch = async () => {
    setLoading(true)

    try {
      const res = await fetch(`/api/${BroadcastRoutes.findOne}`, {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          ['X-Info']: getObjectToBase64({
            myLocalId,
            editor: editorToken,
          }),
        },
        body: JSON.stringify({ editor: editorToken, reader: '' }),
      })

      const resJson = await res.json()
      setBroadcast(resJson)

      if (res.status !== 200) {
        setError(resJson)
      }
    } catch (e) {
      console.error(e)
      setError(e)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])

  if (!broadcast?.id) return <LoadingView />

  return (
    <ChronicleToScreenProvider>
      <BroadcastReadModeProvider>
        <BroadcastFocusModeProvider>
          <BroadcastProvider broadcast={broadcast}>
            <SocketProvider>
              <ChronicleRefreshButtonProvider>
                <ChroniclesProvider>
                  <EditorsProvider>
                    <Editor />
                  </EditorsProvider>
                </ChroniclesProvider>
              </ChronicleRefreshButtonProvider>
            </SocketProvider>
          </BroadcastProvider>
        </BroadcastFocusModeProvider>
      </BroadcastReadModeProvider>
    </ChronicleToScreenProvider>
  )
}
