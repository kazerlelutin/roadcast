import { ChronicleProvider, ChroniclesContext } from './chronicle'
import { useContext } from 'react'
import { BroadcastReadModeContext } from '../broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { ChronicleCreatebutton } from './chronicle-create-button'
import { ChronicleForm } from './chronicle-form'
import { ChronicleRefreshButton } from './chronicle-refresh-button'
import { ChronicleRead } from './chronicle-read'
import { EditorProvider } from '../editor/editor'

export const Chronicles: React.FC = () => {
  const [chronicles] = useContext(ChroniclesContext)
  const [readMode] = useContext(BroadcastReadModeContext)

  const lastPosition =
    chronicles.length === 0 ? 0 : chronicles.at(-1).position + 1
  const t = useTranslate({
    noBroadcast: {
      en: 'No broadcast selected',
      fr: 'Aucune émission sélectionnée',
    },
  })

  return (
    <Col padding>
      <ChronicleRefreshButton />
      {chronicles.map((chronicle) => (
        <Col key={`${chronicle.id}-${chronicle.updatedAt}`}>
          {!readMode && (
            <Col center>
              <ChronicleCreatebutton
                position={chronicle.position - 1 < 0 ? 0 : chronicle.position}
              />
            </Col>
          )}
          <ChronicleProvider chronicle={chronicle}>
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
          <ChronicleCreatebutton position={lastPosition} />
        </Col>
      )}
    </Col>
  )
}
