/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { Flex } from '../../ui/flex/flex'
import { GrabIcon } from '../../ui/icons/grab-icon'
import {
  ChronicleContext,
  ChronicleThreeContext,
  ChronicleToScreenContext,
} from './chronicle'
import styles from './chronicle-styles/chronicle-three-line.module.css'
import { useDrag } from 'react-dnd'
import { EDropZone } from '../../types/drop-zone'
import { ChronicleThreeLineDrop } from './chronicle-three-line-drop'
import { getResume } from '../../utils/get-resume'
import { Col } from '../../ui/col/col'
import { BroadcastReadModeContext } from '../broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'

export const ChronicleThreeLine: React.FC = () => {
  const t = useTranslate({
    noEditor: {
      en: 'No editor',
      fr: 'Aucun chroniqueur',
    },
  })
  const [readMode] = useContext(BroadcastReadModeContext)

  const [currentChronicle, setCurrentChronicle] = useContext(
    ChronicleToScreenContext
  )
  const [isDragging, setIsDragging] = useContext(ChronicleThreeContext)
  const [chronicle] = useContext(ChronicleContext)
  isDragging
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: EDropZone.CHRONICLE,
    item: { id: chronicle.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    setIsDragging(collected.isDragging)
  }, [collected.isDragging])

  if (collected.isDragging) return <div ref={dragPreview} />

  return (
    <div className={styles.container}>
      <div className={styles.dragZone} ref={drag}>
        <Flex alignItemCenter>
          <div className={styles.grab}>
            {readMode ? `#${chronicle.position + 1}` : <GrabIcon />}
          </div>
          <Col smallGap>
            <a
              className={styles.title}
              href={`#${chronicle.id}`}
              onClick={() => setCurrentChronicle(chronicle.id)}
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
