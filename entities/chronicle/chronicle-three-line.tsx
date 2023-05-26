/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Flex } from '../../ui/flex/flex'
import { GrabIcon } from '../../ui/icons/grab-icon'
import { useThreeChronicle } from './chronicle'
import styles from './chronicle-styles/chronicle-three-line.module.css'
import { useDrag } from 'react-dnd'
import { EDropZone } from '../../types/drop-zone'
import { ChronicleThreeLineDrop } from './chronicle-three-line-drop'
import { getResume } from '../../utils/get-resume'
import { Col } from '../../ui/col/col'
import { useModes } from '../broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { useChronicles } from './chronicle'

export const ChronicleThreeLine: React.FC = () => {
  const t = useTranslate()
  const { isReadMode } = useModes()
  const { isDragging, updateDrag } = useThreeChronicle()
  const { currentChronicle, chronicle, updateCurrentChronicle } =
    useChronicles()

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: EDropZone.CHRONICLE,
    item: { id: chronicle.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    updateDrag(collected.isDragging)
  }, [collected.isDragging])

  if (collected.isDragging) return <div ref={dragPreview} />

  return (
    <div className={styles.container}>
      <div className={styles.dragZone} ref={drag}>
        <Flex alignItemCenter>
          <div className={styles.grab}>
            {isReadMode ? `#${chronicle.position + 1}` : <GrabIcon />}
          </div>
          <Col smallGap>
            <a
              className={styles.title}
              href={`#${chronicle.id}`}
              onClick={() => updateCurrentChronicle(chronicle.id)}
              data-current={currentChronicle === chronicle.id}
            >
              {getResume(chronicle.title, 20)}
            </a>
            <a className={styles.editor} href={`#${chronicle.id}`}>
              {getResume(chronicle?.editor?.name || t('noEditor'), 20)}
            </a>
          </Col>
        </Flex>
        {isDragging && !collected.isDragging && (
          <div className={styles.grabZone}>
            <ChronicleThreeLineDrop position={chronicle.position + 1} />
          </div>
        )}
      </div>
    </div>
  )
}
