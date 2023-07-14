import { RefreshButton } from '@/components'
import { useShowScheduleButton } from '@/entities'

export function ScheduleRefreshButton() {
  const { showRefreshScheduleButton } = useShowScheduleButton()

  return showRefreshScheduleButton ? <RefreshButton /> : <></>
}
