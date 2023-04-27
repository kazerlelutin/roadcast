import { useContext } from 'react'
import {
  ChronicleContext,
  ChronicleToScreenContext,
} from '../chronicle/chronicle'
import { MediaProvider } from './media'
import { MediaWithControls } from './media-with-controls'
import styles from './media-styles/media-list.module.css'
import { BroadcastFocusContext } from '../broadcast/broadcast'

export const MediaList: React.FC = () => {
  const [currentChronicle] = useContext(ChronicleToScreenContext)
  const [focusMode] = useContext(BroadcastFocusContext)
  const [chronicle] = useContext(ChronicleContext)

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
