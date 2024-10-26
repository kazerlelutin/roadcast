import { useRef, useState } from 'react'
import { MediaProvider } from './media'
import { useChronicles } from '../chronicle'
import { MediaDisplay } from './media-display'
import { MediaBroadcastButton } from './media-broadcast-button'
import { Flex, FullScreenPopin } from '@/ui'

export function MediaInText() {
  const [media, setMedia] = useState<any>({
    url: '',
    type: '__',
    key: 0,
  })
  const ref = useRef<HTMLDivElement>(null)

  const { chronicle } = useChronicles()

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: chronicle.text || '' }}
        onClick={(e) => {
          // @ts-ignore
          if (e.target.tagName !== 'IMG') return

          const img = e.target as HTMLImageElement
          const src = img.src

          setMedia({
            url: src,
            key: new Date().getTime(),
            type: 'image',
          })
          ref.current?.click()
        }}
      />

      <FullScreenPopin action={<div ref={ref} />} title={media?.name || ''}>
        <MediaProvider media={media} key={`${media.key}`}>
          <MediaDisplay />
          <Flex spaceBetween>
            <div></div>
            <MediaBroadcastButton />
          </Flex>
        </MediaProvider>
      </FullScreenPopin>
    </>
  )
}
