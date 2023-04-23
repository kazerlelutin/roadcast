import { useContext } from 'react'
import { ButtonAutoConfirm } from '../../components/button-auto-confirm/button-auto-confirm'
import { useTranslate } from '../../hooks/translate.hook'
import { MediaContext, MediaRoutes } from './media'
import { usePost } from '../../hooks/post.hook'
import { ChronicleContext } from '../chronicle/chronicle'

export const MediaDelButton: React.FC = () => {
  const [media] = useContext(MediaContext)
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const { post } = usePost<{ message: string }>(MediaRoutes.delete, (data) => {
    setChronicle({
      ...chronicle,
      medias: chronicle.medias.filter((m) => m.id !== media.id),
    })
  })
  const t = useTranslate({
    deleteMedia: {
      en: 'Delete media',
      fr: 'Supprimer le média',
    },
    confirmDeleteMedia: {
      en: 'Confirm delete media',
      fr: 'Confirmer la suppression du média',
    },
  })
  return (
    <ButtonAutoConfirm
      text={t('deleteMedia')}
      confirmText={t('confirmDeleteMedia')}
      onConfirm={() => post({ id: media.id, chronicleId: chronicle.id })}
    />
  )
}
