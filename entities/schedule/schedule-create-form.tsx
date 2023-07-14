import { useState } from 'react'
import { Button, Flex } from '@/ui'
import { useTranslate } from '@/hooks'
import va from '@vercel/analytics'
import { useSchedules } from './schedule'

export function ScheduleCreateForm() {
  const [subject, setSubject] = useState('')
  const { createSchedule, loadingCreate } = useSchedules()
  const t = useTranslate({
    createSchedule: {
      fr: 'Ajouter un programme',
      en: 'Add a program',
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        va.track('createSchedule')
        createSchedule(subject)
        setSubject('')
      }}
    >
      <Flex center>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t('createSchedule')}
        />
        <Button type="submit" loading={loadingCreate}>
          {t('create')}
        </Button>
      </Flex>
    </form>
  )
}
