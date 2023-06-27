import ReactPlayer from 'react-player'
import { IMedia } from '@/entities'
import styles from './media-styles/media-slider-video.module.css'

interface MediaSliderVideoProps {
  media: IMedia
}

export const MediaSliderVideo: React.FC<MediaSliderVideoProps> = ({
  media,
}) => {
  const regexProviders = new RegExp(
    /youtu|vimeo|facebook|twitter|dailymotion|twitch/
  )
  return media.url ? (
    <div className={styles.container}>
      <ReactPlayer
        url={media.url}
        controls={false}
        volume={1}
        loop={true}
        playing={true}
        width={window.innerWidth}
        height={media.url.match(regexProviders) ? window.innerHeight : '100%'}
        className={styles.image}
      />
    </div>
  ) : (
    <></>
  )
}
