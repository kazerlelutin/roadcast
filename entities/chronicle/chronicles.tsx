import {
  ChronicleProvider,
  useLastPosition,
  useModes,
  ChronicleCreateButton,
  ChronicleForm,
  ChronicleRefreshButton,
  ChronicleRead,
  EditorProvider,
} from '@/entities'
import { Col } from '@/ui'

export function Chronicles() {
  const { chronicles, lastPosition } = useLastPosition()
  const { isReadMode } = useModes()

  return (
    <Col padding>
      <ChronicleRefreshButton />
      {chronicles.map((chronicle) => (
        <Col key={`${chronicle.id}-${chronicle.updatedAt}`}>
          {!isReadMode && (
            <Col center>
              <ChronicleCreateButton
                position={chronicle.position - 1 < 0 ? 0 : chronicle.position}
              />
            </Col>
          )}
          <ChronicleProvider chronicle={chronicle}>
            <EditorProvider editor={chronicle.editor}>
              <div id={chronicle.id}>
                {isReadMode ? <ChronicleRead /> : <ChronicleForm />}
              </div>
            </EditorProvider>
          </ChronicleProvider>
        </Col>
      ))}
      {!isReadMode && (
        <Col center>
          <ChronicleCreateButton position={lastPosition} />
        </Col>
      )}
    </Col>
  )
}
