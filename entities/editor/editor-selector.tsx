import AsyncCreatableSelect from 'react-select/async-creatable'
import { useContext } from 'react'
import { EditorRoutes, IEditor } from './editor'
import reactSelectStyle from '../../styles/reactSelectStyle'
import { useTranslate } from '../../hooks/translate.hook'
import { BroadcastContext } from '../broadcast/broadcast'
import { useSimpleFetch } from '../../hooks/simple-fetch.hook'
import { ChronicleContext, ChroniclesContext } from '../chronicle/chronicle'
import { useState } from 'react'

export const EditorSelector: React.FC = () => {
  const [broadcast] = useContext(BroadcastContext)
  const [chronicle] = useContext(ChronicleContext)
  const { getData } = useSimpleFetch()
  const t = useTranslate({
    SelectEditor: {
      en: 'Select an editor',
      fr: 'Sélectionnez un chroniqueur',
    },
    noEditor: {
      en: 'No editor',
      fr: 'Aucun chroniqueur',
    },
    create: {
      en: 'Create',
      fr: 'Créer',
    },
  })
  const [chronicles, setChronicles] = useContext(ChroniclesContext)
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
    setChronicles(
      chronicles.map((chro) =>
        chro.id === chronicle.id ? { ...chro, editor: newEditor } : chro
      )
    )
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
    setChronicles([
      ...chronicles.map((chro) =>
        chro.id === chronicle.id ? { ...chro, editor: newEditor } : chro
      ),
    ])
  }

  return (
    <AsyncCreatableSelect
      instanceId={`${broadcast.id}-${chronicle.id}-${
        chronicle.editor?.id || 'noEditor'
      }`}
      key={`${broadcast.id}-${chronicle.id}-${
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
