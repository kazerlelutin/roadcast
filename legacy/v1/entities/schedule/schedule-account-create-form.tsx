import { useState } from 'react'
import { Button, Flex } from '@/ui'
import { useTranslate } from '@/hooks'
import va from '@vercel/analytics'
import { useScheduleAccount } from './schedule'

export function ScheduleAccountCreateForm() {
  const [title, setTitle] = useState('')
  const { createScheduleAccount } = useScheduleAccount()
  const t = useTranslate({
    createSchedule: {
      fr: 'Créer un planning',
      en: 'Create a schedule',
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        va.track('createScheduleAccount')
        createScheduleAccount(title)
      }}
    >
      <Flex center>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('createSchedule')}
        />
        <Button type="submit">{t('create')}</Button>
      </Flex>
    </form>
  )
}
