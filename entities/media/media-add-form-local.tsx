import { useState } from 'react'
import { useBroadcast } from '../broadcast/broadcast'
import { useChronicles } from '../chronicle/chronicle'
import { useUpload } from '../../hooks/upload.hook'
import { IMedia, MediaRoutes } from './media'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { Button } from '../../ui/button/button'
import { useFullscreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'
import { Info } from '../../ui/info/info'
import { ErrorMsg } from '../../ui/error-msg/error-msg'

export const MediaAddFormLocal: React.FC = () => {
  const { id, editor } = useBroadcast()
  const { chronicle, addMedia } = useChronicles()
  const [error, setError] = useState<string | null>(null)
  const { closeModale } = useFullscreenPopin()
  const { upload, loading } = useUpload<{ media: IMedia }>(
    MediaRoutes.upload,
    (data) => {
      setFile(null)
      addMedia(data.media)
      setError(null)
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
    addMediaUploadInfo: {
      fr: 'Le fichier ne peut excéder 4Mo.',
      en: 'The file cannot exceed 4Mb.',
    },
    sizeError: {
      fr: 'Le fichier ne peut excéder 4Mo.',
      en: 'The file cannot exceed 4Mb.',
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

  const handleAddMedia = (e: any) => {
    setError(null)
    const size = e.target.files[0].size / 1024 / 1024
    if (size > 4) {
      setError('sizeError')
      return
    }
    setFile(e.target.files[0])
  }

  return (
    <Col>
      <p>{t('addLocalMedia')}</p>
      <Info>{t('addMediaUploadInfo')}</Info>
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <input type="file" onChange={handleAddMedia} />
      )}
      {error && <ErrorMsg error={t(error)} />}
      <Button onClick={handleUpload}>{t('upload')}</Button>
    </Col>
  )
}
