import AsyncCreatableSelect from 'react-select/async-creatable'
import { EditorRoutes, IEditor, useBroadcast, useChronicles } from '@/entities'
import reactSelectStyle from '../../styles/reactSelectStyle'
import { useTranslate, useSimpleFetch } from '@/hooks'
import { useState } from 'react'

export function EditorSelector() {
  const t = useTranslate()
  const { broadcast } = useBroadcast()
  const { chronicle, updateChronicleField, editorCount } = useChronicles()
  const { getData } = useSimpleFetch()

  const [value, setValue] = useState<{ label: string; value: string }>(
    chronicle?.editor
      ? {
          value: chronicle.editor?.id,
          label: chronicle.editor?.name,
        }
      : undefined
  )

  const loadOptions = async (inputValue?: string) => {
    const body = {
      search: inputValue || '',
    }
    const editors = await getData<IEditor[]>(EditorRoutes.findMany, body)

    const editorsSelect = editors
      .map((editor) => ({
        value: editor.id,
        label: editor.name,
      }))
      .filter((editor) => editor.value !== chronicle.editor?.id)

    return editorsSelect
  }

  const createEditor = async (inputValue: string) => {
    const newEditor = await getData<IEditor>(EditorRoutes.create, {
      name: inputValue,
      chronicleId: chronicle.id,
    })
    setValue({
      value: newEditor.id,
      label: newEditor.name,
    })
    updateChronicleField('editor', newEditor)
  }

  const updateEditor = async (id: string) => {
    const newEditor = await getData<IEditor>(EditorRoutes.update, {
      id,
      chronicleId: chronicle.id,
    })
    setValue({
      value: newEditor.id,
      label: newEditor.name,
    })
    updateChronicleField('editor', newEditor)
  }

  const key = `${editorCount}-${broadcast.id}-${chronicle.id}-${
    chronicle.editor?.id || 'noEditor'
  }`

  return (
    <AsyncCreatableSelect
      instanceId={key}
      key={key}
      styles={reactSelectStyle}
      placeholder={t('SelectEditor')}
      cacheOptions
      defaultOptions
      noOptionsMessage={() => t('noEditor')}
      loadingMessage={() => t('loading')}
      formatCreateLabel={(inputValue) => `${t('create')} "${inputValue}"`}
      onCreateOption={createEditor}
      loadOptions={loadOptions}
      onChange={(option) => updateEditor(option.value)}
      value={value}
    />
  )
}
