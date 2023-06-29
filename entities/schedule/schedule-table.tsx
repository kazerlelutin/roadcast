import { useTranslate } from '@/hooks'
import { ScheduleProvider, useSchedules } from './schedule'
import styles from './schedule-styles/schedule-table.module.css'
import {
  ScheduleTableBroadcast,
  ScheduleTableDate,
  ScheduleTableEditor,
  ScheduleTableGuests,
  ScheduleTableInfo,
  ScheduleTableStatus,
  ScheduleTableSubject,
} from '@/entities'

export function ScheduleTable() {
  const { schedules } = useSchedules()
  const t = useTranslate()

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('subject')}</th>
            <th>{t('info')}</th>
            <th>{t('guests')}</th>
            <th>{t('editors')}</th>
            <th>{t('start_at')}</th>
            <th>{t('status')}</th>
            <th>{t('broadcast')}</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <ScheduleProvider key={schedule.id} schedule={schedule}>
              <tr>
                <td className={styles.subject}>
                  <ScheduleTableSubject />
                </td>
                <td className={styles.info}>
                  <ScheduleTableInfo />
                </td>
                <td className={styles.guests}>
                  <ScheduleTableGuests />
                </td>
                <td className={styles.editors}>
                  <ScheduleTableEditor />
                </td>
                <td className={styles.start}>
                  <ScheduleTableDate />
                </td>
                <td className={styles.status}>
                  <ScheduleTableStatus />
                </td>
                <td className={styles.broadcast}>
                  <ScheduleTableBroadcast />
                </td>
              </tr>
            </ScheduleProvider>
          ))}
        </tbody>
      </table>
    </div>
  )
}
