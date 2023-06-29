import { useTranslate } from '@/hooks'
import { Col, NoMessage } from '@/ui'
import {
  useBroadcast,
  ChronicleProvider,
  ChronicleThreeProvider,
  ChronicleRefreshButton,
  ChronicleThreeLine,
  ChronicleThreeLineDrop,
  useThreeChronicle,
} from '@/entities'

export function ChronicleThreeComp() {
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

export function ChronicleThree() {
  return (
    <ChronicleThreeProvider>
      <ChronicleThreeComp />
    </ChronicleThreeProvider>
  )
}
