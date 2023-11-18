/* eslint-disable react-hooks/exhaustive-deps */
import { useChronicle } from '@/entities'
import { useDebounce, useTranslate } from '@/hooks'
import { Input, Label } from '@/ui'
import { useEffect, useState } from 'react'

type SourceInputProps = {
  source: string
  onChange: (source: string) => void
}
function SourceInput({ source, onChange }: SourceInputProps) {
  const t = useTranslate({
    error: {
      fr: 'Le lien doit commencer par https:// ou http://',
      en: 'The link must start with https:// or http://',
    },
  })

  const error = source && !source.startsWith('https://') && !source.startsWith('http://') ? t('error') : undefined
  return <Input value={source} onChange={onChange} id="source" error={error ? t('error') : null} />
}
export function ChronicleForm() {
  const t = useTranslate()
  const { chronicle, setChronicle, updateChronicleField } = useChronicle()
  const [lastChronicleUpdate, setLastChronicleUpdate] = useState<Date>(chronicle.updatedAt)
  const chronicleDebounced = useDebounce<Date>(lastChronicleUpdate, 1000)

  function handleUpdateField(field: string, value: string) {
    setChronicle({ [field]: value })
    setLastChronicleUpdate(new Date())
  }
  useEffect(() => {
    if (chronicleDebounced === chronicle.updatedAt) return
    updateChronicleField(chronicle)
  }, [chronicleDebounced])

  //TODO Use Label, convertion to tailwind

  return (
    <div className="flex flex-col gap-2 rounded border border-rc-bg-dark p-2">
      <Input value={chronicle.title} onChange={(title) => handleUpdateField('title', title)} />

      <Label>{t('source')}</Label>
      <SourceInput source={chronicle.source} onChange={(source) => handleUpdateField('source', source)} />
    </div>
  )
}
