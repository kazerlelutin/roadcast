import { useContext, useState } from 'react'
import { BroadcastContext } from '../broadcast/broadcast'
import { ChronicleContext } from '../chronicle/chronicle'
import { FullscreenPopinContext } from '../../ui/fullscreen-popin/fullscreen-popin.context'
import { useUpload } from '../../hooks/upload.hook'
import { IMedia, MediaRoutes } from './media'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { Button } from '../../ui/button/button'

export const MediaAddFormLocal: React.FC = () => {
  const [{ id, editor }] = useContext(BroadcastContext)
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const [_isOpen, setIsOpen] = useContext(FullscreenPopinContext)
  const { upload, loading } = useUpload<{ media: IMedia }>(
    MediaRoutes.upload,
    (data) => {
      setFile(null)
      setChronicle({ ...chronicle, medias: [...chronicle.medias, data.media] })
      setIsOpen(false)
    }
  )
  const [file, setFile] = useState<File>(null)
  const t = useTranslate({
    addLocalMedia: {
      en: 'Add local media',
      fr: 'Ajouter un média local',
    },
    upload: {
      en: 'Upload',
      fr: 'Télécharger',
    },
  })

  return (
    <Col>
      <p>{t('addLocalMedia')}</p>
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      )}
      <Button
        onClick={() => {
          const data = new FormData()
          data.append('file', file)
          data.append('name', file.name)
          data.append('type', file.type)
          data.append('size', file.size.toString())
          data.append('chronicleId', chronicle.id)
          data.append('broadcastId', id)
          data.append('editor', editor)
          upload(data)
        }}
      >
        {t('upload')}
      </Button>
    </Col>
  )
}
