import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { usePost } from '../../hooks/post.hook'
import { ChronicleRoutes, IChronicle, useCreateChronicle } from './chronicle'
import { useBroadcast } from '../broadcast/broadcast'
import { useGetMyLocalId } from '../../hooks/get-my-local-id.hook'

interface ChronicleCreateButtonProps {
  position: number
}

export const ChronicleCreateButton: React.FC<ChronicleCreateButtonProps> = ({
  position,
}) => {
  const t = useTranslate({
    create: {
      fr: 'Ajouter une chronique',
      en: 'Add a chronicle',
    },
  })
  const myLocalId = useGetMyLocalId()
  const { broadcast } = useBroadcast()
  const { createChronicle } = useCreateChronicle()

  const { post } = usePost<IChronicle[]>(
    ChronicleRoutes.create,
    createChronicle
  )
  return (
    <Button
      onClick={() => post({ editor: broadcast.editor, position, myLocalId })}
    >
      {t('create')}
    </Button>
  )
}
