import { Flex } from '../../ui/flex/flex'
import { useContext, useState } from 'react'
import { ChronicleContext } from './chronicle'
import { EditIcon } from '../../ui/icons/edit-icon'
import ReactMarkdown from 'react-markdown'
import { useTranslate } from '../../hooks/translate.hook'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

export const ChronicleFormDescription: React.FC = () => {
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const [text, setText] = useState<string>(chronicle.text || '')
  const [editMode, setEditMode] = useState(false)
  const t = useTranslate({
    noText: {
      en: 'No text',
      fr: 'Pas de texte',
    },
  })

  if (editMode)
    return (
      <Flex>
        <div>
          <MarkdownEditor value={text} onChange={setText} />
        </div>
        <div onClick={() => setEditMode(false)}>close</div>
      </Flex>
    )

  return (
    <Flex spaceBetween>
      <ReactMarkdown>{chronicle.text || t('noText')}</ReactMarkdown>
      <div onClick={() => setEditMode(true)}>
        <EditIcon />
      </div>
    </Flex>
  )
}
