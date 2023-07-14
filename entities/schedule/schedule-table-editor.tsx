import AsyncCreatableSelect from 'react-select/async-creatable'
import { useSchedule } from './schedule'
import { useSimpleFetch, useTranslate } from '@/hooks'
import { useState } from 'react'
import { EditorRoutes, IEditor } from '../editor'
import reactSelectStyle from '@/styles/reactSelectStyle'
import { Button, Col, EditMode, Flex } from '@/ui'

export function ScheduleTableEditor() {
  const t = useTranslate()
  const { schedule, updateEditors } = useSchedule()
  const editorCount = schedule.editors.length

  const { getData } = useSimpleFetch()
  const [value, setValue] = useState<{ label: string; value: string }[]>(
    schedule.editors.map((editor) => ({
      value: editor.id,
      label: editor.name,
    }))
  )

  const loadOptions = async (inputValue?: string) => {
    const body = {
      search: inputValue || '',
      isSchedule: true,
    }
    const editors = await getData<IEditor[]>(EditorRoutes.findMany, body)

    const editorsSelect = editors
      .map((editor) => ({
        value: editor.id,
        label: editor.name,
      }))
      .filter((editor) => !schedule.editors.find((e) => e.id === editor.value))

    return editorsSelect
  }

  const createEditor = async (inputValue: string) => {
    const newEditor = await getData<IEditor>(EditorRoutes.create, {
      name: inputValue,
      scheduleId: schedule.id,
    })
    setValue((prev) => [
      ...prev,
      { value: newEditor.id, label: newEditor.name },
    ])
    updateEditors([...schedule.editors, newEditor])
  }

  const updateEditor = async (options: { value: string; label: string }[]) => {
    const idsToDelete = value
      .filter((val) => !options.find((o) => o.value === val.value))
      .map((val) => val.value)
    const idsToAdd = options
      .filter((val) => !value.find((o) => o.value === val.value))
      .map((val) => val.value)

    const newEditors = await getData<IEditor[]>(EditorRoutes.update, {
      idsToDelete,
      idsToAdd,
      scheduleId: schedule.id,
    })
    setValue(
      newEditors.map((editor) => ({ value: editor.id, label: editor.name }))
    )
    updateEditors(newEditors)
  }

  const key = `${editorCount}-${schedule.id}`

  return (
    <EditMode
      readMode={
        <Col>
          {schedule.editors.length === 0
            ? t('noEditor')
            : schedule.editors.map((editor) => (
                <div key={editor.id}>{editor.name}</div>
              ))}
        </Col>
      }
    >
      {({ close }) => (
        <Col>
          <AsyncCreatableSelect
            isMulti
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
            onChange={updateEditor}
            value={value}
          />

          <Flex center>
            <Button type="reset" onClick={close}>
              {t('close')}
            </Button>
          </Flex>
        </Col>
      )}
    </EditMode>
  )
}
