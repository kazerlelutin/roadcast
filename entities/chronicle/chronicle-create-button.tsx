import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { usePost } from '../../hooks/post.hook'
import { ChronicleRoutes, ChroniclesContext, IChronicle } from './chronicle'
import { useContext } from 'react'
import { BroadcastContext } from '../broadcast/broadcast'
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
  const [broadcast] = useContext(BroadcastContext)
  const [_chronicles, setChronicles] = useContext(ChroniclesContext)
  const { post } = usePost<IChronicle[]>(ChronicleRoutes.create, (data) => {
    setChronicles(data)
  })

  //send editor because editor is available in broadcast context for admin and editor
  return (
    <Button
      onClick={() => post({ editor: broadcast.editor, position, myLocalId })}
    >
      {t('create')}
    </Button>
  )
}
