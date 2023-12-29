import { useState } from 'react'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { MediaSliderVideo, MediaSliderImg } from '@/entities'
import { Media } from '@prisma/client'

export const Slider: React.FC = () => {
  const [media, setMedia] = useState<Media | undefined>(undefined)
  useSocketTrigger(TriggerTypes.SLIDER, (message: Media) => {
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
    </>
  )
}
