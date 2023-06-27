import { usePost, useTranslate } from '@/hooks'
import { Button, useFullscreenPopin } from '@/ui'
import { MediaRoutes, useMedia } from '@/entities'

export const MediaBroadcastButton: React.FC = () => {
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
    post({ media })
    closeModale()
  }

  return (
    <Button type="button" onClick={handleBroadcast}>
      {t('broadcast')}
    </Button>
  )
}
