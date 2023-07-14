import { useState } from 'react'
import { ScheduleStatus, useSchedule } from './schedule'
import styles from './schedule-styles/schedule-table-status.module.css'
import { Button, Flex, EditMode } from '@/ui'
import ReactSelect from 'react-select'
import { useTranslate } from '@/hooks'
import reactSelectStyle from '@/styles/reactSelectStyle'

const statusOpt: any = ['project', 'delayed', 'progress', 'done']

export function ScheduleTableStatus() {
  const t = useTranslate()
  const { schedule, updateStatus } = useSchedule()
  const [status, setStatus] = useState<{
    value: ScheduleStatus
    label: string
  }>({
    value: schedule.status as ScheduleStatus,
    label: t(schedule.status),
  })

  const handleChange = (value: { value: ScheduleStatus; label: string }) => {
    updateStatus(value.value)
    setStatus(value)
  }

  return (
    <EditMode
      readMode={
        <div className={styles.status} data-status={schedule.status}>
          {t(schedule.status)}
        </div>
      }
    >
      {({ close }) => (
        <div className={styles.container}>
          <div className={styles.editor}>
            <ReactSelect
              menuPlacement="auto"
              styles={reactSelectStyle}
              value={status}
              onChange={handleChange}
              options={statusOpt
                .filter((s: string) => s !== status.value)
                .map((s: string) => ({
                  value: s,
                  label: t(s),
                }))}
            />
          </div>
          <Flex center>
            <Button type="reset" onClick={close}>
              {t('close')}
            </Button>
          </Flex>
        </div>
      )}
    </EditMode>
  )
}
