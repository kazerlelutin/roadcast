'use client'
import { useRef, useState } from 'react'
import { useChronicles } from '@/entities'
import { useUpload, useTranslate } from '@/hooks'
import { IMedia, MediaRoutes } from './media'
import { Button, Col, ErrorMsg, Info, useFullscreenPopin } from '@/ui'
import { put, type PutBlobResult } from '@vercel/blob'

export function MediaAddFormLocal() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { addMedia } = useChronicles()
  const [error, setError] = useState<string | null>(null)
  const { closeModale } = useFullscreenPopin()
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

  return (
    <Col>
      <p>{t('addLocalMedia')}</p>
      <Info>{t('addMediaUploadInfo')}</Info>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const file = inputFileRef.current.files[0]

          const newBlob = await put(file.name, file, {
            access: 'public',
            handleBlobUploadUrl: '/api/media/upload',
          })

          console.log(newBlob)
        }}
      >
        <input name="file" ref={inputFileRef} type="file" />

        {error && <ErrorMsg error={t(error)} />}
        <button type="submit">{t('upload')}</button>
      </form>
    </Col>
  )
}
