import { NoMessage } from '@/ui'
import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores/broadcast.store'
import {
  ChronicleRefreshButton,
  ChronicleTreeLine,
  ChronicleTreeLineDrop,
} from '@/components'
import { ChronicleProvider } from '@/entities'

export function ChronicleTree() {
  const t = useTranslate()
  const { broadcast } = useBroadcast()

  if (!broadcast.id) return <NoMessage message={t('noBroadcast')} />

  return (
    <div className="flex flex-col gap-1">
      <ChronicleRefreshButton />
      {broadcast.chronicles.length > 0 && (
        <ChronicleTreeLineDrop position={0} />
      )}
      {broadcast.chronicles.map((chronicle) => (
        <ChronicleProvider key={chronicle.id} id={chronicle.id}>
          <ChronicleTreeLine
            key={`${chronicle.id}-${chronicle?.editor?.id}-${chronicle.position}`}
          />
        </ChronicleProvider>
      ))}
    </div>
  )
}
