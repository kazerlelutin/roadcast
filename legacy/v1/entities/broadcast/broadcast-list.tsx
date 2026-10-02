import { useFetch } from '@/hooks'
import { useTranslate } from '@/hooks'
import { BroadcastRoutes, IBroadcast } from '@/entities'
import styles from './broadcast-styles/broadcast-list.module.css'
import { HomeItemLine } from '@/components'

export function BroadcastList() {
  const t = useTranslate({
    title: {
      en: 'Broadcast List',
      fr: 'Liste des fils rouges',
    },
  })
  const { data: broadcasts, loading } = useFetch<IBroadcast[]>(
    BroadcastRoutes.findMany
  )

  return (
    <div className={styles.container}>
      {loading && <div>{t('loading')}...</div>}
      <ul className={styles.list}>
        {broadcasts?.map((broadcast) => (
          <HomeItemLine
            key={`${broadcast.id}-${broadcast.createdAt}`}
            type="broadcast"
            item={{
              title: broadcast.title,
              reader: broadcast.reader,
              editor: broadcast.editor,
            }}
          />
        ))}
      </ul>
    </div>
  )
}
