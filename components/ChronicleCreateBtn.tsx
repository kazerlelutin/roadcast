import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores'
import { Button } from '@/ui'

interface ChronicleCreateButtonProps {
  position: number
}

export function ChronicleCreateButton({ position }: ChronicleCreateButtonProps) {
  const t = useTranslate({
    create: {
      fr: 'Ajouter une chronique',
      en: 'Add a chronicle',
    },
  })
  const { loading, createChronicle } = useBroadcast()

  return (
    <Button variant="normal" onClick={() => createChronicle(position)} loading={loading === 'createChronicle'}>
      {t('create')}
    </Button>
  )
}
