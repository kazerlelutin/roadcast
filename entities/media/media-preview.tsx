import { useTranslate } from '../../hooks/translate.hook'
import { NoMessage } from '../../ui/no-message/no-message'

export const MediaPreview: React.FC = () => {
  const t = useTranslate({
    noMedia: {
      en: 'No media sended',
      fr: 'Aucun média envoyé',
    },
  })
  //TODO un hook permet de reçevoir un media via socket

  const noMedia = true
  if (noMedia) return <NoMessage message={t('noMedia')} />
  return (
    <div>
      <h1>Media Preview</h1>
    </div>
  )
}
