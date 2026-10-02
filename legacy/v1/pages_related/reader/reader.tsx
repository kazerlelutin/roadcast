import { ChronicleThree, Chronicles, useBroadcast } from '@/entities'
import styles from './reader.module.css'
import { useIsMobile, useTranslate } from '@/hooks'
import { Col, Flex, Gridbox, HeaderNoAuth, LabelBox } from '@/ui'
import { Actions, Resume } from '@/components'

export function Reader() {
  const { broadcast } = useBroadcast()
  const isMobile = useIsMobile()
  const t = useTranslate()

  if (isMobile)
    return (
      <div className={styles.containerMobile}>
        <HeaderNoAuth />
        <div className={styles.contentMobile}>
          {broadcast.title && (
            <LabelBox label={t('Title')}>{broadcast.title}</LabelBox>
          )}
          <Gridbox>
            <div className={styles.chroniclesMobile}>
              <Chronicles />
            </div>
          </Gridbox>
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      <HeaderNoAuth />
      <div className={styles.content}>
        <Col>
          {broadcast.title && (
            <LabelBox label={t('Title')}>{broadcast.title}</LabelBox>
          )}

          <Actions />
        </Col>

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
