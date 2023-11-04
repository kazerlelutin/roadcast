/* eslint-disable @next/next/no-img-element */
import ReactPlayer from 'react-player'

import { useMedia, MediaDisplay, useChronicle } from '@/entities'
import { getResume } from '@/utils'
import { useTranslate } from '@/hooks'

import { Button, Modal } from '@/ui'
import { ButtonAutoConfirm } from '@/components'
import { useBroadcast } from '@/stores'

interface MediaBroadcastButtonProps {
  onClose: () => void
}

export function MediaWithControls() {
  const { media } = useMedia()
  const name = getResume(media.name, 30)

  return (
    <Modal
      apparenceButton={false}
      button={
        <div className="flex flex-col gap-2 justify-between cursor-pointer h-full overflow-hidden border border-rc-bg-dark p-1 rounded-md hover:border-rc-card-bg ">
          {media.type.match(/image/) && (
            <img src={media.url} alt={media.name} className="object-cover" />
          )}
          {media.type.match(/video/) && !media?.cover && (
            <ReactPlayer
              url={media.url}
              width={'100%'}
              height={'auto'}
              className="object-cover"
            />
          )}

          {media.type.match(/video/) && media?.cover && (
            <img src={media.cover} alt={media.name} className="object-cover" />
          )}
          <div className="text-xs text-center text-rc-text">{name}</div>
        </div>
      }
      title={name}
      content={(onClose) => (
        <div className="flex flex-col gap-2">
          <MediaDisplay />
          <div className="flex justify-between gap-2">
            <MediaDeleteBtn onClose={onClose} />
            <MediaBroadcastBtn onClose={onClose} />
          </div>
        </div>
      )}
    />
  )
}

// SUB COMPONENTS

function MediaBroadcastBtn({ onClose }: MediaBroadcastButtonProps) {
  const { media } = useMedia()
  const { broadcastMedia } = useBroadcast()

  const t = useTranslate({
    broadcast: {
      fr: 'Diffuser',
      en: 'Broadcast',
    },
  })

  const handleBroadcast = () => {
    broadcastMedia(media)
    onClose()
  }

  return (
    <Button type="button" onClick={handleBroadcast}>
      {t('broadcast')}
    </Button>
  )
}

function MediaDeleteBtn({ onClose }: MediaBroadcastButtonProps) {
  const { media } = useMedia()
  const { deleteMedia } = useChronicle()

  const t = useTranslate({
    deleteMedia: {
      en: 'Delete media',
      fr: 'Supprimer le média',
    },
    confirmDeleteMedia: {
      en: 'Confirm delete media',
      fr: 'Confirmer la suppression du média',
    },
  })

  return (
    <ButtonAutoConfirm
      text={t('deleteMedia')}
      confirmText={t('confirmDeleteMedia')}
      onConfirm={() => {
        deleteMedia(media.id)
        onClose()
      }}
    />
  )
}
