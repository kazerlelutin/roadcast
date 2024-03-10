/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { IMedia } from '@/entities'
import ReactPlayer from 'react-player'

export function MiniPlayer() {
  const [media, setMedia] = useState<IMedia | undefined>(undefined)
  useSocketTrigger(TriggerTypes.SLIDER, (message: IMedia) => {
    if (JSON.stringify(media) === JSON.stringify(message)) return
    setMedia((prev) => ({
      ...prev,
      ...message,
    }))
  })
  const regexProviders = new RegExp(
    /youtu|vimeo|facebook|twitter|dailymotion|twitch/
  )

  if (!media) return null
  return (
    <div className="flex w-full items-center flex-col gap-2">
      {media && media.type.match(/image/) && (
        <div className="w-full h-auto m-auto">
          {media.url && <img src={media.url} alt={media.name} />}
        </div>
      )}
      {media && media.type.match(/video/) && (
        <div className="w-full h-auto">
          <ReactPlayer
            url={media.url}
            volume={0.3}
            loop={true}
            controls={true}
            playing={true}
            width={'100%'}
            height={'auto'}
          />
        </div>
      )}
    </div>
  )
}
