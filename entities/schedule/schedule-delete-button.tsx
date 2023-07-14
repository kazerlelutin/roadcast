import { useTranslate, usePost } from '@/hooks'
import { Button, Col, Flex, FullScreenPopin, useFullscreenPopin } from '@/ui'
import { useSchedule, useSchedules, ScheduleRoutes } from '@/entities'

export function ScheduleDeleteButtonForm() {
  const { schedule } = useSchedule()
  const { deleteSchedule } = useSchedules()
  const { closeModale } = useFullscreenPopin()
  const { post } = usePost(ScheduleRoutes.delete, () => {
    deleteSchedule(schedule.id)
    closeModale()
  })
  const t = useTranslate({
    confirmMsg: {
      en: 'Are you sure you want to delete this project?',
      fr: 'Êtes-vous sûr de vouloir supprimer ce projet?',
    },
  })

  return (
    <Col>
      <p>{t('confirmMsg')}</p>
      <Flex spaceBetween>
        <Button variant="red" onClick={() => post({ id: schedule.id })}>
          {t('confirm')}
        </Button>
        <Button variant="normal" onClick={closeModale}>
          {t('cancel')}
        </Button>
      </Flex>
    </Col>
  )
}

export function ScheduleDeleteButton() {
  const { schedule } = useSchedule()

  const t = useTranslate({
    deleteSchedule: {
      fr: 'Supprimer ce projet',
      en: 'Delete this project',
    },
  })

  return (
    <FullScreenPopin
      action={<Button variant="red">{t('deleteSchedule')}</Button>}
      title={schedule.subject}
    >
      <ScheduleDeleteButtonForm />
    </FullScreenPopin>
  )
}
