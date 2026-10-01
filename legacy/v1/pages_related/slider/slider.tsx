import { useState } from 'react'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { MediaSliderVideo, IMedia, MediaSliderImg } from '@/entities'
import { MediaSliderIframe } from '@/entities/media/media-slider-iframe'

export const Slider: React.FC = () => {
  const [media, setMedia] = useState<IMedia | undefined>(undefined)
  useSocketTrigger(TriggerTypes.SLIDER, (message: IMedia) => {
    if (JSON.stringify(media) === JSON.stringify(message)) return
    setMedia((prev) => ({
      ...prev,
      ...message,
    }))
  })

  return (
    <>
      {media && media.type.match(/image/) && <MediaSliderImg media={media} />}
      {media && media.type.match(/video/) && <MediaSliderVideo media={media} />}
      {media && media.type.match(/iframe/) && (
        <MediaSliderIframe media={media} />
      )}
    </>
  )
}
