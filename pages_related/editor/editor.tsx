import { Chronicles } from '../../entities/chronicle/chronicles'
import { ChronicleThree } from '../../entities/chronicle/chronicle-three'
import { Resume } from '../../components/resume/resume'
import { Actions } from '../../components/actions/actions'
import styles from './editor.module.css'
import { Gridbox } from '../../ui/grid-box/grid-box'
import { HeaderNoAuth } from '../../ui/header-no-auth/header-no-auth'
import { Col } from '../../ui/col/col'
import { useBroadcastLocalSave } from '../../hooks/broadcast-local-save.hook'
import useIsMobile from '../../hooks/is-mobile'
import {
  BroadcastRoutes,
  useBroadcast,
} from '../../entities/broadcast/broadcast'
import { StringEditor } from '../../components/string-editor/string-editor'
import { LabelBox } from '../../ui/label-box/label-box'
import { useTranslate } from '../../hooks/translate.hook'
import { BroadcastCreateNewWithHistory } from '../../entities/broadcast/broadcast-create-new-with-history'
import { BroadcastChronicleHistory } from '../../entities/broadcast/broadcast-chronicle-history'

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
