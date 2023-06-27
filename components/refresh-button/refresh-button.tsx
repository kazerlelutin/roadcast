import styles from './refresh-button.module.css'
import { useLazyFetch, useTranslate } from '@/hooks'
import { UpdateIcon } from '@/ui'

interface RefreshButtonProps {
  url: string
  body?: any
  callback?: (value: unknown) => void
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  url,
  body,
  callback,
}) => {
  const { getData } = useLazyFetch(url, body, callback)
  const t = useTranslate({
    refresh: {
      en: 'Refresh',
      fr: 'Rafraichir',
    },
  })

  return (
    <div className={styles.box}>
      <button
        type="button"
        className={styles.container}
        onClick={() => getData()}
      >
        {t('refresh')}
        <div className={styles.icon}>
          <UpdateIcon />
        </div>
      </button>
    </div>
  )
}
