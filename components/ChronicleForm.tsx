/* eslint-disable react-hooks/exhaustive-deps */
import { EditorsSelector, SourceInput } from '@/components'
import { Input, Label } from '@/ui'
import { useChronicle } from '@/entities'
import { useEffect, useState } from 'react'
import { useDebounce, useTranslate } from '@/hooks'

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

  return (
    <div className="flex flex-col gap-3 rounded border border-rc-bg-dark p-2">
      <Input value={chronicle.title} onChange={(title) => handleUpdateField('title', title)} />

      <div>
        <Label>{t('source')}</Label>
        <SourceInput source={chronicle.source} onChange={(source) => handleUpdateField('source', source)} />
      </div>

      <div>
        <Label>{t('editor')}</Label>
        <EditorsSelector />
      </div>
    </div>
  )
}
