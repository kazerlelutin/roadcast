import { useFetch } from '@/hooks'
import { useTranslate } from '@/hooks'
import { BroadcastRoutes, ScheduleRoutes } from '@/entities'
import styles from './home-items-list.module.css'
import { HomeItemLine } from '@/components'

interface HomeItemListProps {
  type: 'schedule' | 'broadcast'
}

export function HomeItemList({ type }: HomeItemListProps) {
  const t = useTranslate({
    title: {
      en: 'Broadcast List',
      fr: 'Liste des fils rouges',
    },
  })
  const { data, loading } = useFetch<
    {
      id: string
      reader: string
      editor?: string
      title?: string
      createdAt: Date
    }[]
  >(
    type === 'schedule'
      ? ScheduleRoutes.findManyAccount
      : BroadcastRoutes.findMany
  )

  return (
    <div className={styles.container}>
      {loading && <div>{t('loading')}...</div>}
      <ul className={styles.list}>
        {data?.map((item) => (
          <HomeItemLine
            key={`${item.id}-${item.createdAt}`}
            type={type}
            item={{
              title: item.title,
              reader: item.reader,
              editor: item.editor,
            }}
          />
        ))}
      </ul>
    </div>
  )
}
