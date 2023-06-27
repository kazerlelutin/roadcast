/* eslint-disable @next/next/no-img-element */
import styles from './media-styles/media-display.module.css'
import { useMedia } from '@/entities'
import ReactPlayer from 'react-player'

export const MediaDisplay: React.FC = () => {
  const { media } = useMedia()

  return (
    <div className={styles.container}>
      {media.type.match(/image/) && (
        <img src={media.url} alt={media.name} className={styles.img} />
      )}
      {media.type.match(/video/) && (
        <ReactPlayer url={media.url} width={'400px'} height={'400px'} />
      )}
    </div>
  )
}
