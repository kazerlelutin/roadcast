import { FC, useContext } from 'react'
import { StringEditor } from '../string-editor/string-editor'
import { Col } from '../../ui/col/col'
import { LabelBox } from '../../ui/label-box/label-box'
import { useTranslate } from '../../hooks/translate.hook'
import {
  BroadcastContext,
  BroadcastRoutes,
} from '../../entities/broadcast/broadcast'
import { Info } from '../../ui/info/info'

export const Resume: FC = () => {
  const t = useTranslate({
    expire: {
      fr: 'Ce fil expire en 45 jours si vous ne le mettez pas à jour.',
      en: 'This broadcast will expire in 45 days if you do not update it.',
    },
  })

  const [broadcast, setBroadcast] = useContext(BroadcastContext)
  const sliderLink = `${window.location.origin}/slider/${broadcast.reader}`
  return (
    <Col>
      {broadcast.title && (
        <LabelBox label={t('Title')}>
          <StringEditor
            defaultValue={broadcast.title}
            link={BroadcastRoutes.update}
            //only admin can edit the title
            id={broadcast.editor}
            name="title"
            callback={(newTitle) => {
              setBroadcast({ ...broadcast, title: newTitle })
            }}
          />
        </LabelBox>
      )}

      <LabelBox label={t('Slider')}>
        <input disabled value={sliderLink} />
      </LabelBox>

      <Info>{t('expire')}</Info>
    </Col>
  )
}
