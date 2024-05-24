import { useState } from 'react'
import { useBroadcast, useChronicles } from '@/entities'
import { useUpload, useTranslate } from '@/hooks'
import { IMedia, MediaRoutes } from './media'
import { Button, Col, ErrorMsg, Info, useFullscreenPopin } from '@/ui'

export function MediaAddFormLocal() {
  const { id, editor } = useBroadcast()
  const { chronicle, addMedia } = useChronicles()
  const [error, setError] = useState<string | null>(null)
  const { closeModale } = useFullscreenPopin()
  const { upload, loading } = useUpload<{ media: IMedia[] }>(
    MediaRoutes.upload,
    (data: any) => {
      addMedia(data.media)
    }
  )
  const [files, setFiles] = useState<File[]>([])
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

  const handleUpload = async () => {
    for (const file of files) {
      const data = new FormData()
      data.append('file', file)
      data.append('name', file.name)
      data.append('type', file.type)
      data.append('size', file.size.toString())
      data.append('chronicleId', chronicle.id)
      data.append('broadcastId', id)
      data.append('editor', editor)
      await upload(data)
    }

    setError(null)
    closeModale()
  }

  const handleAddMedia = (e: any) => {
    setError(null)
    const newFiles = Array.from(e.target.files)
    const hasLargeFile = newFiles.some(
      (file: any) => file.size / 1024 / 1024 > 4
    )
    if (hasLargeFile) {
      setError('sizeError')
      return
    }
    setFiles(newFiles as File[])
  }

  return (
    <Col>
      <p>{t('addLocalMedia')}</p>
      <Info>{t('addMediaUploadInfo')}</Info>
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <input type="file" multiple onChange={handleAddMedia} />
      )}
      {error && <ErrorMsg error={t(error)} />}
      <Button onClick={handleUpload}>{t('upload')}</Button>
    </Col>
  )
}
