import { Chronicles } from '../../entities/chronicle/chronicles'
import { ChronicleThree } from '../../entities/chronicle/chronicle-three'
import { Resume } from '../../components/resume/resume'
import { Actions } from '../../components/actions/actions'
import styles from './editor.module.css'
import { Gridbox } from '../../ui/grid-box/grid-box'
import { HeaderNoAuth } from '../../ui/header-no-auth/header-no-auth'
import { Col } from '../../ui/col/col'
import { useBroadcastLocalSave } from '../../hooks/broadcast-local-save.hook'

export const Editor: React.FC = () => {
  useBroadcastLocalSave()
  return (
    <div className={styles.container}>
      <HeaderNoAuth />
      <div className={styles.content}>
        <Gridbox>
          <Col>
            <Resume />

            <div className={styles.actions}>
              <Actions />
            </div>
          </Col>
        </Gridbox>

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
