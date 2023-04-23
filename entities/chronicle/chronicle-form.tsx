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

export const ChronicleForm: React.FC = () => {
  const [chronicles, setChronicles] = useContext(ChroniclesContext)
  const [chronicle] = useContext(ChronicleContext)

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
          <div className={styles.editor}>
            <EditorSelector />
          </div>
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
