import { useContext } from 'react'
import { ChronicleContext } from '../chronicle/chronicle'
import { MediaProvider } from './media'
import { MediaWithControls } from './media-with-controls'
import styles from './media-styles/media-list.module.css'

export const MediaList: React.FC = () => {
  const [chronicle] = useContext(ChronicleContext)

  if (chronicle.medias.length === 0) return <></>
  return (
    <div className={styles.container}>
      {chronicle.medias.map((media) => (
        <MediaProvider key={media.id} media={media}>
          <MediaWithControls />
        </MediaProvider>
      ))}
    </div>
  )
}
