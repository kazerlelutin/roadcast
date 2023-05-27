import AsyncCreatableSelect from 'react-select/async-creatable'
import { EditorRoutes, IEditor } from './editor'
import reactSelectStyle from '../../styles/reactSelectStyle'
import { useTranslate } from '../../hooks/translate.hook'
import { useBroadcast } from '../broadcast/broadcast'
import { useSimpleFetch } from '../../hooks/simple-fetch.hook'
import { IChronicle, useChronicles } from '../chronicle/chronicle'
import { useState } from 'react'

export const EditorSelector: React.FC = () => {
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
      editor: broadcast.editor,
      chronicleId: chronicle.id,
    })
    setValue({
      value: newEditor.id,
      label: newEditor.name,
    })
    updateChronicleField<IChronicle['editor']>('editor', newEditor)
  }

  const updateEditor = async (id: string) => {
    const newEditor = await getData<IEditor>(EditorRoutes.update, {
      id,
      editor: broadcast.editor,
      chronicleId: chronicle.id,
    })
    setValue({
      value: newEditor.id,
      label: newEditor.name,
    })
    updateChronicleField<IChronicle['editor']>('editor', newEditor)
  }

  return (
    <AsyncCreatableSelect
      instanceId={`${editorCount}-${broadcast.id}-${chronicle.id}-${
        chronicle.editor?.id || 'noEditor'
      }`}
      key={`${editorCount}-${broadcast.id}-${chronicle.id}-${
        chronicle.editor?.id || 'noEditor'
      }`}
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
