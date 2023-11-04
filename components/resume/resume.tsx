import { LabelBox, Info } from '@/ui'
import { useTranslate } from '@/hooks'
import { useRouter } from 'next/router'
import { useBroadcast } from '@/stores'
import { BroadcastStringEditor } from '../broadcast-string-editor'
import { Input } from '@/ui/input'

export function Resume() {
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
  const { broadcast } = useBroadcast()
  const { locale } = useRouter()
  const sliderLink = `${window.location.origin}/slider/${broadcast.reader}`
  const readerLink = `${window.location.origin}/${locale}/reader/${broadcast.reader}`

  return (
    <div className="flex flex-col gap-3">
      {broadcast.title && (
        <LabelBox label={t('Title')}>
          <BroadcastStringEditor name="title" />
        </LabelBox>
      )}

      <LabelBox label={t('Slider')}>
        <Input disabled value={sliderLink} />
      </LabelBox>
      <LabelBox label={t('reader')}>
        <Input disabled value={readerLink} />
      </LabelBox>
      <Info>{t('expire')}</Info>
    </div>
  )
}
