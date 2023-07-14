import { useFetch } from '@/hooks'
import { useTranslate } from '@/hooks'
import styles from './schedule-styles/schedule-list.module.css'
import { IScheduleAccount, ScheduleRoutes } from './schedule'
import { HomeItemLine } from '@/components'

export function ScheduleList() {
  const t = useTranslate({
    title: {
      fr: 'Liste des plannings',
      en: 'Schedule List',
    },
  })
  const { data: schedules, loading } = useFetch<IScheduleAccount[]>(
    ScheduleRoutes.findMany
  )

  return (
    <div className={styles.container}>
      {loading && <div>{t('loading')}...</div>}
      <ul className={styles.list}>
        {schedules?.map((schedule) => (
          <HomeItemLine
            key={`${schedule.id}-${schedule.createdAt}`}
            type="schedule"
            item={{
              title: schedule.title,
              reader: schedule.reader,
              editor: schedule.editor,
            }}
          />
        ))}
      </ul>
    </div>
  )
}
