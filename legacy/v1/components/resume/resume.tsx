import { FC } from 'react'
import { StringEditor } from '@/components'
import { Col, LabelBox, Info } from '@/ui'
import { useTranslate } from '@/hooks'
import { BroadcastRoutes, useBroadcast } from '@/entities'
import { useRouter } from 'next/router'

export const Resume: FC = () => {
  const t = useTranslate({
    expire: {
      fr: 'Ce fil expire en 45 jours si vous ne le mettez pas à jour.',
      en: 'This broadcast will expire in 45 days if you do not update it.',
    },
    reader: {
      fr: 'Lien lecture seule',
      en: 'Reader link',
    },
  })
  const { updateTitle, broadcast } = useBroadcast()
  const { locale } = useRouter()
  const sliderLink = `${window.location.origin}/slider/${broadcast.reader}`
  const readerLink = `${window.location.origin}/${locale}/reader/${broadcast.reader}`

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
              updateTitle(newTitle)
            }}
          />
        </LabelBox>
      )}

      <LabelBox label={t('Slider')}>
        <input disabled value={sliderLink} />
      </LabelBox>
      <LabelBox label={t('reader')}>
        <input disabled value={readerLink} />
      </LabelBox>

      <Info>{t('expire')}</Info>
    </Col>
  )
}
