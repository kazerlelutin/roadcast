import { useContext } from 'react'
import { usePost } from '../../hooks/post.hook'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { MediaContext, MediaRoutes } from './media'
import { FullscreenPopinContext } from '../../ui/fullscreen-popin/fullscreen-popin.context'

export const MediaBroadcastButton: React.FC = () => {
  const [media] = useContext(MediaContext)
  const { post } = usePost(MediaRoutes.broadcast)
  const [_isOpen, setIsOpen] = useContext(FullscreenPopinContext)

  const t = useTranslate({
    broadcast: {
      fr: 'Diffuser',
      en: 'Broadcast',
    },
  })

  const handleBroadcast = () => {
    post({ media })
    setIsOpen(false)
  }

  return (
    <Button type="button" onClick={handleBroadcast}>
      {t('broadcast')}
    </Button>
  )
}
