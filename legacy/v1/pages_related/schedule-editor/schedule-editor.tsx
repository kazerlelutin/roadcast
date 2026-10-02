import {
  SchedulesProvider,
  useScheduleAccount,
  ScheduleCreateForm,
  ScheduleTable,
  ScheduleRefreshButtonProvider,
} from '@/entities'
import styles from './schedule-editor.module.css'
import { Flex, HeaderNoAuth } from '@/ui'
import { useScheduleAccountLocalSave } from '@/hooks'
import { ScheduleRefreshButton } from '@/entities/schedule/schedule-refresh-button'

export function ScheduleEditor() {
  useScheduleAccountLocalSave()
  const { scheduleAccount } = useScheduleAccount()

  return (
    <ScheduleRefreshButtonProvider>
      <SchedulesProvider schedules={scheduleAccount.schedules}>
        <div className={styles.container}>
          <HeaderNoAuth />
          <div className={styles.header}>
            <Flex>
              <div>
                <h2>{scheduleAccount.title}</h2>
              </div>
              <div className={styles.refresh}>
                <ScheduleRefreshButton />
              </div>
            </Flex>
            <ScheduleCreateForm />
          </div>
          <ScheduleTable />
        </div>
      </SchedulesProvider>
    </ScheduleRefreshButtonProvider>
  )
}
