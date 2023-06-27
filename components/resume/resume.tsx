import { FC, useContext } from 'react'
import { StringEditor } from '@/components'
import { Col, LabelBox, Info } from '@/ui'
import { useTranslate } from '@/hooks'
import { BroadcastContext, BroadcastRoutes } from '@/entities'

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
