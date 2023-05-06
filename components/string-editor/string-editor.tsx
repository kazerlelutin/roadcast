/* eslint-disable react-hooks/exhaustive-deps */
import styles from './string-editor.module.css'
import { FC, useContext, useEffect, useState } from 'react'
import { usePost } from '../../hooks/post.hook'
import { useDebounce } from '../../hooks/debounce.hook'
import { BroadcastReadModeContext } from '../../entities/broadcast/broadcast'

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
  const { post, data } = usePost<string>(link)
  const [value, setValue] = useState<string>(defaultValue)
  const [isReadMode] = useContext(BroadcastReadModeContext)
  const debouncedValue = useDebounce<string>(value, 500)

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

  useEffect(() => {
    if (data && data !== value && data?.[name]) {
      setValue(data[name])
      callback?.(data[name])
    }
  }, [data])

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
