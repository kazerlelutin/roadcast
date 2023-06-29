import styles from './refresh-button.module.css'
import { useTranslate } from '@/hooks'
import { UpdateIcon } from '@/ui'

export function RefreshButton() {
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
        onClick={() => window.location.reload()}
      >
        {t('refresh')}
        <div className={styles.icon}>
          <UpdateIcon />
        </div>
      </button>
    </div>
  )
}
