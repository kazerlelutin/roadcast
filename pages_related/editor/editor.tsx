import {
  Chronicles,
  ChronicleThree,
  BroadcastRoutes,
  useBroadcast,
  BroadcastCreateNewWithHistory,
  BroadcastChronicleHistory,
} from '@/entities'
import { Resume, Actions, StringEditor } from '@/components'
import styles from './editor.module.css'
import { Gridbox, HeaderNoAuth, Col, LabelBox } from '@/ui'
import { useIsMobile, useBroadcastLocalSave, useTranslate } from '@/hooks'

export const Editor: React.FC = () => {
  useBroadcastLocalSave()
  const { broadcast, updateTitle } = useBroadcast()
  const isMobile = useIsMobile()
  const t = useTranslate()

  if (isMobile)
    return (
      <div className={styles.containerMobile}>
        <HeaderNoAuth />
        <div className={styles.contentMobile}>
          {broadcast.title && (
            <LabelBox label={t('Title')}>
              <StringEditor
                defaultValue={broadcast.title}
                link={BroadcastRoutes.update}
                //only admin can edit the title
                id={broadcast.editor}
                name="title"
                callback={(newTitle) => {
                  updateTitle(newTitle)
                }}
              />
            </LabelBox>
          )}
          <Gridbox>
            <div className={styles.chroniclesMobile}>
              <Chronicles />
            </div>
          </Gridbox>
          <div className={styles.actionsMobile}>
            <Actions />
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      <HeaderNoAuth />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Col>
            <Resume />
            <div className={styles.actions}>
              <Actions />
            </div>
            <div className={styles.actions}>
              <BroadcastCreateNewWithHistory />
            </div>
          </Col>
          <BroadcastChronicleHistory />
        </div>

        <Gridbox>
          <div className={styles.chronicles}>
            <Chronicles />
          </div>
        </Gridbox>
        <Gridbox>
          <div className={styles.three}>
            <ChronicleThree />
          </div>
        </Gridbox>
      </div>
    </div>
  )
}
