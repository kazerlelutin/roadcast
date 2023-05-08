import { useContext } from 'react'
import { RefreshButton } from '../../components/refresh-button/refresh-button'
import { BroadcastContext } from '../broadcast/broadcast'
import { ChronicleRefreshButtonContext, ChronicleRoutes } from './chronicle'

export const ChronicleRefreshButton: React.FC = () => {
  const [broadcast] = useContext(BroadcastContext)
  const [displayButton] = useContext(ChronicleRefreshButtonContext)

  return displayButton ? (
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
