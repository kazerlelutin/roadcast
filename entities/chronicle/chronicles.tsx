import { ChroniclesContext } from './chronicle'
import { useContext } from 'react'
import { BroadcastContext } from '../broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { ChronicleCreatebutton } from './chronicle-create-button'

export const Chronicles: React.FC = () => {
  const [broadcast] = useContext(BroadcastContext)
  const [chronicles] = useContext(ChroniclesContext)

  const lastposition =
    chronicles.length === 0 ? 0 : chronicles.at(-1).position + 1
  const t = useTranslate({
    noBroadcast: {
      en: 'No broadcast selected',
      fr: 'Aucune émission sélectionnée',
    },
  })

  if (!broadcast.id)
    return (
      <p>
        {t('noBroadcast')}
        {'...'}
      </p>
    )

  return (
    <Col>
      {chronicles.map((chronicle) => (
        <Col key={chronicle.id}>
          <Col center>
            <ChronicleCreatebutton
              position={chronicle.position - 1 < 0 ? 0 : chronicle.position - 1}
            />
          </Col>
          <p>{chronicle.title}</p>
        </Col>
      ))}
      <Col center>
        <ChronicleCreatebutton position={lastposition} />
      </Col>
    </Col>
  )
}
