import { useTranslate } from '../../hooks/translate.hook'
import { FullScreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'
import { Button } from '../../ui/button/button'
import { MediaAddOnline } from './media-add-online'
import styles from './media-styles/media-add-form.module.css'
import { MediaAddFormLocal } from './media-add-form-local'

export const MediaAddForm: React.FC = () => {
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
