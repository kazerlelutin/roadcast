import { useFetch } from '../../hooks/fetch.hook'
import { useTranslate } from '../../hooks/translate.hook'
import { BroadcastRoutes, IBroadcast } from './broadcast'
import { BroadcastListLine } from './broadcast-list-line'
import styles from './broadcast-styles/broadcast-list.module.css'

export const BroadcastList = () => {
  const { data: broadcasts, loading } = useFetch<IBroadcast[]>(
    BroadcastRoutes.findMany
  )

  const t = useTranslate({
    title: {
      en: 'Broadcast List',
      fr: 'Liste des fils rouges',
    },
  })

  return (
    <div className={styles.container}>
      {loading && <div>{t('loading')}...</div>}
      <ul className={styles.list}>
        {broadcasts?.map((broadcast) => (
          <BroadcastListLine key={broadcast.id} broadcast={broadcast} />
        ))}
      </ul>
    </div>
  )
}
