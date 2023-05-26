/* eslint-disable @next/next/no-img-element */
import { useMedia } from './media'
import styles from './media-styles/media-with-controls.module.css'
import ReactPlayer from 'react-player'
import { FullScreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'
import { MediaDisplay } from './media-display'
import { Flex } from '../../ui/flex/flex'
import { MediaDelButton } from './media-del-button'
import { MediaBroadcastButton } from './media-broadcast-button'

export const MediaWithControls: React.FC = () => {
  const { media } = useMedia()

  return (
    <FullScreenPopin
      action={
        <div className={styles.container}>
          {media.type.match(/image/) && (
            <img src={media.url} alt={media.name} />
          )}
          {media.type.match(/video/) && !media?.cover && (
            <ReactPlayer url={media.url} width={'100%'} height={'auto'} />
          )}

          {media.type.match(/video/) && media?.cover && (
            <img src={media.cover} alt={media.name} />
          )}
          <div className={styles.label}>{media.name}</div>
        </div>
      }
      title={media.name}
    >
      <MediaDisplay />
      <Flex spaceBetween>
        <MediaDelButton />
        <MediaBroadcastButton />
      </Flex>
    </FullScreenPopin>
  )
}
