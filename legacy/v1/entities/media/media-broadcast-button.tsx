import { usePost, useTranslate } from '@/hooks'
import { Button, useFullscreenPopin } from '@/ui'
import { MediaRoutes, useMedia } from '@/entities'

export function MediaBroadcastButton() {
  const { media } = useMedia()
  const { post } = usePost(MediaRoutes.broadcast)

  const { closeModale } = useFullscreenPopin()

  const t = useTranslate({
    broadcast: {
      fr: 'Diffuser',
      en: 'Broadcast',
    },
  })

  const handleBroadcast = () => {

    const url = new URL(media.url)
    const time = url.searchParams.get('t')
    if (time && media.time) {
      url.searchParams.delete('t')
    }

    url.searchParams.set('t', media.time?.toString() || '0')

    post({
      media: {
        url: url.toString(),
        type: media.type,
      },
    })
    closeModale()
  }

  return (
    <Button type="button" onClick={handleBroadcast}>
      {t('broadcast')}
    </Button>
  )
}
