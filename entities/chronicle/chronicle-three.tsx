import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { NoMessage } from '../../ui/no-message/no-message'
import { useBroadcast } from '../broadcast/broadcast'
import {
  ChronicleProvider,
  ChronicleThreeProvider,
  useThreeChronicle,
} from './chronicle'
import { ChronicleRefreshButton } from './chronicle-refresh-button'
import { ChronicleThreeLine } from './chronicle-three-line'
import { ChronicleThreeLineDrop } from './chronicle-three-line-drop'

export const ChronicleThreeComp: React.FC = () => {
  const t = useTranslate()
  const { broadcast } = useBroadcast()
  const { chronicles } = useThreeChronicle()

  if (!broadcast.id) return <NoMessage message={t('noBroadcast')} />

  return (
    <Col>
      <ChronicleRefreshButton />
      {chronicles.length > 0 && <ChronicleThreeLineDrop position={0} />}
      {chronicles.map((chronicle) => (
        <ChronicleProvider
          chronicle={chronicle}
          key={`${chronicle.id}-${chronicle?.editor?.id}`}
        >
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
