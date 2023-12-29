import { ChronicleRead, ChronicleRefreshButton, ChronicleCreateButton, ChronicleForm } from '@/components'
import { ChronicleProvider } from '@/entities'
import { useBroadcast } from '@/stores'

export function Chronicles() {
  const { broadcast, lastPosition, readMode } = useBroadcast()

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <ChronicleRefreshButton />
      {broadcast.chronicles
        .sort((a, b) => a.position - b.position)
        .map((chronicle) => (
          <div key={chronicle.id} className="flex w-full flex-col gap-3">
            {!readMode && (
              <div className="flex flex-col items-center gap-1">
                <ChronicleCreateButton position={chronicle.position - 1 < 0 ? 0 : chronicle.position} />
              </div>
            )}
            <ChronicleProvider id={chronicle.id}>
              <div id={chronicle.id}>{readMode ? <ChronicleRead /> : <ChronicleForm />}</div>
            </ChronicleProvider>
          </div>
        ))}
      {!readMode && (
        <div className="flex flex-col items-center">
          <ChronicleCreateButton position={lastPosition} />
        </div>
      )}
    </div>
  )
}
