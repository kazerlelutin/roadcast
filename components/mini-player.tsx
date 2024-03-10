/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { IMedia } from '@/entities'
import ReactPlayer from 'react-player'
import styles from './mini-player.module.css'
import { useTranslate } from '@/hooks'
import { CloseIcon } from '@/ui'

export function MiniPlayer() {
  const t = useTranslate()
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
    <div className={styles.container}>
      <div className={styles.title}>
        {t('onLive')}
        <div className={styles.icon} onClick={() => setMedia(undefined)}>
          <CloseIcon />
        </div>
      </div>
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
            pip={true}
          />
        </div>
      )}
    </div>
  )
}
