import {
  ChronicleContext,
  ChronicleRoutes,
  ChroniclesContext,
} from './chronicle'
import { useContext } from 'react'
import { Col } from '../../ui/col/col'
import { ChronicleFormDescription } from './chronicle-form-description'
import styles from './chronicle-styles/chronicle-form.module.css'
import { StringEditor } from '../../components/string-editor/string-editor'
import { EditorSelector } from '../editor/editor-selector'
import { ChronicleWrapper } from './chronicle-wrapper'
import { ChronicleDeleteButton } from './chronicle-delete-button'
import { MediaList } from '../media/media-list'
import { MediaAddForm } from '../media/media-add-form'
import { Flex } from '../../ui/flex/flex'
import { Label } from '../../ui/label/label'
import { useTranslate } from '../../hooks/translate.hook'

export const ChronicleForm: React.FC = () => {
  const [chronicles, setChronicles] = useContext(ChroniclesContext)
  const [chronicle] = useContext(ChronicleContext)
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
            callback={(value) => {
              setChronicles(
                chronicles.map((chronicleEl) => {
                  if (chronicleEl.id === chronicle.id) chronicleEl.title = value
                  return chronicleEl
                })
              )
            }}
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
            defaultValue={chronicle.source}
            callback={(value) => {
              setChronicles(
                chronicles.map((chronicleEl) => {
                  if (chronicleEl.id === chronicle.id)
                    chronicleEl.source = value
                  return chronicleEl
                })
              )
            }}
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
