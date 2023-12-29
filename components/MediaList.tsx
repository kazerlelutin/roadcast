import { useBroadcast } from '@/stores'
import { MediaProvider, useChronicle } from '@/entities'

import { dc } from '@/utils'

import { MediaWithControls } from '@/components'

export function MediaList() {
  const { focusMode, currentChronicle } = useBroadcast()
  const { chronicle } = useChronicle()

  if (chronicle.medias.length === 0) return <></>
  return (
    <div
      className={dc(
        'grid grid-cols-[repeat(auto-fill,_minmax(110px,_1fr))]',
        'grid-rows-[repeat(auto-fill,_minmax(110px,_1fr))]',
        'gap-[var(--dms-gap-sm)] justify-center',
        'cursor-pointer p-[var(--dms-padding)] transition-opacity duration-300',
        [focusMode && currentChronicle !== chronicle.id, 'opacity-20']
      )}
      data-visible={!focusMode || currentChronicle === chronicle.id}
    >
      {chronicle.medias.map((media) => (
        <MediaProvider key={media.id} media={media}>
          <MediaWithControls />
        </MediaProvider>
      ))}
    </div>
  )
}
