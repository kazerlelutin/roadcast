import { useState } from 'react'
import { TriggerTypes, useSocketTrigger } from '../../components/socket'
import { MediaSliderImg } from '../../entities/media/media-slider-img'
import { IMedia } from '../../entities/media/media'
import { MediaSliderVideo } from '../../entities/media/media-slider-video'

export const Slider: React.FC = () => {
  const [media, setMedia] = useState<IMedia | undefined>(undefined)
  useSocketTrigger(TriggerTypes.SLIDER, (message: IMedia) => {
    setMedia(message)
  })

  return (
    <>
      {media && media.type.match(/image/) && <MediaSliderImg media={media} />}
      {media && media.type.match(/video/) && <MediaSliderVideo media={media} />}
    </>
  )
}
