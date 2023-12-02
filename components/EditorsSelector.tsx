import { Fragment, useState } from 'react'
import { Editor } from '@prisma/client'
import { Combobox, Transition } from '@headlessui/react'

import { dc } from '@/utils'
import { ShortIcon } from '@/ui'
import { MiniLoader } from '@/components'
import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores'
import { useChronicle } from '@/entities'

export function EditorsSelector() {
  const { chronicle, updateEditor, createEditor } = useChronicle()
  const { loading, broadcast } = useBroadcast()
  const t = useTranslate()
  const [query, setQuery] = useState<string>('')

  const [selected, setSelected] = useState<Editor>(chronicle.editor)

  function handleSelect(editor: Editor) {
    setSelected(editor)
    updateEditor(editor)
  }

  async function handleCreate() {
    try {
      const newEditor = await createEditor(query)
      setSelected(newEditor)
    } catch (e) {
      console.log(e)
    }
  }

  if (!broadcast) return null

  return (
    <Combobox value={selected} onChange={handleSelect}>
      <div className="relative mt-1">
        <Combobox.Input
          className="input relative w-full cursor-pointer"
          displayValue={(opt: Editor) => opt.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ShortIcon />
        </Combobox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Combobox.Options className="input absolute z-40 mt-1 flex max-h-36 w-full flex-col gap-1 overflow-auto rounded border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {loading && (
              <div className="flex items-center justify-center p-4">
                <MiniLoader />
              </div>
            )}

            {broadcast.editors.filter((editor) => editor.name.includes(query)).length === 0 &&
              query !== '' &&
              !loading && (
                <div
                  className="relative cursor-pointer select-none px-4 py-2 hover:bg-rc-bg-dark"
                  onClick={handleCreate}
                >
                  {t('create')} {query}
                </div>
              )}

            {broadcast.editors
              .filter((editor) => editor.name.includes(query))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((editor) => (
                <Combobox.Option
                  key={editor.name}
                  className={({ active }) => dc('relative cursor-pointer select-none p-2', [active, 'bg-rc-bg-dark'])}
                  value={editor}
                >
                  {({ selected }) => (
                    <span className={dc('block truncate', [selected, 'text-arrd-highlight'])}>{editor.name}</span>
                  )}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
