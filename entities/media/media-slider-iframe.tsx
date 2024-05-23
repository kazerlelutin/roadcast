/* eslint-disable @next/next/no-img-element */
import { IMedia } from '@/entities'
import styles from './media-styles/media-slider-iframe.module.css'

interface MediaSliderIframeProps {
  media: IMedia
  isPreview?: boolean
}

export function MediaSliderIframe({
  media,
  isPreview,
}: MediaSliderIframeProps) {
  return (
    media.url && (
      <iframe
        src={media.url}
        className={styles.iframe}
        data-preview={isPreview}
      />
    )
  )
}
