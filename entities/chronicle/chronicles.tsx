import { ChronicleProvider, useLastPosition } from './chronicle'
import { useModes } from '../broadcast/broadcast'
import { Col } from '../../ui/col/col'
import { ChronicleCreateButton } from './chronicle-create-button'
import { ChronicleForm } from './chronicle-form'
import { ChronicleRefreshButton } from './chronicle-refresh-button'
import { ChronicleRead } from './chronicle-read'
import { EditorProvider } from '../editor/editor'

export const Chronicles: React.FC = () => {
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
