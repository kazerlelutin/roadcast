import { useContext, useState } from 'react'
import { BroadcastContext, useBroadcast } from '../broadcast/broadcast'
import { useChronicles } from '../chronicle/chronicle'
import { useUpload } from '../../hooks/upload.hook'
import { IMedia, MediaRoutes } from './media'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { Button } from '../../ui/button/button'
import { useFullscreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'

export const MediaAddFormLocal: React.FC = () => {
  const { id, editor } = useBroadcast()
  const { chronicle, addMedia } = useChronicles()
  const { closeModale } = useFullscreenPopin()
  const { upload, loading } = useUpload<{ media: IMedia }>(
    MediaRoutes.upload,
    (data) => {
      setFile(null)
      addMedia(data.media)
      closeModale()
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

  const handleUpload = () => {
    const data = new FormData()
    data.append('file', file)
    data.append('name', file.name)
    data.append('type', file.type)
    data.append('size', file.size.toString())
    data.append('chronicleId', chronicle.id)
    data.append('broadcastId', id)
    data.append('editor', editor)
    upload(data)
  }

  return (
    <Col>
      <p>{t('addLocalMedia')}</p>
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      )}
      <Button onClick={handleUpload}>{t('upload')}</Button>
    </Col>
  )
}
