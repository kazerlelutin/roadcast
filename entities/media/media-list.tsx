import { MediaProvider, MediaWithControls, useChronicle } from '@/entities'
import styles from './media-styles/media-list.module.css'
import { useBroadcast } from '@/stores/broadcast.store'

export function MediaList() {
  const { focusMode, currentChronicle } = useBroadcast()
  const { chronicle } = useChronicle()

  if (chronicle.medias.length === 0) return <></>
  return (
    <div
      className={styles.container}
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
