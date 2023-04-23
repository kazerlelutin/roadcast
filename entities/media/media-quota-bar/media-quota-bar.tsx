import { TriggerTypes, useSocketTrigger } from '../../../components/socket'
import { useFetch } from '../../../hooks/fetch.hook'
import { Col } from '../../../ui/col/col'
import { Label } from '../../../ui/label/label'
import { ProgressBar } from '../../../ui/progress-bar/progress-bar'
import { BroadcastContext } from '../../broadcast/broadcast'
import { MediaRoutes } from '../media'
import { useContext } from 'react'

export const MediaQuotaBar: React.FC = () => {
  const [{ editor }] = useContext(BroadcastContext)
  const { data, reSync } = useFetch<{ quota: number; limit: number }>(
    MediaRoutes.getQuota,
    { editor }
  )
  useSocketTrigger(TriggerTypes.MEDIA, (message: string) => {
    console.log('MediaQuotaBar', message)
    if (message === 'refresh') reSync()
  })

  return (
    <Col smallGap>
      <Label>
        Media quota ({data?.quota.toFixed(0)}mo / {data?.limit || 0}mo)
      </Label>
      <ProgressBar value={data?.quota} total={data?.limit} />
    </Col>
  )
}
