import { useState } from 'react'
import { useSchedule } from './schedule'
import styles from './schedule-styles/schedule-table-info.module.css'
import { Button, Flex, EditMode } from '@/ui'
import { Editor } from '@/components'
import { useTranslate } from '@/hooks'

export function ScheduleTableInfo() {
  const t = useTranslate()
  const { schedule, updateInfo } = useSchedule()
  const [info, setInfo] = useState(schedule.info)

  return (
    <EditMode
      readMode={
        <div
          dangerouslySetInnerHTML={{ __html: schedule.info }}
          className={styles.info}
        />
      }
    >
      {({ close }) => (
        <form
          className={styles.container}
          onSubmit={(e) => {
            e.preventDefault()
            updateInfo(info)
            close()
          }}
        >
          <div className={styles.editor}>
            <Editor defaultValue={info} onChange={setInfo} />
          </div>
          <Flex center>
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
