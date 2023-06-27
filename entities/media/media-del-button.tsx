import { ButtonAutoConfirm } from '@/components'
import { useTranslate, usePost } from '@/hooks'
import { MediaRoutes, useMedia, useChronicles } from '@/entities'

export const MediaDelButton: React.FC = () => {
  const { media } = useMedia()
  const { chronicle, deleteMedia } = useChronicles()
  const { post } = usePost<{ message: string }>(MediaRoutes.delete, (data) => {
    deleteMedia(media.id)
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
