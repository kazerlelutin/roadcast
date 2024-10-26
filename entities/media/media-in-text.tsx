import { useEffect, useRef, useState } from 'react'
import { IMedia, MediaProvider } from './media'
import { MediaWithControls } from './media-with-controls'
import { useModes } from '../broadcast'
import { useChronicles } from '../chronicle'
import { MediaDisplay } from './media-display'
import { MediaBroadcastButton } from './media-broadcast-button'
import { Flex, FullScreenPopin, useFullscreenPopin } from '@/ui'

export function MediaInText() {
  const [media, setMedia] = useState<any>({
    url: '',
    type: '__',
    key: 0,
  })
  const ref = useRef<HTMLDivElement>(null)

  const { chronicle } = useChronicles()
  const { isReadMode } = useModes()

  const attacheEventImgs = () => {
    console.log('isFocused', isReadMode)
    if (!isReadMode) {
      document
        .querySelectorAll('.chronicle-img')
        .forEach((img) => img.removeEventListener('click', handleMediaClick))
      return
    } else {
      const imgs = document.querySelectorAll('.chronicle-img')

      imgs.forEach((img) => {
        img.addEventListener('click', handleMediaClick)
      })
    }
  }
  const handleMediaClick = (media: any) => {
    const img = media.target as HTMLImageElement
    const src = img.src

    setMedia({
      url: src,
      key: new Date().getTime(),
      type: 'image',
    })

    ref.current?.click()
  }

  useEffect(() => {
    attacheEventImgs()
  }, [chronicle.text, isReadMode])

  return (
    <FullScreenPopin action={<div ref={ref} />} title={media?.name || ''}>
      <MediaProvider media={media} key={`${media.key}`}>
        <MediaDisplay />
        <Flex spaceBetween>
          <div></div>
          <MediaBroadcastButton />
        </Flex>
      </MediaProvider>
    </FullScreenPopin>
  )
}
