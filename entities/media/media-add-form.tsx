import { useTranslate } from '@/hooks'
import { FullScreenPopin, Button } from '@/ui'
import { MediaAddOnline, MediaAddFormLocal } from '@/entities'
import styles from './media-styles/media-add-form.module.css'

export function MediaAddForm() {
  const t = useTranslate({
    addMedia: {
      en: 'Add media',
      fr: 'Ajouter un média',
    },
  })

  return (
    <FullScreenPopin
      action={<Button>{t('addMedia')}</Button>}
      title={t('addMedia')}
    >
      <div className={styles.container}>
        <MediaAddOnline />
        <hr className={styles.hr} />
        <MediaAddFormLocal />
      </div>
    </FullScreenPopin>
  )
}
