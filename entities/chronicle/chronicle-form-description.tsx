import { Flex } from '../../ui/flex/flex'
import { useContext, useState } from 'react'
import { ChronicleContext, ChronicleRoutes, IChronicle } from './chronicle'
import { EditIcon } from '../../ui/icons/edit-icon'
import { useTranslate } from '../../hooks/translate.hook'
import styles from './chronicle-styles/chronicle-form-description.module.css'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'
import { Info } from '../../ui/info/info'
import { usePost } from '../../hooks/post.hook'
import { Editor } from '../../components/editor/editor'

export const ChronicleFormDescription: React.FC = () => {
  const [chronicle, setChronicle] = useContext(ChronicleContext)
  const [text, setText] = useState<string>(chronicle.text || '')
  const [editMode, setEditMode] = useState(false)
  const { post } = usePost(ChronicleRoutes.updateDesc, (value: IChronicle) => {
    setChronicle({ ...value })
    setEditMode(false)
  })

  const t = useTranslate({
    noText: {
      en: 'No text',
      fr: 'Pas de texte',
    },
  })

  if (editMode)
    return (
      <form className={styles.containerEdit}>
        <Col>
          <div>
            <Editor onChange={setText} defaultValue={text} />
          </div>
          <Flex spaceBetween>
            <Button
              variant="red"
              type="button"
              onClick={() => setEditMode(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="normal"
              onClick={() =>
                post({
                  chronicleId: chronicle.id,
                  text,
                })
              }
            >
              {t('submit')}
            </Button>
          </Flex>
        </Col>
      </form>
    )

  return (
    <div className={styles.container}>
      <Flex spaceBetween>
        {chronicle.text ? (
          <div dangerouslySetInnerHTML={{ __html: chronicle.text }} />
        ) : (
          <Info>{t('noText')}</Info>
        )}
        <div onClick={() => setEditMode(true)} className={styles.icon}>
          <EditIcon />
        </div>
      </Flex>
    </div>
  )
}
