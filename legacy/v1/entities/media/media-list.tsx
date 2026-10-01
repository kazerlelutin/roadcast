import {
  MediaProvider,
  useChronicles,
  MediaWithControls,
  useModes,
} from '@/entities'
import styles from './media-styles/media-list.module.css'

export function MediaList() {
  const { isFocused } = useModes()
  const { chronicle, currentChronicle } = useChronicles()

  if (chronicle.medias.length === 0) return <></>
  return (
    <div
      className={styles.container}
      data-visible={!isFocused || currentChronicle === chronicle.id}
    >
      {chronicle.medias.map((media) => (
        <MediaProvider key={media.id} media={media}>
          <MediaWithControls />
        </MediaProvider>
      ))}
    </div>
  )
}
