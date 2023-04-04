import { useContext, useEffect, useState } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'
import { Info } from '../../ui/info/info'
import { ChronicleContext } from '../chronicle/chronicle'
import { BroadcastContext } from '../broadcast/broadcast'
import { FullscreenPopinContext } from '../../ui/fullscreen-popin/fullscreen-popin.context'
import { usePost } from '../../hooks/post.hook'
import { IMedia, MediaRoutes } from './media'

export const MediaAddOnline: React.FC = () => {
  const [link, setLink] = useState<string>('')
  const [{ id, editor }] = useContext(BroadcastContext)
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const [_isOpen, setIsOpen] = useContext(FullscreenPopinContext)

  const { post, loading, data } = usePost<IMedia[]>(
    MediaRoutes.scrap,
    (medias) => {
      if (medias.length === 1) {
        setChronicle({
          ...chronicle,
          medias: [...chronicle.medias, medias[0]],
        })
        setIsOpen(false)

        return
      }
      //TODO
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

  //TODO
  /**
   * - On scrap
   * - on remplace le form par le selecteur de media
   * - on sélectionne les médias
   * - on renvoi le tableau de médias si un seul média, on renvoi le média et on sauvegarde
   *
   */
  return (
    <Col>
      <h2>{t('addTitle')}</h2>
      <Info>{t('addMediaOnlineInfo')}</Info>

      {data ? (
        <p>ICI on selectionne les data, un comp à part</p>
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
