import { useContext, useMemo } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { MediaProvider, MediasContext } from './media'
import { getResume } from '../../utils/get-resume'
import {
  ChronicleToScreenContext,
  ChroniclesContext,
} from '../chronicle/chronicle'
import { useRouter } from 'next/router'
import { MediaAddForm } from './media-add-form'
import { MediaWithControls } from './media-with-controls'
import styles from './media-styles/media-block.module.css'

export const MediasBlock: React.FC = () => {
  const t = useTranslate({
    noChronicleSelect: {
      en: 'Select chronicle to see medias',
      fr: 'Sélectionnez un chronique pour voir les médias',
    },
  })
  const router = useRouter()
  const [medias] = useContext(MediasContext)
  const [chronicles] = useContext(ChroniclesContext)
  const [currentChronicleId, setCurrentChronicleId] = useContext(
    ChronicleToScreenContext
  )
  const currentChronicle = useMemo(() => {
    if (!currentChronicleId) return null
    const chronicle = chronicles.find((c) => c.id === currentChronicleId)
    return {
      value: chronicle.id,
      label: chronicle.title,
    }
  }, [currentChronicleId, chronicles])

  const handleChangeCurrentChronicle = (option: {
    label: string
    value: string
  }) => {
    setCurrentChronicleId(option.value)
    router.push(`#${option.value}`)
  }

  return (
    <Col>
      <div className={styles.title}>
        <p> {getResume(currentChronicle?.label || '', 30)}</p>
        <MediaAddForm />
      </div>

      <div className={styles.container}>
        {medias &&
          medias
            .filter((media) =>
              media.chronicles.find(
                (m: { chronicle_id: string }) =>
                  m.chronicle_id === currentChronicleId
              )
            )
            .map((media) => (
              <MediaProvider key={media.id} media={media}>
                <MediaWithControls />
              </MediaProvider>
            ))}
      </div>
    </Col>
  )
}
