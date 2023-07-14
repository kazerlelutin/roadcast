import { useTranslate } from '@/hooks'
import { Button } from '@/ui'
import { useSchedule } from './schedule'

export function ScheduleTableBroadcast() {
  const { loadingBroadcast, goToBroadcast } = useSchedule()
  const t = useTranslate({
    goToBroadcast: {
      en: 'Go to broadcast',
      fr: 'Aller au conducteur',
    },
  })

  return (
    <Button loading={loadingBroadcast} onClick={goToBroadcast}>
      {t('goToBroadcast')}
    </Button>
  )
}
