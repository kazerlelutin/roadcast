import { RefreshButton } from '@/components'
import {
  useBroadcast,
  ChronicleRoutes,
  useShowChronicleButton,
} from '@/entities'

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
