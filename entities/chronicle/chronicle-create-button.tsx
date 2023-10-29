import { useTranslate } from '@/hooks'
import { Button } from '@/ui'
import { useBroadcast } from '@/stores/broadcast.store'

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
  const { createChronicle } = useBroadcast()

  return (
    <Button onClick={() => createChronicle(position)}>{t('create')}</Button>
  )
}
