import { useTranslate, usePost, useGetMyLocalId } from '@/hooks'
import { Button } from '@/ui'
import {
  ChronicleRoutes,
  IChronicle,
  useCreateChronicle,
  useBroadcast,
} from '@/entities'

interface ChronicleCreateButtonProps {
  position: number
}

export function ChronicleCreateButton({
  position,
}: ChronicleCreateButtonProps) {
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
