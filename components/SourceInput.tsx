import { useTranslate } from '@/hooks'
import { Input } from '@/ui'

type SourceInputProps = {
  source: string
  onChange: (source: string) => void
}

export function SourceInput({ source, onChange }: SourceInputProps) {
  const t = useTranslate({
    error: {
      fr: 'Le lien doit commencer par https:// ou http://',
      en: 'The link must start with https:// or http://',
    },
  })

  const error = source && !source.startsWith('https://') && !source.startsWith('http://') ? t('error') : undefined
  return <Input value={source} onChange={onChange} id="source" error={error ? t('error') : null} />
}
