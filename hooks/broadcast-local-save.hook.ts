import { useCallback, useContext, useEffect } from 'react'
import useLocalState from './local-state.hook'
import { BroadcastContext } from '../entities/broadcast/broadcast'

interface BroadcastLocalSave {
  editor: string
  name: string
}
export const useBroadcastLocalSave = () => {
  const [broadcast] = useContext(BroadcastContext)
  const stateKey = 'roadcast-broadcast-local-save'
  const [state, setState] = useLocalState<BroadcastLocalSave[]>([], stateKey)
  const syncBroadcast = useCallback(() => {
    if (!broadcast) return
    const isExist = state.find((item) => item.editor === broadcast.editor)
    if (isExist) return
    const newState = [
      ...state,
      { editor: broadcast.editor, name: broadcast.title },
    ]

    setState(newState)
  }, [state, setState, broadcast])

  useEffect(() => {
    syncBroadcast()
  }, [syncBroadcast])

  return {
    savedBroadcasts: state,
    syncBroadcast,
  }
}
