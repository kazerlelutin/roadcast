import { useFetch } from '../../hooks/fetch.hook'
import { useTranslate } from '../../hooks/translate.hook'
import { Info } from '../../ui/info/info'
import { BroadcastRoutes, IBroadcast } from './broadcast'
import { BroadcastListLine } from './broadcast-list-line'
import styles from './broadcast-styles/broadcast-list.module.css'

export const BroadcastList = () => {
  const {
    data: broadcasts,
    loading,
    error,
  } = useFetch<IBroadcast[]>(BroadcastRoutes.findMany)

  const t = useTranslate({
    title: {
      en: 'Broadcast List',
      fr: 'Liste des fils rouges',
    },
    noBroadcasts: {
      en: 'No broadcasts',
      fr: 'Aucun fil rouge',
    },
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      {loading && <div>{t('loading')}...</div>}
      {!error && !loading && !broadcasts?.length && (
        <Info>{t('noBroadcasts')}</Info>
      )}
      <div className={styles.list}>
        {broadcasts?.map((broadcast) => (
          <BroadcastListLine key={broadcast.id} broadcast={broadcast} />
        ))}
      </div>
    </div>
  )
}
