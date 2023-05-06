/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '../../ui/flex/flex'
import { useContext, useEffect, useState } from 'react'
import { ChronicleContext, ChronicleRoutes, IChronicle } from './chronicle'
import { useTranslate } from '../../hooks/translate.hook'
import styles from './chronicle-styles/chronicle-form-description.module.css'
import { Info } from '../../ui/info/info'
import { usePost } from '../../hooks/post.hook'
import { Editor } from '../../components/editor/editor'
import { BroadcastReadModeContext } from '../broadcast/broadcast'
import { useDebounce } from '../../hooks/debounce.hook'

export const ChronicleFormDescription: React.FC = () => {
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const [text, setText] = useState<string>(chronicle.text || '')
  const [isReadMode] = useContext(BroadcastReadModeContext)
  const debouncedValue = useDebounce<string>(text, 5000)
  const { post } = usePost(ChronicleRoutes.updateDesc, (value: IChronicle) => {
    setChronicle({ ...value })
  })

  useEffect(() => {
    if (isReadMode || debouncedValue === chronicle.text) return
    post({
      chronicleId: chronicle.id,
      text,
    })
  }, [debouncedValue])

  const t = useTranslate({
    noText: {
      en: 'No text',
      fr: 'Pas de texte',
    },
  })

  if (isReadMode)
    return (
      <div className={styles.container}>
        <Flex spaceBetween>
          {chronicle.text ? (
            <div dangerouslySetInnerHTML={{ __html: chronicle.text }} />
          ) : (
            <Info>{t('noText')}</Info>
          )}
        </Flex>
      </div>
    )

  return (
    <form className={styles.containerEdit}>
      <Editor onChange={setText} defaultValue={text} />
    </form>
  )
}
