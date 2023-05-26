import { RefreshButton } from '../../components/refresh-button/refresh-button'
import { useBroadcast } from '../broadcast/broadcast'
import { ChronicleRoutes, useShowChronicleButton } from './chronicle'

export const ChronicleRefreshButton: React.FC = () => {
  const { broadcast } = useBroadcast()
  const { showRefreshChronicleButton } = useShowChronicleButton()

  return showRefreshChronicleButton ? (
    <RefreshButton
      url={ChronicleRoutes.findMany}
      body={{ reader: broadcast.reader }}
      callback={() => {
        window.location.reload()
      }}
    />
  ) : (
    <></>
  )
}
