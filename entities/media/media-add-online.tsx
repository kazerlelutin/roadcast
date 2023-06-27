import { useState } from 'react'
import { useTranslate, usePost } from '@/hooks'
import { Button, Col, Info, useFullscreenPopin } from '@/ui'
import { useChronicles, useBroadcast, IMedia, MediaRoutes } from '@/entities'

export const MediaAddOnline: React.FC = () => {
  const [link, setLink] = useState<string>('')
  const { id, editor } = useBroadcast()
  const { chronicle, addMedia } = useChronicles()
  const { closeModale } = useFullscreenPopin()

  const { post, loading, data } = usePost<IMedia[]>(
    MediaRoutes.scrap,
    (medias) => {
      if (medias.length === 1) {
        addMedia(medias[0])
        closeModale()
        return
      }
    }
  )

  const t = useTranslate({
    addTitle: {
      fr: "Ajouter un média ou le lien d'une page web",
      en: 'Add a media or a web page link',
    },
    addMediaOnlineInfo: {
      fr: 'Vous pouvez ajouter un média en ligne (image, vidéo, texte, site web) en collant son lien dans le champ ci-dessous. Le média sera automatiquement ajouté à votre chronique.',
      en: 'You can add an online media (image, video, text, website) by pasting its link in the field below. The media will be automatically added to your chronicle.',
    },
    download: {
      fr: 'Ajouter / scrapper',
      en: 'Add / scrapper',
    },
  })

  const handleSubmit = () => {
    if (!link) return

    post({
      link,
      chronicleId: chronicle.id,
      broadcastId: id,
      editor,
    })
  }

  return (
    <Col>
      <h2>{t('addTitle')}</h2>
      <Info>{t('addMediaOnlineInfo')}</Info>

      {data ? (
        <p>Scrapping function is not available</p>
      ) : (
        <input
          onChange={(e) => setLink(e.target.value)}
          value={loading ? t('loading') : link}
          disabled={loading}
        />
      )}
      <Button onClick={handleSubmit}>{t('download')}</Button>
    </Col>
  )
}
