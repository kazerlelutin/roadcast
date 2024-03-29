/* eslint-disable react-hooks/exhaustive-deps */
import styles from './string-editor.module.css'
import { FC, useEffect, useState } from 'react'
import { usePost, useDebounce } from '@/hooks'
import { useModes } from '@/entities'

interface StringEditorProps {
  defaultValue: string
  name: string
  link: string
  callback?: (value: string) => void
  id?: string
  fontSize?: 'small' | 'normal' | 'medium' | 'large'
}

export const StringEditor: FC<StringEditorProps> = ({
  defaultValue,
  name,
  link,
  callback,
  id,
  fontSize = 'normal',
}) => {
  const { post } = usePost<string>(link, (data) => {
    setValue(data?.[name])
    callback?.(data?.[name])
  })
  const [value, setValue] = useState<string>(defaultValue)
  const { isReadMode } = useModes()
  const debouncedValue = useDebounce<string>(value, 800)

  useEffect(() => {
    if (value !== defaultValue) setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (isReadMode || debouncedValue === defaultValue) return
    post({
      [name]: value,
      id,
    })
  }, [debouncedValue])

  if (isReadMode) return <div className={styles.input}>{value}</div>

  return (
    <input
      data-size={fontSize}
      disabled={isReadMode}
      className={styles.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
