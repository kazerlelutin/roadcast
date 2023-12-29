/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks'
import { useBroadcast } from '@/stores'
import { Input } from '@/ui/Input'

interface StringEditorProps {
  name: string
  fontSize?: 'small' | 'normal' | 'medium' | 'large'
}

export function BroadcastStringEditor({ name, fontSize }: StringEditorProps) {
  const { broadcast, readMode, updateField } = useBroadcast()
  const [value, setValue] = useState<string>(broadcast[name])
  const debouncedValue = useDebounce<string>(value, 800)

  useEffect(() => {
    if (readMode || broadcast[name] === value) return
    updateField(name, value)
  }, [debouncedValue])

  return <Input data-size={fontSize} disabled={readMode} value={value} onChange={setValue} />
}
