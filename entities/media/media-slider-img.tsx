/* eslint-disable @next/next/no-img-element */
import { IMedia } from '@/entities'
import styles from './media-styles/media-slider-img.module.css'

interface MediaSliderImgProps {
  media: IMedia
}

export function MediaSliderImg({ media }: MediaSliderImgProps) {
  return (
    <div className={styles.container}>
      {media.url && (
        <div className={styles.blurContainer}>
          <img src={media.url} className={styles.blur} alt={media.name} />
        </div>
      )}
      {media.url && (
        <div
          style={{ backgroundImage: `url(${media.url})` }}
          className={styles.image}
        />
      )}
    </div>
  )
}
