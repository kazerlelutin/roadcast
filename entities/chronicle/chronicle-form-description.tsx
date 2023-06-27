/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Info } from '@/ui'
import { useEffect, useState } from 'react'
import { ChronicleRoutes, useChronicles, useModes } from '@/entities'
import { useTranslate, usePost, useDebounce } from '@/hooks'
import styles from './chronicle-styles/chronicle-form-description.module.css'
import { Editor } from '@/components'

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
