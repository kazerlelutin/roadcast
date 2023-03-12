import { useContext } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { NoMessage } from '../../ui/no-message/no-message'
import { BroadcastContext } from '../broadcast/broadcast'
import {
  ChronicleProvider,
  ChroniclesContext,
  ChronicleThreeProvider,
} from './chronicle'
import styles from './chronicle-styles/chronicle-three.module.css'
import { ChronicleThreeLine } from './chronicle-three-line'
import { ChronicleThreeLineDrop } from './chronicle-three-line-drop'

export const ChronicleThreeComp: React.FC = () => {
  const [broadcast] = useContext(BroadcastContext)
  const [chronicles] = useContext(ChroniclesContext)

  const t = useTranslate({
    noBroadcast: {
      en: 'No broadcast selected',
      fr: 'Aucune émission sélectionnée',
    },
  })

  if (!broadcast.id) return <NoMessage message={t('noBroadcast')} />

  return (
    <Col>
      <ChronicleThreeLineDrop position={0} />
      {chronicles.map((chronicle) => (
        <ChronicleProvider chronicle={chronicle} key={chronicle.id}>
          <ChronicleThreeLine />
        </ChronicleProvider>
      ))}
    </Col>
  )
}

export const ChronicleThree: React.FC = () => (
  <ChronicleThreeProvider>
    <ChronicleThreeComp />
  </ChronicleThreeProvider>
)
