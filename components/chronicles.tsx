import { ChronicleRead, ChronicleRefreshButton } from '@/components'
import {
  ChronicleProvider,
  ChronicleCreateButton,
  ChronicleForm,
  EditorProvider,
} from '@/entities'
import { useBroadcast } from '@/stores'
import { Col } from '@/ui'

export function Chronicles() {
  const { broadcast, lastPosition, readMode } = useBroadcast()

  return (
    <Col padding>
      <ChronicleRefreshButton />
      {broadcast.chronicles.map((chronicle) => (
        <Col key={`${chronicle.id}-${chronicle.updatedAt}`}>
          {!readMode && (
            <Col center>
              <ChronicleCreateButton
                position={chronicle.position - 1 < 0 ? 0 : chronicle.position}
              />
            </Col>
          )}
          <ChronicleProvider id={chronicle.id}>
            <EditorProvider editor={chronicle.editor}>
              <div id={chronicle.id}>
                {readMode ? <ChronicleRead /> : <ChronicleForm />}
              </div>
            </EditorProvider>
          </ChronicleProvider>
        </Col>
      ))}
      {!readMode && (
        <Col center>
          <ChronicleCreateButton position={lastPosition} />
        </Col>
      )}
    </Col>
  )
}
