/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '../../ui/flex/flex'
import { useEffect, useState } from 'react'
import { ChronicleRoutes, useChronicles } from './chronicle'
import { useTranslate } from '../../hooks/translate.hook'
import styles from './chronicle-styles/chronicle-form-description.module.css'
import { Info } from '../../ui/info/info'
import { usePost } from '../../hooks/post.hook'
import { Editor } from '../../components/editor/editor'
import { useModes } from '../broadcast/broadcast'
import { useDebounce } from '../../hooks/debounce.hook'

export const ChronicleFormDescription: React.FC = () => {
  const t = useTranslate()
  const { chronicle, updateChronicle } = useChronicles()
  const { isReadMode } = useModes()
  const [text, setText] = useState<string>(chronicle.text || '')
  const debouncedValue = useDebounce<string>(text, 700)
  const { post } = usePost(ChronicleRoutes.updateDesc, updateChronicle)

  useEffect(() => {
    if (isReadMode || debouncedValue === chronicle.text) return
    post({
      chronicleId: chronicle.id,
      text,
    })
  }, [debouncedValue])

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
