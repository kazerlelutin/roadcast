import { usePost } from '../../hooks/post.hook'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { MediaRoutes, useMedia } from './media'
import { useFullscreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'

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
