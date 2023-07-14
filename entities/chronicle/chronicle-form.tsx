import { Col, Flex, Label } from '@/ui'
import {
  ChronicleRoutes,
  useChronicles,
  ChronicleFormDescription,
  EditorSelector,
  ChronicleWrapper,
  ChronicleDeleteButton,
  MediaList,
  MediaAddForm,
} from '@/entities'
import styles from './chronicle-styles/chronicle-form.module.css'
import { StringEditor } from '@/components'
import { useTranslate } from '@/hooks'

export function ChronicleForm() {
  const { chronicle, updateChronicleField } = useChronicles()
  const t = useTranslate()

  return (
    <ChronicleWrapper>
      <div className={styles.container}>
        <Col>
          <StringEditor
            name="title"
            fontSize="large"
            id={chronicle.id}
            defaultValue={chronicle.title}
            callback={(value) => updateChronicleField('title', value)}
            link={ChronicleRoutes.updateTitle}
          />
          <Label>{t('editor')}</Label>
          <div className={styles.editor}>
            <EditorSelector />
          </div>
          <Label>{t('source')}</Label>
          <StringEditor
            name="source"
            id={chronicle.id}
            defaultValue={chronicle.source || ''}
            callback={(value) => updateChronicleField('source', value)}
            link={ChronicleRoutes.updateSource}
          />
          <ChronicleFormDescription />
          <MediaList />
        </Col>
        <Flex spaceBetween>
          <MediaAddForm />
          <ChronicleDeleteButton />
        </Flex>
      </div>
    </ChronicleWrapper>
  )
}
