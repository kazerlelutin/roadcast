import { useState } from 'react'
import { useSchedule } from './schedule'
import { Button, Col, EditIcon, Flex } from '@/ui'
import { useTranslate } from '@/hooks'
import styles from './schedule-styles/schedule-table-date.module.css'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export function ScheduleTableDate() {
  const { locale } = useRouter()
  const t = useTranslate({
    notSet: {
      fr: 'Aucune date définie',
      en: 'No date set',
    },
  })
  const { schedule, updateStart } = useSchedule()
  const [edit, setEdit] = useState(false)
  const [startAt, setStartAt] = useState(
    schedule.start_at
      ? dayjs(schedule.start_at).format('YYYY-MM-DDTHH:mm')
      : undefined
  )
  if (!edit)
    return (
      <Flex center>
        {startAt ? (
          <Col>
            <div>
              {dayjs(startAt).locale(locale).format('dddd DD MMMM YYYY')}
            </div>
            <div className={styles.hour}>
              {dayjs(startAt).locale(locale).format('HH:mm')}
            </div>
          </Col>
        ) : (
          t('notSet')
        )}

        <div onClick={() => setEdit(true)} className="edit">
          <EditIcon />
        </div>
      </Flex>
    )
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault()
        updateStart(dayjs(startAt).toDate())
        setEdit(false)
      }}
    >
      <div className={styles.editor}>
        <input
          value={startAt}
          type="datetime-local"
          onChange={(e) => setStartAt(e.target.value)}
        />
      </div>
      <Flex center>
        <Button type="reset" onClick={() => setEdit(false)}>
          {t('close')}
        </Button>
        <Button type="submit" variant="normal">
          {t('save')}
        </Button>
      </Flex>
    </form>
  )
}
