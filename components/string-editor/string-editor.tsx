/* eslint-disable react-hooks/exhaustive-deps */
import styles from './string-editor.module.css'
import { FC, useEffect, useState } from 'react'
import { usePost } from '../../hooks/post.hook'
import { CheckIcon } from '../../ui/icons/check-icon'
import { EditIcon } from '../../ui/icons/edit-icon'

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
  const [onEdit, setOnEdit] = useState<boolean>(false)

  useEffect(() => {
    if (value !== defaultValue) setValue(defaultValue)
  }, [defaultValue])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value !== defaultValue)
      post({
        [name]: value,
        id,
      })
    setOnEdit(false)
  }

  useEffect(() => {
    if (data && data !== value && data?.[name]) {
      setValue(data[name])
      callback?.(data[name])
    }
  }, [data])

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        data-size={fontSize}
        disabled={!onEdit}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {onEdit ? (
        <button type="submit" className={styles.icon}>
          <CheckIcon />
        </button>
      ) : (
        <div onClick={() => setOnEdit(true)} className={styles.icon}>
          <EditIcon />
        </div>
      )}
    </form>
  )
}
