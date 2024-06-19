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
    post({
      media: {
        url: media.url,
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
