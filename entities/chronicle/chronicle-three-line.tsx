/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { Flex } from '../../ui/flex/flex'
import { GrabIcon } from '../../ui/icons/grab-icon'
import { ChronicleContext, ChronicleThreeContext } from './chronicle'
import styles from './chronicle-styles/chronicle-three-line.module.css'
import { useDrag } from 'react-dnd'
import { EDropZone } from '../../types/drop-zone'
import { ChronicleThreeLineDrop } from './chronicle-three-line-drop'

export const ChronicleThreeLine: React.FC = () => {
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
        <Flex>
          <div className={styles.grab}>
            <GrabIcon />
          </div>
          <div className={styles.title}>{chronicle.title}</div>
        </Flex>
        {isDragging && !collected.isDragging && (
          <ChronicleThreeLineDrop position={chronicle.position + 1} />
        )}
      </div>
    </div>
  )
}
