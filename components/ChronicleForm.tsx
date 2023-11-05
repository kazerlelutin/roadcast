/* eslint-disable react-hooks/exhaustive-deps */
import { useChronicle } from '@/entities'
import { useDebounce } from '@/hooks'
import { Input } from '@/ui'
import { useEffect, useState } from 'react'

export function ChronicleForm() {
  const { chronicle, setChronicle, updateChronicleField } = useChronicle()
  const [lastChronicleUpdate, setLastChronicleUpdate] = useState<Date>(chronicle.updatedAt)
  const chronicleDebounced = useDebounce<Date>(lastChronicleUpdate, 1000)

  function handleUpdateField(field: string, value: string) {
    setChronicle({ [field]: value })
    setLastChronicleUpdate(new Date())
  }
  useEffect(() => {
    if (chronicleDebounced === chronicle.updatedAt) return
    console.log('chronicleDebounced', chronicleDebounced, lastChronicleUpdate)
    updateChronicleField(chronicle)
  }, [chronicleDebounced])

  //TODO Use Label, convertion to tailwind
  return (
    <div className="flex flex-col gap-2 rounded border border-rc-bg-dark p-2">
      <Input value={chronicle.title} onChange={(title) => handleUpdateField('title', title)} />

      <label className="text-rc-text-light" htmlFor="source">
        source
      </label>
      <Input value={chronicle.source} onChange={(source) => handleUpdateField('source', source)} id="source" />
    </div>
  )
}
