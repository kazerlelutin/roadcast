import { RefreshButton } from '@/components'
import { useShowChronicleButton } from '@/entities'

export function ChronicleRefreshButton() {
  const { showRefreshChronicleButton } = useShowChronicleButton()
  return showRefreshChronicleButton ? <RefreshButton /> : <></>
}
