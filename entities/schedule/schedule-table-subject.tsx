import { useState } from 'react'
import { useSchedule } from './schedule'
import styles from './schedule-styles/schedule-table-subject.module.css'
import { Button, Flex, EditMode } from '@/ui'
import { useTranslate } from '@/hooks'

export function ScheduleTableSubject() {
  const t = useTranslate({
    noSubject: {
      en: 'No subject',
      fr: 'Pas de sujet',
    },
  })
  const { schedule, updateSubject } = useSchedule()
  const [subject, setSubject] = useState(schedule.subject)

  return (
    <EditMode
      readMode={
        <div className={styles.subject}>
          {schedule.subject || t('noSubject')}
        </div>
      }
    >
      {({ close }) => (
        <form
          className={styles.container}
          onSubmit={(e) => {
            e.preventDefault()
            updateSubject(subject)
            close()
          }}
        >
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Flex>
            <Button type="reset" onClick={close}>
              {t('close')}
            </Button>
            <Button type="submit" variant="normal">
              {t('save')}
            </Button>
          </Flex>
        </form>
      )}
    </EditMode>
  )
}
