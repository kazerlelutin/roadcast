import { useFetch } from '@/hooks'
import { useTranslate } from '@/hooks'
import { BroadcastRoutes, IBroadcast, BroadcastListLine } from '@/entities'
import styles from './broadcast-styles/broadcast-list.module.css'

export const BroadcastList = () => {
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
          <BroadcastListLine
            key={`${broadcast.id}-${broadcast.createdAt}`}
            broadcast={broadcast}
          />
        ))}
      </ul>
    </div>
  )
}
